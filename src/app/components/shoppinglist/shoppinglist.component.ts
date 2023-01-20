import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/dataModels/Items';
import { UiService } from 'src/app/services/ui.service';
import { ShoppinglistAddItemComponent } from '../shoppinglist-add-item/shoppinglist-add-item.component';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent {

  constructor(public ui: UiService, public dialog: MatDialog) {}

  getCount(value: String) {
    var count = 0;
    this.ui.shoppingListValuesList.forEach((v) => (v === value && count++));
    return count;
}

addQuantity(itemObject: Item) {
  this.ui.shoppingList.items.push(itemObject)
  this.ui.updateShoppingList(this.ui.shoppingList)
}

reduceQuantity(itemObject: Item) {
  this.ui.shoppingList.items.splice(this.ui.shoppingList.items.indexOf(itemObject), 1)
  this.ui.updateShoppingList(this.ui.shoppingList)
}

openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(ShoppinglistAddItemComponent, {
    width: '450px',
    enterAnimationDuration,
    exitAnimationDuration,
  });
}

moveToPantry(item: Item) {
  for (var i=0; i < this.getCount(item.name); i++) {
    this.ui.pantry.items.push(item)
  }
  this.ui.shoppingList.items = this.ui.shoppingList.items.filter(thing => thing.name != item.name)
  this.ui.updateShoppingList(this.ui.shoppingList)
  this.ui.updatePantry(this.ui.pantry)
  this.ui.showError("Items added to pantry")
}
}
