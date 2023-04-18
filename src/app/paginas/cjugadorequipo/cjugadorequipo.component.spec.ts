import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CjugadorequipoComponent } from './cjugadorequipo.component';

describe('CjugadorequipoComponent', () => {
  let component: CjugadorequipoComponent;
  let fixture: ComponentFixture<CjugadorequipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CjugadorequipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CjugadorequipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
