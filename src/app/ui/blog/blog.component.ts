import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {CategoryService} from "../../services/category.service";
import {map, Observable} from "rxjs";
import {CommonModule} from "@angular/common";
import {Post} from "../../models/blog";
import {Router} from "@angular/router";

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
    blog$!:Observable<Post[]>
    selectedCategories: string[] = [];
    constructor(private categoryService:CategoryService,private router:Router) {
    }
  ngOnInit() {
    this.filterBlogsByCategory();
  }
  private filterBlogsByCategory(): void {
      this.blog$ = this.categoryService.blogs$.pipe(
        map(blogs => {
          return blogs.filter(blog =>
            this.selectedCategories.every(categoryName =>
              blog.categories.some((category: any) => category.title === categoryName)
            )
          );
        })
      );
  }
  //კატეგორიების გაფილტვრის დამატება წაშლა
  toggleCategorySelection(categoryName: string): void {
    const index = this.selectedCategories.indexOf(categoryName);
    if (index !== -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(categoryName);
    }
    this.filterBlogsByCategory();
  }
  goToSpecificBlog(id: number): void {
    this.router.navigate(['/blog', id]);
    this.categoryService.getByIdBlogs(id).pipe(map((res:any) => {
        this.categoryService.specificBlog$.next(res)
    })).subscribe()
  }
}
