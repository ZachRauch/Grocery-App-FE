import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HttpClientModule } from '@angular/common/http';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AccountProfileComponent } from './components/account-profile/account-profile.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {EditAccountComponent} from './components/edit-account/edit-account.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppinglistComponent } from './components/shoppinglist/shoppinglist.component';
import { PantryComponent } from './components/pantry/pantry.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { PantryAddItemComponent } from './components/pantry-add-item/pantry-add-item.component';
import { ShoppinglistAddItemComponent } from './components/shoppinglist-add-item/shoppinglist-add-item.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    RegisterComponent,
    AccountProfileComponent,
    EditAccountComponent,
    RecipesComponent,
    ShoppinglistComponent,
    PantryComponent,
    NewRecipeComponent,
    AddItemComponent,
    PantryAddItemComponent,
    ShoppinglistAddItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatSidenavModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
