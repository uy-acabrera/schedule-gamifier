import { Component, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDeckComponent } from '../card-deck/card-deck.component';
import { ActivityService, ActivityTpe } from '../../services/activity.service';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NewActivityModalComponent } from '../new-activity-modal/new-activity-modal.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    CardDeckComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  @ViewChildren('deckRef') deckRefs!: QueryList<CardDeckComponent>;
  decks = [ActivityTpe.mental, ActivityTpe.creative, ActivityTpe.physical, ActivityTpe.relaxing];
  isRolling = false;
  isModalOpen = true;

  constructor(private activityService: ActivityService, private dialog: MatDialog) {}

  selectDeck(type: ActivityTpe) {
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

  openNewActivityModal() {
    const dialogRef = this.dialog.open(NewActivityModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.activity) {
        this.activityService.saveActivity(result.activity);
      }
    });
  }
}