import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-driver-crud';

  items: any[] = [
    { label: 'Usuários', icon: 'pi pi-home', routerLink: '/usuarios' },
    { label: 'Carros', icon: 'pi pi-th-large', routerLink: '/carros' },
  ];
}
