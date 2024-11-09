import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { GameComponent } from './app/components/game/game.component';
import { ActivityService } from './app/services/activity.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameComponent],
  template: '<app-game></app-game>'
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    ActivityService
  ]
});