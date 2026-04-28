import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Collection } from '../../../../shared/models/collection.model';

@Component({
  selector: 'app-collection-card',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './collection-card.html',
  styleUrl: './collection-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionCard {
  readonly collection = input.required<Collection>();
  readonly delete = output<string>();

  onDelete(event: MouseEvent): void {
    event.stopPropagation();
    this.delete.emit(this.collection().id);
  }
}
