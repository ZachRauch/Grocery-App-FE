import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/dataModels/Items';
import { Recipe } from 'src/app/dataModels/Recipe';
import { UiService } from 'src/app/services/ui.service';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {

  panelOpenState = false;
  public quantity: number = 0

  constructor(public ui:UiService, public dialog: MatDialog) {}

  public newRecipe: Recipe = new Recipe(-1, this.ui.currentUser.userId, '', '', [], '')

  onCancel() {
    this.ui.resetDisplays()
    this.ui.displayToolbar = true
    this.ui.displayRecipes = true
    this.dialog.closeAll()
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddItemComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  public value: number = 0
  public newItem: Item = new Item(-1, '', '')


  createAndAddRecipe() {
    this.ui.addRecipe(this.newRecipe)
  }

  public itemsArray: Item[] = []
  public number: number = 0
  
  addItemsToList(item: Item, value: number) {
    for (var i=0; i < value; i++)
    {this.itemsArray.push(item)};
    this.newRecipe.items = this.itemsArray
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
  this.recipeListItemsSet = this.newRecipe.items.filter((value, index, self) => 
  index === self.findIndex((t) => (
    t.name === value.name
  )))
  return this.recipeListItemsSet
}

}
