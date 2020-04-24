import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDisplayComponent } from './recipes/recipe-display/recipe-display.component';
import { RecipeIndividualComponent } from './recipes/recipe-display/recipe-individual/recipe-individual.component';
import { RecipeService } from './recipes/recipe.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RecipesComponent,
    RecipeDisplayComponent,
    RecipeIndividualComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
