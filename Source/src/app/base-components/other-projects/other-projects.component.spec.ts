import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherProjectsComponent } from './other-projects.component';

describe('OtherProjectsComponent', () => {
  let component: OtherProjectsComponent;
  let fixture: ComponentFixture<OtherProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
