import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';

@Component({
  selector: 'app-root',
  imports: [
    LoginComponent,
    RouterOutlet,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    ProfileComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'dashboard-ui';
}
