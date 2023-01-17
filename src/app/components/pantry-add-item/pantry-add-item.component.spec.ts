import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantryAddItemComponent } from './pantry-add-item.component';

describe('PantryAddItemComponent', () => {
  let component: PantryAddItemComponent;
  let fixture: ComponentFixture<PantryAddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantryAddItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantryAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
