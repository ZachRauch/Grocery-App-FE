import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/dataModels/Items';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-pantry-add-item',
  templateUrl: './pantry-add-item.component.html',
  styleUrls: ['./pantry-add-item.component.css']
})
export class PantryAddItemComponent implements OnInit{
  constructor(public ui:UiService, public dialog: MatDialog) {}

  public newItem: Item = new Item(-1, '', '')
  panelOpenState = false;

  onCancel() {
    this.ui.resetDisplays()
    this.ui.displayToolbar = true;
    this.ui.displayPantry = true;
    this.dialog.closeAll()
  }

  addItemToPantry(newItem: Item) {
    this.ui.pantry.items.push(newItem)
    this.ui.updatePantry(this.ui.pantry)
  }

  public filterableItemsSet: Item[] = this.ui.itemsSet

  ngOnInit(): void {
    this.filterableItemsSet = this.ui.itemsSet
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.filterableItemsSet = this.ui.itemsSet.filter(x => x.name.toLowerCase().includes(filterValue.toLowerCase()))
  }

  addNewItem(newItem: Item) {
    this.ui.addItem(newItem);
    this.ui.pantry.items.push();
    this.ui.updatePantry(this.ui.pantry)
  }
}
