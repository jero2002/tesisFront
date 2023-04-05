import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearperfilcComponent } from './crearperfilc.component';

describe('CrearperfilcComponent', () => {
  let component: CrearperfilcComponent;
  let fixture: ComponentFixture<CrearperfilcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearperfilcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearperfilcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
