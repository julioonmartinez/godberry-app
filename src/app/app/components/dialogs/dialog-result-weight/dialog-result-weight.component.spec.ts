import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogResultWeightComponent } from './dialog-result-weight.component';

describe('DialogResultWeightComponent', () => {
  let component: DialogResultWeightComponent;
  let fixture: ComponentFixture<DialogResultWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogResultWeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogResultWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
