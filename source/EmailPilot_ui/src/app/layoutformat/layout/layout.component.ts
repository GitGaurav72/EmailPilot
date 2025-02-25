import { Component } from '@angular/core';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BottomNavbarComponent } from '../bottom-navbar/bottom-navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [TopNavbarComponent, SidebarComponent, BottomNavbarComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
