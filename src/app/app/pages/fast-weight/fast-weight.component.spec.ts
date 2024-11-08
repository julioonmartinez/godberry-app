import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastWeightComponent } from './fast-weight.component';

describe('FastWeightComponent', () => {
  let component: FastWeightComponent;
  let fixture: ComponentFixture<FastWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FastWeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FastWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
