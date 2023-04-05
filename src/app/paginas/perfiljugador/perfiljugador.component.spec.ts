import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfiljugadorComponent } from './perfiljugador.component';

describe('PerfiljugadorComponent', () => {
  let component: PerfiljugadorComponent;
  let fixture: ComponentFixture<PerfiljugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfiljugadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfiljugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
