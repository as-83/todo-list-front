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
  constructor(private dataHandler: DataHandlerService) {}

  ngOnInit(): void {
     this.dataHandler.tasks$.subscribe(data => {
       this.tasks = data;
       this.viewTasks = data.filter(task => task.completed === false);
     });
     this.dataHandler.clickedCategory$.subscribe(data => this.currentCategory = data);
  }
  // filtering by category on client side
  fillTasks(): void {
    this.viewTasks = this.filterByStatus( this.filterByCategory(this.tasks));
  }

  private filterByCategory(tasks: Task[]): Task[] {
    if (this.currentCategory.category_id === 11) {
      return tasks;
    } else {
      return tasks.filter(task => task.category.category_id === this.currentCategory.category_id);
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
