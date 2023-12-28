import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {map, Observable, of, switchMap, take} from "rxjs";
import {Post, SpecificPost} from "../../models/blog";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {HeaderComponent} from "../header/header.component";
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-specific-blog',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterLink, CardComponent],
  templateUrl: './specific-blog.component.html',
  styleUrl: './specific-blog.component.scss'
})
export class SpecificBlogComponent implements OnInit{
  public specificBlog$!:Observable<SpecificPost>;
  public similarBlogs$!:Observable<Post[]>
constructor(private categoryService:CategoryService,  private route: ActivatedRoute) {
}

ngOnInit() {
  const blogId :number = +this.route.snapshot.params['id'];
  this.specificBlog$ = this.categoryService.getByIdBlogs(blogId).pipe(map((res:any) => {
    return res
    }))
  this.similarBlogs$ = this.specificBlog$.pipe(
    switchMap(specificBlog => this.categoryService.getSimilarBlogs(specificBlog.categories))
  );

  this.similarBlogs$.subscribe((res) => {
    console.log(res,"awdaw")
  })

}

  protected readonly Array = Array;
}
