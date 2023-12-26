import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Category} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API = "https://api.blog.redberryinternship.ge/api"
  public category$ = new BehaviorSubject<Category[]>([])

  constructor(private http:HttpClient) {
   this.fetchCategories()
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
  getBlogs() {
    return this.http.get(`${this.API}/blogs`)
  }
  addBlogs(value:any) {
    return this.http.post(`${this.API}/blogs`,value)
  }
  getByIdBlogs(id:number) {
    return this.http.get(`${this.API}/blogs/${id}`,)
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
}
