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

  public newRecipe: Recipe = new Recipe(-1, this.ui.currentUser.userId, '', '', [])

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
    console.log(this.newRecipe)
    this.ui.addRecipe(this.newRecipe)
  }

  public itemsArray: Item[] = []
  public number: number = 0
  
  addItemsToList(item: Item) {
    for (var i=0; i < this.number; i++)
    {this.itemsArray.push(item)};
    console.log('itemsArray: ' + this.itemsArray)
    this.newRecipe.items = this.itemsArray
    console.log(this.newRecipe.items)
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
}
