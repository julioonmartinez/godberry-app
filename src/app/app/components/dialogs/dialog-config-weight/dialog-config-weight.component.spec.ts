import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfigWeightComponent } from './dialog-config-weight.component';

describe('DialogConfigWeightComponent', () => {
  let component: DialogConfigWeightComponent;
  let fixture: ComponentFixture<DialogConfigWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogConfigWeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfigWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
