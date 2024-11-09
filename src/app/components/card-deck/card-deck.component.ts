import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Activity, ActivityTpe } from '../../services/activity.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-deck',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './card-deck.component.html',
  styleUrls: ['./card-deck.component.css']
})
export class CardDeckComponent {
  @Input() type!: ActivityTpe;
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

  reset() {
    this.isFlipped = false;
    this.currentActivity = null;
  }
}