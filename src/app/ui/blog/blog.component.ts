import {Component, Inject, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {CategoryService} from "../../services/category.service";
import {map} from "rxjs";
import {Category} from "../../models/category";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit{
    categories$ = this.categoryService.category$.asObservable()
    constructor(private categoryService:CategoryService) {
    }
  ngOnInit() {
    this.categories$.subscribe((res) => {
      console.log(res,"datasssssss")
    })
  }


}
