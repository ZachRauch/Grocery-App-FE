import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/dataModels/Appuser';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent {

  @Input() account: User

  public id: number
  public fname: string
  public lname: string 
  public email: string
  public password: string 

  constructor(public ui: UiService, public dialogRef: MatDialogRef<EditAccountComponent>) {
    this.account = this.ui.accountEdit
    this.id = this.ui.accountEdit.id
    this.fname = this.ui.accountEdit.fname
    this.lname = this.ui.accountEdit.lname
    this.email = this.ui.accountEdit.email
    this.password = this.ui.accountEdit.password
  }

  updateFirstName(fname: string): void {
    this.account.fname = fname
  }

  updateLastName(lname: string): void {
    this.account.lname = lname
  }

  updateEmail(email: string): void {
    this.account.email = email
  }

  updatePassword(password: string): void {
    this.account.password = password
  }

  onApply(): void {
    if (this.email === this.ui.currentUser.email) {
      this.ui.updateEditedProfile( {
        ...this.account
      })
    }

    this.ui.updateEditedAccount(
      {
        ...this.account
      }
    )
    this.ui.displayEdit = false
  }

  onCancel(): void {
    this.ui.displayEdit = false
  }
  }

