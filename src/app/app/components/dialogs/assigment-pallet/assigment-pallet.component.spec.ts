import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigmentPalletComponent } from './assigment-pallet.component';

describe('AssigmentPalletComponent', () => {
  let component: AssigmentPalletComponent;
  let fixture: ComponentFixture<AssigmentPalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssigmentPalletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigmentPalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
