import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { User } from '../dataModels/Appuser';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditAccountComponent } from '../components/edit-account/edit-account.component';


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

  resetDisplays() {
    this.displayLogin = false;
    this.displayRegister = false;
    this.displayToolbar = false;
    this.displayProfile = false;

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
    this.displayToolbar = true;
  }

  registerUser(newUser: User): void {
    this.http
      .post<User>('http://localhost:8080/users', newUser)
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this.successfulLogin(user);
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
    this.http.put(`http://localhost:8080/users/${updatedAccount.id}?email=${this.currentUser.value.email}&password=${this.currentUser.value.password}`, updatedAccount)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.updateAccount()
        },
        error: (err) => this.showError("Error updating account")
      })
}

updateEditedProfile(updatedAccount: User): void {
  this.http.put(`http://localhost:8080/users/${updatedAccount.id}?email=${this.currentUser.value.email}&password=${this.currentUser.value.password}`, updatedAccount)
    .pipe(take(1))
    .subscribe({
      next: () => {
        this.updateAccount()
        this.isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"))
            this.currentUser.next(updatedAccount)
    },
      error: (err) => this.showError("Error updating account")
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

}
