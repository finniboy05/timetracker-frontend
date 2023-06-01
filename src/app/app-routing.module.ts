import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from "./pages/about/about.component";
import { StempelnComponent } from './pages/stempeln/stempeln.component';

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'stempeln', component: StempelnComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
