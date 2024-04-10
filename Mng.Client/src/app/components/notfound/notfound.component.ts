import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [MatIcon, MatAnchor,MatButtonModule,MatIconModule,MatCardModule,MatToolbarModule],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss'
})
export class NotfoundComponent {
  constructor( private router: Router){}
  routeMainComponent(){
    this.router.navigate(['/employees'])
  }
}
