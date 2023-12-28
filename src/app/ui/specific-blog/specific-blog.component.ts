import {Component, OnInit, ViewChild} from '@angular/core';
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
  public displayLeftArrow2 = false;
  public displayRightArrow2 = true;
  protected readonly SCROLL_STEP_2 = 100;
  @ViewChild('swiperWrapper') swiperWrapper: any;
  @ViewChild('swiperContent') swiperContent: any;

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
  handleArrow2(arrow: 'left' | 'right') {
    const viewContainerElement = this.swiperContent
      .nativeElement as HTMLElement;

    if (arrow === 'left') {
      viewContainerElement.scrollLeft -= this.SCROLL_STEP_2;
      this.displayRightArrow2 = true;
    } else {
      viewContainerElement.scrollLeft +=  this.SCROLL_STEP_2;
    }

    if (viewContainerElement.scrollLeft) {
      this.displayLeftArrow2 = true;
    }

    if (
      viewContainerElement.clientWidth + viewContainerElement.scrollLeft >=
      viewContainerElement.scrollWidth
    ) {
      this.displayRightArrow2 = false;
      this.displayLeftArrow2 = true;
    } else if (!viewContainerElement.scrollLeft) {
      this.displayRightArrow2 = true;
      this.displayLeftArrow2 = false;
    }

  }

}
