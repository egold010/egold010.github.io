import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { PaperComponent } from './paper/paper.component';
import { IntroductionComponent } from './base-components/introduction/introduction.component';
import { AboutComponent } from './base-components/about/about.component';
import { CareerComponent } from './base-components/career/career.component';
import { PapersComponent } from './base-components/papers/papers.component';
import { ProjectsComponent } from './base-components/projects/projects.component';
import { CourseworkComponent } from './base-components/coursework/coursework.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectComponent,
    PaperComponent,
    IntroductionComponent,
    AboutComponent,
    CareerComponent,
    PapersComponent,
    ProjectsComponent,
    CourseworkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }