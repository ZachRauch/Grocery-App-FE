import { Component } from '@angular/core';
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
export class NewRecipeComponent {

  panelOpenState = false;
  public quantity: number = 0

  constructor(public ui:UiService, public dialog: MatDialog) {}

  public newRecipe: Recipe = new Recipe(-1, this.ui.currentUser.userId, '', '', [])

  onCancel() {
    this.ui.resetDisplays()
    this.ui.displayToolbar = true
    this.ui.displayRecipes = true
  }

  updateQuantity() {

  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddItemComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  public value: number = 0

  createAndAddRecipe() {
    console.log(this.newRecipe)
    this.ui.addRecipe(this.newRecipe)
  }

  public itemsArray: Item[] = []
  
  addItemsToList(item: Item, quantity: number) {
    for (var i=0; i < quantity; i++)
    {this.newRecipe.items.push(item)};
    console.log(this.newRecipe.items)
    this.ui.showError("Item has been added to recipe")
  }
}
