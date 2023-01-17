import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppinglistAddItemComponent } from './shoppinglist-add-item.component';

describe('ShoppinglistAddItemComponent', () => {
  let component: ShoppinglistAddItemComponent;
  let fixture: ComponentFixture<ShoppinglistAddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppinglistAddItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppinglistAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
