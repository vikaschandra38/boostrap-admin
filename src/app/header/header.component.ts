import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'admin-ui';
  isSidebarActive: boolean = false;
  toggleSidebar(){
    this.isSidebarActive = !this.isSidebarActive;
  }
}
