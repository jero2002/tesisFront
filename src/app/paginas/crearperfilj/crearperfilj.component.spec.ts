import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearperfiljComponent } from './crearperfilj.component';

describe('CrearperfiljComponent', () => {
  let component: CrearperfiljComponent;
  let fixture: ComponentFixture<CrearperfiljComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearperfiljComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearperfiljComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
