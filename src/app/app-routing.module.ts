import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from "./pages/about/about.component";
import { PersonListComponent } from './pages/person-list/person-list.component';
import { CounterComponent } from './pages/counter/counter.component';

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'persons', component: PersonListComponent},
  {path: 'counter', component: CounterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
