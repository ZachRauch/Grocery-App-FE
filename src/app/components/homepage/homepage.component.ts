import { Component } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  constructor(public ui: UiService) {}

}
