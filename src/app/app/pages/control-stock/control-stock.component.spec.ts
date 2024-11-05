import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlStockComponent } from './control-stock.component';

describe('ControlStockComponent', () => {
  let component: ControlStockComponent;
  let fixture: ComponentFixture<ControlStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
