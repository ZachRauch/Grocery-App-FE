import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/dataModels/Items';
import { Recipe } from 'src/app/dataModels/Recipe';
import { UiService } from 'src/app/services/ui.service';
import { EditRecipesComponent } from '../edit-recipes/edit-recipes.component';
import { NewRecipeComponent } from '../new-recipe/new-recipe.component';

export interface DialogData {
  recipe: Recipe;
}

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
constructor(public ui: UiService, public dialog: MatDialog) {}

panelOpenState = false;

openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(NewRecipeComponent, {
    width: '75%',
    height: '90%',
    enterAnimationDuration,
    exitAnimationDuration,
  });
}

openDialog2(enterAnimationDuration: string, exitAnimationDuration: string, recipeObject: Recipe): void {
  this.dialog.open(EditRecipesComponent, {
    data: {recipe: recipeObject},
    width: '75%',
    height: '90%',
    enterAnimationDuration,
    exitAnimationDuration
  });
}


getListOfIngredients(recipe: Recipe) {
  let recipeItemsList: String[] = []
  for (let i = 0; i < recipe.items.length; i++) {
    recipeItemsList.push(recipe.items[i].name)
  }
  return recipeItemsList
}

getUniqueItemSet(recipe: Recipe) {
  let recipeItemsSet = recipe.items.filter((value, index, self) => 
  index === self.findIndex((t) => (
    t.name === value.name
  )))
  return recipeItemsSet
}

getCount(value: String, ingredientList: String[]) {
  var count = 0;
  ingredientList.forEach((v) => ((v === value) && (count++)));
  return count;
}

addIngredientsToShoppingList(recipe: Recipe) {
  for (const each of recipe.items) {
  this.ui.shoppingList.items.push(each)}
  this.ui.updateShoppingList(this.ui.shoppingList)
  this.ui.showError("Ingredients added to shopping list")
}
}
