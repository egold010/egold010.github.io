import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { PaperComponent } from './paper/paper.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'project/:title', component: ProjectComponent},
  { path: 'paper/:title', component: PaperComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

RouterModule.forRoot(routes, {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled'
})