import { Routes } from '@angular/router';
import {BlogComponent} from "./ui/blog/blog.component";
import {SpecificBlogComponent} from "./ui/specific-blog/specific-blog.component";

export const routes: Routes = [
  {
    path:"",component:BlogComponent
  },
  {
    path: "blog/:id",component:SpecificBlogComponent
  }
];
