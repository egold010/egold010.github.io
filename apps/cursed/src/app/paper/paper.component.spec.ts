import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperComponent } from './paper.component';

describe('PaperComponent', () => {
  let component: PaperComponent;
  let fixture: ComponentFixture<PaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
