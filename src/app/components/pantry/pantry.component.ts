import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/dataModels/Items';
import { UiService } from 'src/app/services/ui.service';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent {

  constructor(public ui: UiService, public dialog: MatDialog) {}

  addQuantity(itemObject: Item) {
    itemObject.quantity = itemObject.quantity + 1
    this.ui.updateItem(itemObject)
  }

  reduceQuantity(itemObject: Item) {
    if (itemObject.quantity >= 1) {
    itemObject.quantity = itemObject.quantity - 1
    this.ui.updateItem(itemObject)
  } else this.ui.showError(`You have no more ${itemObject.name} to remove`)
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddItemComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
