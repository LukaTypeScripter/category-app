import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {redBerryEmailValidator} from "./entites";
import {CommonModule} from "@angular/common";
import {CategoryService} from "../../services/category.service";
import {map} from "rxjs";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  @Output() closeInfo = new EventEmitter<boolean>();
  email = new FormControl('', [Validators.required, Validators.email, redBerryEmailValidator]);
  constructor(private categoryService:CategoryService) {
  }
  ngOnInit() {

  }

  onLogin() {
    if (this.email.invalid) {
      return;
    }

    const requestData = {
      email: this.email.value
    };

    this.categoryService.login(requestData).pipe(
      map(res => {
        setTimeout(() => {
          console.log(res);
        },2000)

      })
    ).subscribe()
  }

}
