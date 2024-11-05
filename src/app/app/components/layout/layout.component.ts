import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { ListboxModule } from 'primeng/listbox';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ RouterLink,  RouterOutlet, ListboxModule, ToolbarModule, SidebarModule, AvatarModule, ButtonModule, ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  public sidebarVisible:boolean = false

}
