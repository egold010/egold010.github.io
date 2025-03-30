import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { IntroductionComponent } from './base-components/introduction/introduction.component';
import { AboutComponent } from './base-components/about/about.component';
import { CareerComponent } from './base-components/career/career.component';
import { ProjectsComponent } from './base-components/projects/projects.component';
import { CourseworkComponent } from './base-components/coursework/coursework.component';
import { ProjectComponent } from './project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IntroductionComponent,
    AboutComponent,
    CareerComponent,
    ProjectsComponent,
    CourseworkComponent,
    ProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
