import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivityType } from '../../enums/activity-type.enum';

@Component({
  selector: 'app-new-activity-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatSelectModule,
    MatSliderModule,
  ],
  templateUrl: './new-activity-modal.component.html',
  styleUrl: './new-activity-modal.component.scss'
})
export class NewActivityModalComponent {
  activityType = 'mental';
  description = '';
  time = 5;

  constructor(
    private dialogRef: MatDialogRef<NewActivityModalComponent>,
    private snackBar: MatSnackBar,
  ) {}

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  accept(): void {
    if (!this.activityType || !this.description) {
      this.snackBar.open('Activity type and description are required', 'Accept', {
        panelClass: ['error-snackbar']
      });
    } else {
      this.dialogRef.close({
        accept: true,
        activity: {
          type: this.activityType as ActivityType,
          description: this.description,
          time: this.time,
        }
      });
    }
  }

  cancel(): void {
    this.dialogRef.close({
      accept: false,
    });
  }
}
