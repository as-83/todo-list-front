import {Injectable, OnInit} from '@angular/core';
import {Category} from '../model/Category';
import {TestData} from '../data/TestData';
import {Task} from '../model/Task';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService{

  private tasksUrl = 'http://localhost:8080/todo-list/tasks';
  private categUrl = 'http://localhost:8080/todo-list/categories';

  tasksSubject = new BehaviorSubject<Task[]>([]);
  categoriesSubject = new BehaviorSubject<Category[]>([]);
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();
  categories$: Observable<Category[]> = this.categoriesSubject.asObservable();
  private currentCategSource = new BehaviorSubject<Category>(new Category(11, 'Все Категории'));
  clickedCategory$ = this.currentCategSource.asObservable();
  allTasks: Task[] = [];

  constructor(private httpClient: HttpClient) {
    this.loadCategories();
    this.loadTasks();
    this.tasks$.subscribe(data => this.allTasks = data );
    console.log(this.allTasks);
  }
  loadCategories(): void {
    this.categories$ = this.httpClient.get<Category[]>(this.categUrl).pipe(
      map(response => response),
       tap(categories => this.categoriesSubject.next(categories))
    );
  }
  loadTasks(): void {
    this.tasks$ = this.httpClient.get<Task[]>(this.tasksUrl).pipe(
       map(response => response),
       tap(tasks => this.tasksSubject.next(tasks))
     );
  }
  setCategory(clickedCategory: Category): void {
    this.currentCategSource.next(clickedCategory);
    console.log(clickedCategory.title);
    console.log(this.allTasks);
  }
  fillTasksByCategory(category: Category): Observable<Task[]> {
    if (category.category_id !== 11) {
      return this.httpClient.get<Task[]>(this.tasksUrl + '/' + category.category_id).pipe(
        map(response => response)
      );
    }else{
      return  this.httpClient.get<Task[]>(this.tasksUrl).pipe(
        map(response => response)
      );
    }
    console.log(category);
  }

}
