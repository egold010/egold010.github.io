import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PapersComponent } from './papers.component';

describe('PapersComponent', () => {
  let component: PapersComponent;
  let fixture: ComponentFixture<PapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PapersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
