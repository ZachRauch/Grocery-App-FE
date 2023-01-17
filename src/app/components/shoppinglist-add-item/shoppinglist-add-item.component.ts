import { Component } from '@angular/core';
import { Item } from 'src/app/dataModels/Items';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-shoppinglist-add-item',
  templateUrl: './shoppinglist-add-item.component.html',
  styleUrls: ['./shoppinglist-add-item.component.css']
})
export class ShoppinglistAddItemComponent {
  
  constructor(public ui:UiService) {}

  public newItem: Item = new Item(-1, '', '')
  panelOpenState = false;

  onCancel() {
    this.ui.resetDisplays()
    this.ui.displayToolbar = true;
    this.ui.displayShoppingList = true;
  }

  addItemToShoppingList(newItem: Item) {
    this.ui.shoppingList.items.push(newItem)
    // this.ui.deleteShoppingList(this.ui.shoppingList)
    // this.ui.addShoppingList(this.ui.shoppingList)
    this.ui.updateShoppingList(this.ui.shoppingList)
  }
}
