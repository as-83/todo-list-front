import {Injectable, OnInit} from '@angular/core';
import {Category} from '../model/Category';
import {Task} from '../model/Task';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Priority} from '../model/Priority';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService{

  private tasksUrl = 'http://localhost:8080/todo-list/tasks';
  private categUrl = 'http://localhost:8080/todo-list/categories';
  private prioritiesUrl = 'http://localhost:8080/todo-list/priorities';

  tasksSubject = new BehaviorSubject<Task[]>([]);
  categoriesSubject = new BehaviorSubject<Category[]>([]);
  prioritiesSubject = new BehaviorSubject<Priority[]>([]);
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();
  categories$: Observable<Category[]> = this.categoriesSubject.asObservable();
  priorities$: Observable<Priority[]> = this.prioritiesSubject.asObservable();
  private currentCategSource = new BehaviorSubject<Category>(new Category(11, 'Все Категории'));
  clickedCategory$ = this.currentCategSource.asObservable();
  allTasks: Task[] = [];

  constructor(private httpClient: HttpClient) {
    this.loadCategories();
    this.loadTasks();
    this.loadPriorities();
    this.tasks$.subscribe(data => this.allTasks = data );
    // console.log(this.allTasks);
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
  loadPriorities(): void {
    this.priorities$ = this.httpClient.get<Priority[]>(this.prioritiesUrl).pipe(
      map(response => response),
      tap(priorities => this.prioritiesSubject.next(priorities))
    );
  }
  setCategory(clickedCategory: Category): void {
    this.currentCategSource.next(clickedCategory);
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
  }

  deleteTask(id: number): Observable<Task[]> {
    return  this.httpClient.delete<Task[]>(this.tasksUrl + '/' + id).pipe(
      map(response => response)
    );
  }

  saveTask(task: Task): Observable<Map<string, string>> {
    // console.log(task);
    // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.httpClient.post<Map<string, string>>(this.tasksUrl, task ).pipe(
      map(response => response)
    );
  }
}
