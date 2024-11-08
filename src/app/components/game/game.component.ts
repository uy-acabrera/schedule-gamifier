import { Component, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDeckComponent } from '../card-deck/card-deck.component';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, CardDeckComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  @ViewChildren('deckRef') deckRefs!: QueryList<CardDeckComponent>;
  decks = ['mental', 'creative', 'physical', 'relaxing'];
  isRolling = false;

  constructor(private activityService: ActivityService) {}

  selectDeck(type: string) {
    const activity = this.activityService.getRandomActivity(type as any);
    const deck = this.deckRefs.find((d, i) => this.decks[i] === type);
    if (deck) {
      deck.setActivity(activity);
    }
  }

  rollDice() {
    this.isRolling = true;
    this.resetAllDecks();

    setTimeout(() => {
      this.isRolling = false;
      const randomDeck = this.decks[Math.floor(Math.random() * this.decks.length)];
      this.selectDeck(randomDeck);
    }, 600);
  }

  resetAllDecks() {
    this.deckRefs.forEach(deckRef => {
        deckRef.setActivity(null);
    });
  }
}