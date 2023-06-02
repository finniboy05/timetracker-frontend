import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from "./pages/about/about.component";
import { DepartmentListComponent } from './pages/department-list/department-list.component';
import { DepartmentDetailComponent } from './pages/department-detail/department-detail.component';
import { StempelListComponent } from './pages/stempel-list/stempel-list.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { EmployeeDetailComponent } from './pages/employee-detail/employee-detail.component';
import { StempelDetailComponent } from './pages/stempel-detail/stempel-detail.component';

const routes: Routes = [
  {path: 'about', component: AboutComponent, pathMatch: 'full'},
  {path: 'stempels', component: StempelListComponent, pathMatch: 'full'},
  {path: 'stempel', component: StempelDetailComponent, pathMatch: 'full', canActivate: ["admin"]},
  {path: 'stempel/:id', component: StempelDetailComponent, pathMatch: 'full', canActivate: ["admin"]},
  {path: 'employees', component: EmployeeListComponent, pathMatch: 'full'},
  {path: 'employee', component: EmployeeDetailComponent, pathMatch: 'full', canActivate: ["admin"]},
  {path: 'employee/:id', component: EmployeeDetailComponent, pathMatch: 'full', canActivate: ["admin"]},
  {path: 'projects', component: ProjectListComponent, pathMatch: 'full'},
  {path: 'project', component: ProjectDetailComponent, pathMatch: 'full', canActivate: ["admin"]},
  {path: 'project/:id', component: ProjectDetailComponent, pathMatch: 'full', canActivate: ["admin"]},
  {path: 'departments', component: DepartmentListComponent, pathMatch: 'full'},
  {path: 'department', component: DepartmentDetailComponent, pathMatch: 'full', canActivate: ["admin"]},
  {path: 'department/:id', component: DepartmentDetailComponent, pathMatch: 'full', canActivate: ["admin"]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
