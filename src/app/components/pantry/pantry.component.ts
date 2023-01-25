import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/dataModels/Items';
import { UiService } from 'src/app/services/ui.service';
import { AddItemComponent } from '../add-item/add-item.component';
import { PantryAddItemComponent } from '../pantry-add-item/pantry-add-item.component';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent {

  constructor(public ui: UiService, public dialog: MatDialog) {}

  public uniqueValuesList: String[] = []

  getCount(value: String) {
    var count = 0;
    this.ui.pantryValuesList.forEach((v) => ((v === value) && (count++)));
    return count;
}


public valuesList: String[] = []

// getItemNameList(){
//   for (let i = 0; i < this.ui.items.length; i++) {
//     this.valuesList.push(this.ui.items[i].name)
//   } return this.valuesList
// }

  getQuantity(input: String) {
    for (let i = 0; i < this.ui.items.length; i++)
    if (!this.uniqueValuesList.includes(this.ui.items[i].name)) {
      this.uniqueValuesList.push(this.ui.items[i].name);
      this.valuesList.push(this.ui.items[i].name)
    } else this.valuesList.push(this.ui.items[i].name)
    this.getCount(input)
  }

  removeDuplicates() {
    let itemsSet = this.ui.items.filter((value, index, self) => 
    index === self.findIndex((t) => (
      t.name === value.name
    )))
    return itemsSet
  }

  addQuantity(itemObject: Item) {
    this.ui.pantry.items.push(itemObject)
    this.ui.updatePantry(this.ui.pantry)
  }

  reduceQuantity(itemObject: Item) {
    this.ui.pantry.items.splice(this.ui.pantry.items.indexOf(itemObject), 1)
    this.ui.updatePantry(this.ui.pantry)
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PantryAddItemComponent, {
      width: '550px',
      minHeight: '400px',
      maxHeight: '800PX',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
