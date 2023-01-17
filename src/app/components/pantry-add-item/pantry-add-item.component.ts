import { Component } from '@angular/core';
import { Item } from 'src/app/dataModels/Items';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-pantry-add-item',
  templateUrl: './pantry-add-item.component.html',
  styleUrls: ['./pantry-add-item.component.css']
})
export class PantryAddItemComponent {
  constructor(public ui:UiService) {}

  public newItem: Item = new Item(-1, '', '')
  panelOpenState = false;

  onCancel() {
    this.ui.resetDisplays()
    this.ui.displayToolbar = true;
    this.ui.displayPantry = true;
  }

  addItemToPantry(newItem: Item) {
    this.ui.pantry.items.push(newItem)
    // this.ui.deletePantry(this.ui.pantry)
    // this.ui.addPantry(this.ui.pantry)
    this.ui.updatePantry(this.ui.pantry)
    // this.ui.showPantry()
  }
}
