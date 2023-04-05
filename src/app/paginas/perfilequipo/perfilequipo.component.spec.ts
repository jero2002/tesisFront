import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilequipoComponent } from './perfilequipo.component';

describe('PerfilequipoComponent', () => {
  let component: PerfilequipoComponent;
  let fixture: ComponentFixture<PerfilequipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilequipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilequipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
