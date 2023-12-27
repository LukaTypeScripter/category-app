import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {map, Observable, of, take} from "rxjs";
import {Post, SpecificPost} from "../../models/blog";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-specific-blog',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterLink],
  templateUrl: './specific-blog.component.html',
  styleUrl: './specific-blog.component.scss'
})
export class SpecificBlogComponent implements OnInit{
  public specificBlog$!:Observable<SpecificPost>
constructor(private categoryService:CategoryService,  private route: ActivatedRoute) {
}

ngOnInit() {
  const blogId :number = +this.route.snapshot.params['id'];
  this.specificBlog$ = this.categoryService.getByIdBlogs(blogId).pipe(map((res:any) => {
    return res
    }))
}
}
