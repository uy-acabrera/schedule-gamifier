import { CommonModule } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivityType } from '../../enums/activity-type.enum';
import { ActivityService } from '../../services/activity.service';
import { CardDeckComponent } from '../card-deck/card-deck.component';
import { NewActivityModalComponent } from '../new-activity-modal/new-activity-modal.component';
import { Mood } from '../../enums/mood.enum';
import { MoodToActivityMapping } from '../../interfaces/mood-to-activity-mapping';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    CardDeckComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTooltipModule,
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  @ViewChildren('deckRef') deckRefs!: QueryList<CardDeckComponent>;
  decks = [ActivityType.Mental, ActivityType.Creative, ActivityType.Physical, ActivityType.Relaxing];
  isRolling = false;
  isModalOpen = true;
  selectedMood: Mood | undefined = undefined;

  constructor(private activityService: ActivityService, private dialog: MatDialog) {}

  selectDeck(type: ActivityType) {
    const activity = this.activityService.getRandomActivity(type, this.selectedMood);
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
      const decks = this.selectedMood ? MoodToActivityMapping[this.selectedMood].types : this.decks;
      const randomDeck = decks[Math.floor(Math.random() * decks.length)];
      this.selectDeck(randomDeck);
    }, 600);
  }

  resetAllDecks() {
    this.deckRefs.forEach(deckRef => {
        deckRef.isFlipped = false;
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