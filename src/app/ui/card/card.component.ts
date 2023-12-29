import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Post} from "../../models/blog";
import {CommonModule, NgStyle} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnChanges {
  @Input() filteredBlog!: Post[];
  @Input() types!:"specific"| "blog"
  public blog!:Post[]
  public type:"specific"| "blog" = "blog"
  public displayLeftArrow2 = false;
  public displayRightArrow2 = true;
  protected readonly SCROLL_STEP_2 = 200;
  @ViewChild('swiperWrapper') swiperWrapper: any;
  @ViewChild('swiperContent') swiperContent: any;
  constructor(private router:Router) {
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes) {
      this.blog = this.filteredBlog
      this.type = this.types
    }
  }

  goToSpecificBlog(id: number): void {
    this.router.navigate(['/blog', id]);
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
