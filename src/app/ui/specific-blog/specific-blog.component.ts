import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Observable} from "rxjs";
import {Post} from "../../models/blog";

@Component({
  selector: 'app-specific-blog',
  standalone: true,
  imports: [],
  templateUrl: './specific-blog.component.html',
  styleUrl: './specific-blog.component.scss'
})
export class SpecificBlogComponent implements OnInit{
  public specificBlog$!:Observable<Post[]>
constructor(private categoryService:CategoryService) {
}

ngOnInit() {
}
}
