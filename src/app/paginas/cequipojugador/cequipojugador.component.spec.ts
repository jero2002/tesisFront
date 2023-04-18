import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CequipojugadorComponent } from './cequipojugador.component';

describe('CequipojugadorComponent', () => {
  let component: CequipojugadorComponent;
  let fixture: ComponentFixture<CequipojugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CequipojugadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CequipojugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
