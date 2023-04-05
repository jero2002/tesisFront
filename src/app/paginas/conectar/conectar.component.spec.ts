import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConectarComponent } from './conectar.component';

describe('ConectarComponent', () => {
  let component: ConectarComponent;
  let fixture: ComponentFixture<ConectarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConectarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConectarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
