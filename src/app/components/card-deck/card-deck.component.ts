import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivityType } from '../../enums/activity-type.enum';
import { Activity } from '../../interfaces/activity.interface';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-deck',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './card-deck.component.html',
  styleUrls: ['./card-deck.component.scss']
})
export class CardDeckComponent {
  @Input() type!: ActivityType;
  @Output() selected = new EventEmitter<void>();
  
  isFlipped = false;
  currentActivity: Activity | null = null;

  flipCard() {
    this.isFlipped = !this.isFlipped;
    if (this.isFlipped) {
      this.selected.emit();
    }
  }

  setActivity(activity: Activity | null) {
    this.currentActivity = activity;

    if (activity) {
      this.isFlipped = true;
    } else {
      this.isFlipped = false;
    }
  }
}