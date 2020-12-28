import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from 'src/app/model/Task';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @Output() showAddTask = new EventEmitter<Task>();
  tasks: Task[];
  viewTasks: Task[];
  currentCategory: Category;
  private completedFilter = '1';
  filters = {
    keyword: '',
    sortBy: `6`
  };
  constructor(private dataHandler: DataHandlerService) {}

  ngOnInit(): void {
     this.dataHandler.tasks$.subscribe(data => {
       this.tasks = data;
       this.fillTasks();
     });
     this.dataHandler.clickedCategory$.subscribe(data => this.currentCategory = data);
  }
  // filtering by category on client side
  fillTasks(): void {
    this.viewTasks = this.filterByStatus( this.filterByCategory(this.tasks)).filter((e) => {
      return e.title.toLowerCase().includes(this.filters.keyword.toLowerCase());
    }).sort(
      (a, b) => {
        if (this.filters.sortBy === `1`) {
          return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
        }else if (this.filters.sortBy === `2`) {
          return a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1;
        }else if (this.filters.sortBy === `3`) {
          return a.priority.priority_id <= b.priority.priority_id ? -1 : 1;
        }else if (this.filters.sortBy === `4`) {
          return a.priority.priority_id > b.priority.priority_id ? -1 : 1;
        }else if (this.filters.sortBy === `5`) {
          return a.localDate > b.localDate ? -1 : 1;
        }else if (this.filters.sortBy === `6`) {
          return a.localDate > b.localDate ? 1 : -1;
        }
      }
    );
  }

  private filterByCategory(tasks: Task[]): Task[] {
    if (this.currentCategory.category_id === 11) {
      return tasks;
    } else {
      return tasks.filter(task => task.category.category_id === this.currentCategory.category_id);
    }
  }
  private filterByStatus(tasks: Task[]): Task[]{
    switch (this.completedFilter) {
      case '1': {
        return tasks.filter(task => task.completed === false );
        break;
      }
      case '2': {
        return tasks.filter(task => task.completed === true );
        break;
      }
      case '3': {
        return tasks;
        break;
      }
    }
  }

// filtering by category on server side
  // fillTasksByCategory(): void {
  //  this.dataHandler.fillTasksByCategory(this.currentCategory).subscribe(data => this.viewTasks = data);
  // }

  deleteTask(id: number): void {
    this.dataHandler.deleteTask(id).subscribe(data => {
            this.tasks = data;
            this.fillTasks();
    });
  }
  showAddTaskComponent(task: Task): void{
    this.showAddTask.emit(task);
  }

  changeStatus(task: Task): void {
    task.completed = !task.completed;
    this.dataHandler.saveTask(task).subscribe(data => this.fillTasks());
  }

  changeCompleted($event: any): void {
    this.completedFilter = $event.target.value;
    this.fillTasks();
  }
  loadTasks(): void{
    this.dataHandler.loadTasks();
    this.dataHandler.tasks$.subscribe(data => {
      this.tasks = data;
      this.fillTasks();
    });
  }
}
