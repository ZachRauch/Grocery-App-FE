import { Component } from '@angular/core';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zach-rauch-pantry-fe';

  constructor(public ui: UiService) {}

  backgroundUrl="https://wallpaperaccess.com/full/3234822.jpg"
}
