import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { User } from '../dataModels/Appuser';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditAccountComponent } from '../components/edit-account/edit-account.component';
import { Item } from '../dataModels/Items';
import { Recipe } from '../dataModels/Recipe';
import { Pantry } from '../dataModels/Pantry';
import { ShoppingList } from '../dataModels/ShoppingList';


@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private _snackBar: MatSnackBar, private http: HttpClient, public dialog: MatDialog) {
    const username = JSON.parse(localStorage.getItem('user') || '{}').email
    const password = JSON.parse(localStorage.getItem('user') || '{}').password

    if (username != null && password != null) {
      this.tryLogin(username, password)
    }

  }

  public isLoggedIn = false
  public currentUser: any;

  public displayLogin = true;
  public displayRegister = false;
  public displayToolbar = false;
  public displayProfile = false;
  public displayRecipes = false;
  public displayPantry = false;
  public displayShoppingList = false;
  public displayHomePage = false;

  resetDisplays() {
    this.displayLogin = false;
    this.displayRegister = false;
    this.displayToolbar = false;
    this.displayProfile = false;
    this.displayRecipes = false;
    this.displayPantry = false;
    this.displayShoppingList = false;
    this.displayHomePage = false;
  }

  showShoppingList() {
    this.resetDisplays();
    this.displayToolbar = true;
    this.displayShoppingList = true;
  }

  showRecipes() {
    this.resetDisplays();
    this.displayToolbar = true;
    this.displayRecipes = true;
  }

  showRegister() {
    this.resetDisplays();
    this.displayRegister = true;
  }

  showLogin() {
    this.resetDisplays();
    this.displayLogin = true;
  }

  showProfile() {
    this.resetDisplays();
    this.displayToolbar = true;
    this.displayProfile = true;
  }

  showToolbar() {
    this.resetDisplays();
    this.displayToolbar = true;
  }

  showPantry() {
    this.resetDisplays();
    this.displayToolbar = true;
    this.displayPantry = true;
  }
  showHomePage() {
    this.resetDisplays();
    this.displayHomePage = true;
    this.displayToolbar = true;
  }

  public showError(message: string): void {
    this._snackBar.open(message, undefined, { duration: 10000 });
  }

  tryLogin(email: string, password: string): void {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('email', email);
    queryParams = queryParams.append('password', password);
    this.http
      .get<User>('http://localhost:8080/users', { params: queryParams })
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this.successfulLogin(user)
        },
        error: (err) => {
          if (err.status === 404) {
            this.showError('Invalid Username or Password.');
          } else {
            this.showError('Error logging in.');
          }
        },
      });
  }

  successfulLogin(user: User) {
    this.isLoggedIn = true
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.resetDisplays();
    this.showHomePage();
    this.pantry = new Pantry(-1, this.currentUser.userId, [])
    this.getItems();
    this.getPantry();
    this.getRecipes();
  }

  registerUser(newUser: User): void {
    this.http
      .post<User>('http://localhost:8080/users', newUser)
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this.successfulLogin(user);
          this.addPantry(new Pantry(0, user.userId, []))
          this.addShoppingList(new ShoppingList(0, user.userId, []))
        },
        error: (err) => {
          if (err.status === 400) {
            this.showError('Username already taken.');
          } else {
            this.showError('Error registering.');
          }
        },
      });
  }

  logoutUser() {
    localStorage.clear()
    this.isLoggedIn = false
    this.currentUser = null
    this.resetDisplays();
    this.displayLogin = true
  }

  public accountEdit: User = new User(-1,'','','Guest','')
  public displayEdit: boolean = false
  public account: User[] = []

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EditAccountComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  getAccountByEmailandPassword(email: string, password: string): void {
    this.http
      .get<User>(`http://localhost:8080/users?email=${email}&password=${password}`)
      .pipe(take(1))
      .subscribe({
        next: account => {
          this.accountEdit = account
          this.openDialog('0ms', '0ms')
        },
        error: () => {
          this.showError('Failed to get account')
        }
      })
  }

  deleteProfileById(id: number, email: string, password: string): void {
    let queryParams = new HttpParams()
    queryParams = queryParams.append("email", this.currentUser.email)
    queryParams = queryParams.append("password", this.currentUser.password)
    this.http
      .delete(`http://localhost:8080/users/${id}`, {params: queryParams })
      .pipe(take(1))
      .subscribe({
        next: () => {
        this.logoutUser()
        this.showError('Successfully deleted account')
        this.showLogin()
        },
        error: () => {
          this.showError('Failed to delete account')
        }
      })
  }

  updateEditedAccount(updatedAccount: User): void {
    this.http.put(`http://localhost:8080/users/${updatedAccount.userId}?email=${this.currentUser.email}&password=${this.currentUser.password}`, updatedAccount)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.updateAccount()
        },
        error: () => this.showError("Error updating account")
      })
}

updateEditedProfile(updatedAccount: User): void {
  this.http.put(`http://localhost:8080/users/${updatedAccount.userId}?email=${this.currentUser.email}&password=${this.currentUser.password}`, updatedAccount)
    .pipe(take(1))
    .subscribe({
      next: () => {
        this.updateAccount()
        this.isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"))
            this.currentUser = updatedAccount
    },
      error: () => this.showError("Error updating account")
    })
}

updateAccount(): void {
  this.http
    .get<User[]>('http://localhost:8080/users')
    .pipe(take(1))
    .subscribe({ 
      next: account => {
      this.account = account
    },
    error: () => {
      this.showError('Failed to update account')
    }
  })
}

getCurrentUser() {
  console.log(this.currentUser)
}

public recipes: Recipe[] = []

getRecipes() {
  this.http
      .get<Recipe[]>(`http://localhost:8080/recipes?userId=${this.currentUser.userId}`)
      .pipe(take(1))
      .subscribe({
        next: recipes => {
          this.recipes = recipes
        },
        error: () => {
          this.showError('Failed to get recipes')
        }
      })
}

addRecipe(newRecipe: Recipe) {
  this.http.post('http://localhost:8080/recipes', newRecipe)
  .pipe(take(1))
  .subscribe({
    next: () => this.getRecipes(),
    error: () => this.showError("Error adding recipe")
  })
}

deleteRecipe(recipeObject: Recipe) {
  this.http.delete(`http://localhost:8080/recipes/${recipeObject.id}`)
.pipe(take(1))
.subscribe({
  next: () => {
    this.getRecipes()
  },
  error: () => {
    this.showError('Failed to remove recipe')
  }
})
}

updateRecipe(recipeObject: Recipe) {
  this.http.put(`http://localhost:8080/recipes/${recipeObject.id}`, recipeObject)
  .pipe(take(1))
  .subscribe({
    next: () => {
      this.getRecipes()
  },
    error: () => this.showError("Error updating recipe")
  })
}

updateRecipe2(recipeObject: Recipe) {
  this.http.delete(`http://localhost:8080/recipes/${recipeObject.id}`)
.pipe(take(1))
.subscribe({
  next: () => {
    this.addRecipe(recipeObject)
  },
  error: () => {
    this.showError('Failed to remove recipe')
  }
})
}


public items: Item[] = []

getItems() {
  this.http
  .get<Item[]>(`http://localhost:8080/items`)
  .pipe(take(1))
  .subscribe({
    next: items => {
      this.items = items
      console.log(this.items)
      this.removeDuplicates()
      this.valuesList = []
      this.getItemNameList()
    },
    error: () => {
      this.showError('Failed to get items')
    }
  })
}

// updateItem(updatedItem: Item) {
//   this.http.put(`http://localhost:8080/items/${updatedItem.userId}`, updatedItem)
//   .pipe(take(1))
//   .subscribe({
//     next: () => {
//       this.getItems()
//   },
//     error: () => this.showError("Error updating item inventory")
//   })
// }

addItem(newItem: Item) {
  this.http.post('http://localhost:8080/items', newItem)
  .pipe(take(1))
  .subscribe({
    next: () => this.getItems(),
    error: () => this.showError("Error adding item")
  })
}


public itemsSet: Item[] = []

removeDuplicates() {
  this.itemsSet = this.items.filter((value, index, self) => 
  index === self.findIndex((t) => (
    t.name === value.name
  )))
}

public valuesList: String[] = []

getItemNameList(){
  for (let i = 0; i < this.items.length; i++) {
    this.valuesList.push(this.items[i].name)
  } return this.valuesList
}

removeItem(item: Item) {
this.http.delete(`http://localhost:8080/items/${item.id}`)
.pipe(take(1))
.subscribe({
  next: () => {
    this.getItems()
  },
  error: () => {
    this.showError('Failed to remove item')
  }
})
}

public pantry: Pantry = new Pantry(-1, -1, [])

getPantry() {
  this.http
  .get<Pantry>(`http://localhost:8080/pantry?userId=${this.currentUser.userId}`)
  .pipe(take(1))
  .subscribe({
    next: pantry => {
      this.pantry = pantry
      this.removePantryDuplicates()
      this.getPantryItemNameList()
    },
    error: () => {
      this.showError('Failed to get pantry')
    }
  })
}

addPantry(pantryObject: Pantry) {
  this.http.post(`http://localhost:8080/pantry`, pantryObject)
  .pipe(take(1))
  .subscribe({
    next: () => {
      this.getPantry()
  },
    error: () => this.showError("Error adding pantry")
  })
}

deletePantry(pantryObject: Pantry) {
  this.http.delete(`http://localhost:8080/pantry/${pantryObject.id}`)
  .pipe(take(1))
  .subscribe({
    next: () => {

    },
    error: () => {
      this.showError('Failed to delete pantry')
    }
  })
}

// addNewItemToPantry(newItem: Item) {
//   this.http.post('http://localhost:8080/items', newItem)
//   .pipe(take(1))
//   .subscribe({
//     next: () => {this.getItems(),
//     // newItem doesn't have the same ID as the one that was created. 
//     this.pantry.items.push(this.items[-1]),
//     this.updatePantry(this.pantry)},
//     error: () => this.showError("Error adding item")
//   })
// }

updatePantry(pantryObject: Pantry) {
  this.http.put(`http://localhost:8080/pantry?userId=${pantryObject.id}`, pantryObject)
  .pipe(take(1))
  .subscribe({
    next: () => {
      this.getPantry()
  },
    error: () => this.showError("Error updating pantry inventory")
  })
}

public pantryItemsSet: Item[] = []

removePantryDuplicates() {
  this.pantryItemsSet = this.pantry.items.filter((value, index, self) => 
  index === self.findIndex((t) => (
    t.name === value.name
  )))
}

public pantryValuesList: String[] = []

getPantryItemNameList(){
  this.pantryValuesList = []
  for (let i = 0; i < this.pantry.items.length; i++) {
    this.pantryValuesList.push(this.pantry.items[i].name)
  } return this.pantryValuesList
}

getCount(value: String) {
  var count = 0;
  this.pantryValuesList.forEach((v) => (v === value && count++));
  return count;
}

public shoppingList: ShoppingList = new ShoppingList(-1, -1, [])

getShoppingList() {
  this.http
  .get<ShoppingList>(`http://localhost:8080/shopping-lists?userId=${this.currentUser.userId}`)
  .pipe(take(1))
  .subscribe({
    next: shoppingList => {
      this.shoppingList = shoppingList
      this.removeshoppingListDuplicates()
      this.getshoppingListItemNameList()
    },
    error: () => {
      this.showError('Failed to get shopping list')
    }
  })
}

public shoppingListItemsSet: Item[] = []

removeshoppingListDuplicates() {
  this.shoppingListItemsSet = this.shoppingList.items.filter((value, index, self) => 
  index === self.findIndex((t) => (
    t.name === value.name
  )))
}

public shoppingListValuesList: String[] = []

getshoppingListItemNameList(){
  this.shoppingListValuesList = []
  for (let i = 0; i < this.shoppingList.items.length; i++) {
    this.shoppingListValuesList.push(this.shoppingList.items[i].name)
  } return this.shoppingListValuesList
}

updateShoppingList(shoppingListObject: ShoppingList) {
  this.http.put(`http://localhost:8080/shopping-lists?userId=${shoppingListObject.id}`, shoppingListObject)
  .pipe(take(1))
  .subscribe({
    next: () => {
      this.getShoppingList()
  },
    error: () => this.showError("Error updating shopping list")
  })
}

addShoppingList(shoppingListObject: ShoppingList) {
  this.http.post(`http://localhost:8080/shopping-lists`, shoppingListObject)
  .pipe(take(1))
  .subscribe({
    next: () => {
      this.getShoppingList()
  },
    error: () => this.showError("Error adding shopping list")
  })
}

}
