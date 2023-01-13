import { Component } from '@angular/core';
import { Item } from 'src/app/dataModels/Items';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent {

  constructor(public ui: UiService) {}

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
}
