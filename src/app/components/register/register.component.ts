import { Component } from '@angular/core';
import { User } from 'src/app/dataModels/Appuser';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  public newUser: User = new User(-1,'','','','')
  public confirmPassword = ''

  constructor(public ui: UiService) {}

  hide = true;
  hide2 = true;
  
  register() {
    if (this.newUser.password === this.confirmPassword){
    this.ui.registerUser(this.newUser)
  } else this.ui.showError("Passwords do not match")
  }
}
