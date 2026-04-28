import { ChangeDetectionStrategy, Component, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBar implements OnInit {
  readonly queryChange = output<string>();

  readonly searchControl = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      map((value) => value.trim()),
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((query) => this.queryChange.emit(query));
  }
}
