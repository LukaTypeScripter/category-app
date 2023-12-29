import { Component } from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LoginComponent,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public loginPopUp:boolean = false
}
