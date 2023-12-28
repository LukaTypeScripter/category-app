import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
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
}
