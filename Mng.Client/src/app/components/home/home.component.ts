import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {  ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, InputTextModule,PanelModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
