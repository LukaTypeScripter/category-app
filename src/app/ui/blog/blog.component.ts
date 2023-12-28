import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {CategoryService} from "../../services/category.service";
import {map, Observable, take} from "rxjs";
import {CommonModule} from "@angular/common";
import {Post} from "../../models/blog";
import {ActivatedRoute, Router} from "@angular/router";
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    CardComponent
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit{
    categories$ = this.categoryService.category$.asObservable()
    blog$!:Observable<Post[]>
    selectedCategories: string[] = [];
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.filterBlogsByCategory();

    this.categoryService.blogs$.pipe(take(1)).subscribe((blogs) => {
      this.filterBlogsByCategory();
    });
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

}
