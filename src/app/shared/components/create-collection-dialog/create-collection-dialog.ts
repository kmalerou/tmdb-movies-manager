import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-collection-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-collection-dialog.html',
  styleUrl: './create-collection-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCollectionDialog {
  private readonly dialogRef = inject(MatDialogRef<CreateCollectionDialog>);

  readonly nameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(1)],
  });

  submit(): void {
    if (this.nameControl.valid) {
      this.dialogRef.close(this.nameControl.value.trim());
    }
  }
}
