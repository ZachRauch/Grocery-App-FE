import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UiService } from 'src/app/services/ui.service';
import { NewRecipeComponent } from '../new-recipe/new-recipe.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
constructor(public ui: UiService, public dialog: MatDialog) {}

panelOpenState = false;

openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  this.dialog.open(NewRecipeComponent, {
    width: '450px',
    enterAnimationDuration,
    exitAnimationDuration,
  });
}

}
