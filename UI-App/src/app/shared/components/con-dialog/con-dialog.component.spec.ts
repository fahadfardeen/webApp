import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConDialogComponent } from './con-dialog.component';

describe('ConDialogComponent', () => {
  let component: ConDialogComponent;
  let fixture: ComponentFixture<ConDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
