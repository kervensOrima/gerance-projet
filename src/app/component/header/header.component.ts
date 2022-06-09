import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }


  menu() {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');


    const v = document.body.classList.contains('sb-sidenav-toggled') ? "true" : "false" ;


    if (sidebarToggle) {

      // Uncomment Below to persist sidebar toggle between refreshes
      if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
          document.body.classList.toggle('sb-sidenav-toggled');

      }

      document.body.classList.toggle('sb-sidenav-toggled');
      localStorage.setItem('sb|sidebar-toggle', v  );
      
    }
  }


}
