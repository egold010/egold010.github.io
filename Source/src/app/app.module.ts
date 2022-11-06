import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './base-components/home/home.component';
import { ProjectsComponent } from './base-components/projects/projects.component';
import { InterestsComponent } from './base-components/interests/interests.component';

import { CardsDeckComponent } from './cards-deck/cards-deck.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    InterestsComponent,
    CardsDeckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
