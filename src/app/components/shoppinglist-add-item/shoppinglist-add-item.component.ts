import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/dataModels/Items';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-shoppinglist-add-item',
  templateUrl: './shoppinglist-add-item.component.html',
  styleUrls: ['./shoppinglist-add-item.component.css']
})
export class ShoppinglistAddItemComponent implements OnInit {
  
  constructor(public ui:UiService, public dialog: MatDialog) {}

  public newItem: Item = new Item(-1, '', '')
  panelOpenState = false;

  onCancel() {
    this.ui.resetDisplays()
    this.ui.displayToolbar = true;
    this.ui.displayShoppingList = true;
    this.dialog.closeAll()
  }

  addItemToShoppingList(newItem: Item) {
    this.ui.shoppingList.items.push(newItem)
    this.ui.updateShoppingList(this.ui.shoppingList)
  }

  public filterableItemsSet: Item[] = this.ui.itemsSet

  ngOnInit(): void {
    this.filterableItemsSet = this.ui.itemsSet
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.filterableItemsSet = this.ui.itemsSet.filter(x => x.name.includes(filterValue))
  }
}
