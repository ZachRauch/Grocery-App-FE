import { Component } from '@angular/core';
import { Item } from 'src/app/dataModels/Items';
import { Recipe } from 'src/app/dataModels/Recipe';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent {

  panelOpenState = false;
  public itemList: Item[] = []
  public quantity: number = 0

  constructor(public ui:UiService) {}

  public newRecipe: Recipe = new Recipe(-1, this.ui.currentUser.userId, '', '', [])

  onCancel() {
    this.ui.resetDisplays()
    this.ui.displayToolbar = true
    this.ui.displayRecipes = true
  }

  addItemToList(item: Item) {
    this.itemList.push(item)
  }
}
