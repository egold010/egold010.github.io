import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsDeckComponent } from './cards-deck.component';

describe('CardsDeckComponent', () => {
  let component: CardsDeckComponent;
  let fixture: ComponentFixture<CardsDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsDeckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
