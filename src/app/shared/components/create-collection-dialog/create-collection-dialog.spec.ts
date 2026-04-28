import { TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateCollectionDialog } from './create-collection-dialog';

describe('CreateCollectionDialog', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCollectionDialog],
      providers: [{ provide: MatDialogRef, useValue: { close: () => {} } }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CreateCollectionDialog);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
