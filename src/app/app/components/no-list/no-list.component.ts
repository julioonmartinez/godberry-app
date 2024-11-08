import { Component, Input, signal, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './no-list.component.html',
  styleUrl: './no-list.component.scss'
})
export class NoListComponent {
  
  @Input() warningText: Signal<string> = signal('No hay nada en el lista');
  @Input() linkButtom: Signal<string | null> = signal(null);

}
