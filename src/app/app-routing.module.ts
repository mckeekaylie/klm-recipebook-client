import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { RecipesComponent } from './recipes/recipes.component';

const appRoutes: Routes = [
    {path: 'auth', component: AuthComponent},
    {path: 'recipes', component: RecipesComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}