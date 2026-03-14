import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { IntroductionComponent } from './base-components/introduction/introduction.component';
import { AboutComponent } from './base-components/about/about.component';
import { CareerComponent } from './base-components/career/career.component';
import { PapersComponent } from './base-components/papers/papers.component';
import { ProjectsComponent } from './base-components/projects/projects.component';
import { CourseworkComponent } from './base-components/coursework/coursework.component';
import { ProjectComponent } from './project/project.component';
import { PaperComponent } from './paper/paper.component';
import { ProjectCardComponent } from './base-components/project-card/project-card.component';
import { SafeHtmlComponent } from './safe-html/safe-html.component';
import { TiltDirective } from './tilt.directive';
import { MagneticDirective } from './magnetic.directive';
import { RevealDirective } from './reveal.directive';
import { DecodeDirective } from './decode.directive';
import { DraggableDirective } from './draggable.directive';
import { RepelDirective } from './repel.directive';
import { ExplodeDirective } from './explode.directive';

import { SafeHtmlPipe } from './safe-html.pipe';
import { NgParticlesModule } from 'ng-particles';

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
    PapersComponent,
    PaperComponent,
    ProjectCardComponent,
    SafeHtmlComponent,
    SafeHtmlPipe,
    TiltDirective,
    MagneticDirective,
    RevealDirective,
    DecodeDirective,
    DraggableDirective,
    RepelDirective,
    ExplodeDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgParticlesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
