import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
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
  providers: [ActivityService]
});