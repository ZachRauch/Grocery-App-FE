import { Component } from '@angular/core';
import { Item } from 'src/app/dataModels/Items';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  constructor(public ui:UiService) {}

  public newItem: Item = new Item(-1, this.ui.currentUser.userId, '', '', 0)

  onCancel() {
    this.ui.resetDisplays()
    this.ui.displayToolbar = true
  }
}

