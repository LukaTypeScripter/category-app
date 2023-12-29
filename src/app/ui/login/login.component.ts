import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { FormControl, ReactiveFormsModule,Validators  } from '@angular/forms';
import {redBerryEmailValidator} from "./entites";
import {CommonModule} from "@angular/common";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  @Output() closeInfo = new EventEmitter<boolean>();
  email = new FormControl('', [Validators.required, Validators.email, redBerryEmailValidator]);
  ngOnInit() {

  }

  onLogin(e:any) {
      e.preventDefault()

  }

}
