import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { IntroductionComponent } from './base-components/introduction/introduction.component';
import { AboutComponent } from './base-components/about/about.component';
import { CareerComponent } from './base-components/career/career.component';
import { PapersComponent } from './base-components/papers/papers.component';
import { ProjectsComponent } from './base-components/projects/projects.component';
import { CourseworkComponent } from './base-components/coursework/coursework.component';
import { SkillsComponent } from './base-components/skills/skills.component';
import { ProjectComponent } from './project/project.component';
import { PaperComponent } from './paper/paper.component';
import { ScrollAnimationDirective } from './scroll-animation.directive';
import { TypewriterDirective } from './typewriter.directive';
import { ParallaxDirective } from './parallax.directive';
import { ScrollProgressComponent } from './scroll-progress.component';
import { FloatingActionButtonComponent } from './floating-action-button.component';
import { GithubStatsComponent } from './github-stats.component';
import { ParticleEffectsComponent } from './particle-effects.component';
import { LoadingScreenComponent } from './loading-screen.component';
import { ContactComponent } from './base-components/contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { TestimonialsComponent } from './base-components/testimonials/testimonials.component';

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
    ScrollAnimationDirective,
    TypewriterDirective,
    ParallaxDirective,
    ScrollProgressComponent,
    FloatingActionButtonComponent,
    GithubStatsComponent,
    ParticleEffectsComponent,
    LoadingScreenComponent,
    SkillsComponent,
    ContactComponent,
    FooterComponent,
    TestimonialsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
