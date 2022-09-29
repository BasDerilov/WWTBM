import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GameComponent } from './game/game.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelpersComponent } from './game/helpers/helpers.component';
import { StagesComponent } from './game/stages/stages.component';
import { QuestionsAnswersComponent } from './game/questions-answers/questions-answers.component';

@NgModule({
  declarations: [AppComponent, LandingPageComponent, GameComponent, HelpersComponent, StagesComponent, QuestionsAnswersComponent],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
