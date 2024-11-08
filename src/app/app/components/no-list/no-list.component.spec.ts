import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoListComponent } from './no-list.component';

describe('NoListComponent', () => {
  let component: NoListComponent;
  let fixture: ComponentFixture<NoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
