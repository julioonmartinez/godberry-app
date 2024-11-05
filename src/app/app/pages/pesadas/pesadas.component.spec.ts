import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesadasComponent } from './pesadas.component';

describe('PesadasComponent', () => {
  let component: PesadasComponent;
  let fixture: ComponentFixture<PesadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PesadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
