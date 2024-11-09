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
import { ActivityTpe } from '../../services/activity.service';

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
  ],
  templateUrl: './new-activity-modal.component.html',
  styleUrl: './new-activity-modal.component.scss'
})
export class NewActivityModalComponent {
  activityType = 'mental';
  description = '';

  constructor(
    private dialogRef: MatDialogRef<NewActivityModalComponent>,
  ) {}

  accept(): void {
    this.dialogRef.close({
      accept: true,
      activity: {
        type: this.activityType as ActivityTpe,
        description: this.description,
      }
    });
  }

  cancel(): void {
    this.dialogRef.close({
      accept: false,
    });
  }
}
