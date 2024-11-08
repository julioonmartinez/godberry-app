import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InCoolerComponent } from './in-cooler.component';

describe('InCoolerComponent', () => {
  let component: InCoolerComponent;
  let fixture: ComponentFixture<InCoolerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InCoolerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InCoolerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
