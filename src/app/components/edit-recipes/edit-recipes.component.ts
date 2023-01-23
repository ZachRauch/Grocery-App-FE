import { Component, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/dataModels/Items';
import { Recipe } from 'src/app/dataModels/Recipe';
import { UiService } from 'src/app/services/ui.service';
import { DialogData } from '../recipes/recipes.component';

@Component({
  selector: 'app-edit-recipes',
  templateUrl: './edit-recipes.component.html',
  styleUrls: ['./edit-recipes.component.css']
})
export class EditRecipesComponent {
  panelOpenState = false;
  public quantity: number = 0

  constructor(public ui:UiService, public dialog: MatDialog,     public dialogRef: MatDialogRef<EditRecipesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {}

  public updatedRecipe: Recipe = this.data.recipe

  onCancel() {
    this.ui.resetDisplays()
    this.ui.displayToolbar = true
    this.ui.displayRecipes = true
    this.dialog.closeAll()
  }

  public value: number = 0
  public newItem: Item = new Item(-1, '', '')

  public itemsArray: Item[] = []
  public number: number = 0
  
  addItemsToList(item: Item) {
    for (var i=0; i < this.number; i++)
    {this.itemsArray.push(item)};
    this.updatedRecipe.items = this.itemsArray
    this.ui.showError("Item has been added to recipe")
  }

  public filterableItemsSet: Item[] = this.ui.itemsSet

  ngOnInit(): void {
    this.filterableItemsSet = this.ui.itemsSet
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.filterableItemsSet = this.ui.itemsSet.filter(x => x.name.toLowerCase().includes(filterValue.toLowerCase()))
  }

  getListOfIngredients(recipe: Recipe) {
    let recipeItemsList: String[] = []
    for (let i = 0; i < recipe.items.length; i++) {
      recipeItemsList.push(recipe.items[i].name)
    }
    return recipeItemsList
  }

  getCount(value: String, ingredientList: String[]) {
    var count = 0;
    ingredientList.forEach((v) => ((v === value) && (count++)));
    return count;
  }

public recipeListItemsSet: Item[] = []

removeRecipeListDuplicates() {
  this.recipeListItemsSet = this.updatedRecipe.items.filter((value, index, self) => 
  index === self.findIndex((t) => (
    t.name === value.name
  )))
  return this.recipeListItemsSet
}

updateRecipe() {
  console.log(this.updatedRecipe)
  // this.ui.updateRecipe(this.updatedRecipe)
  // this.ui.deleteRecipe(this.updatedRecipe)
  // this.ui.addRecipe(this.updatedRecipe)
  this.ui.updateRecipe2(this.updatedRecipe)
}

addQuantity(itemObject: Item) {
  this.updatedRecipe.items.push(itemObject)
}

reduceQuantity(itemObject: Item) {
  this.updatedRecipe.items.splice(this.updatedRecipe.items.indexOf(itemObject), 1)
}
}
