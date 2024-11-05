import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSaveResultWeightComponent } from './dialog-save-result-weight.component';

describe('DialogSaveResultWeightComponent', () => {
  let component: DialogSaveResultWeightComponent;
  let fixture: ComponentFixture<DialogSaveResultWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSaveResultWeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSaveResultWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
