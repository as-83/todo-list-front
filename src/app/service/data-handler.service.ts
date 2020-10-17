import { Injectable } from '@angular/core';
import {Category} from '../model/Category';
import {TestData} from '../data/TestData';
import { Task } from '../model/Task';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  tasksSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);

  constructor() { }

  getCategories(): Category[]{
    return TestData.categories;
  }

  fillTasks(): void {
    this.tasksSubject.next(TestData.tasks);
  }

  fillTasksByCategory(category: Category): void{
    let  tasks;
    if (category.id === 11){
      tasks = TestData.tasks;
    } else {
      tasks = TestData.tasks.filter(task => task.category === category);
    }
    this.tasksSubject.next(tasks);
  }
}
