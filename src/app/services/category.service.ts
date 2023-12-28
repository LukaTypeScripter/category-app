import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Category} from "../models/category";
import {Author, Post} from "../models/blog";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API = "https://api.blog.redberryinternship.ge/api"
  public category$ = new BehaviorSubject<Category[]>([])
  public blogs$ = new BehaviorSubject<Post[]>([]);
  constructor(private http:HttpClient) {
   this.fetchCategories()
    this.fetchBlogs()
  }
  private fetchCategories() {
    this.getCategories().subscribe({
      next: (res: any) => {
        this.category$.next(res.data);
      },
      error: (error) => {
        console.error("Error fetching categories:", error);
      },
    });
  }
  private fetchBlogs() {
    this.getBlogs().subscribe({
      next: (res: any) => {
        this.blogs$.next(res.data);
      },
      error: (error) => {
        console.error("Error fetching categories:", error);
      },
    });
  }

  getBlogs() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ccd5b877ce48576933a07dca24d4d74bab74bc0ef7520946e8e6477f3549f9a7'
    });
    return this.http.get(`${this.API}/blogs`,{headers})
  }
  addBlogs(value:any) {
    return this.http.post(`${this.API}/blogs`,value)
  }
  getByIdBlogs(id:number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ccd5b877ce48576933a07dca24d4d74bab74bc0ef7520946e8e6477f3549f9a7'
    });
    return this.http.get(`${this.API}/blogs/${id}`,{headers})
  }
  getToken() {
    return this.http.get(`${this.API}/token`)
  }
  getCategories():Observable<Category[]> {
    return  this.http.get<Category[]>(`${this.API}/categories`)
  }
  login(email:any) {
    return this.http.post(`${this.API}/blogs`,email)
  }
  getSimilarBlogs(categories: Category[]): Observable<Post[]> {
    console.log(categories);
    return this.blogs$.pipe(
      map(blogs => {
        console.log(blogs.filter((blog) => blog.categories), "blogs");

        return blogs.filter(blog =>
          blog.categories.some(blogCategory =>
            categories.some(category => category.title === blogCategory.title)
          )
        );
      })
    );
  }
}
