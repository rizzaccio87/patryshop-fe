import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'patryshop-fe';

  constructor(private router: Router) {
  }

  public goToBackOfficeArea(): void {
    this.router.navigate(['back-office']);
  }
}
