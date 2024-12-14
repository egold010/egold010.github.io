import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './base-components/home/home.component';
import { ProjectsComponent } from './base-components/projects/projects.component';
import { OtherProjectsComponent } from './base-components/other-projects/other-projects.component';
import { InterestsComponent } from './base-components/interests/interests.component';
import { ResumeComponent } from './base-components/resume/resume.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:project', component: ProjectsComponent },
  { path: 'other-projects', component: OtherProjectsComponent },
  { path: 'other-projects/:project', component: OtherProjectsComponent },
  { path: 'interests', component: InterestsComponent },
  { path: 'interests/:interest', component: InterestsComponent },
  { path: 'resume', component: ResumeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
