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
  @Output() showAddTask = new EventEmitter();
  tasks: Task[];
  viewTasks: Task[];
  currentCategory: Category;
  constructor(private dataHandler: DataHandlerService) {}

  ngOnInit(): void {
     this.dataHandler.tasks$.subscribe(data => {
       this.tasks = data;
       this.viewTasks = data;
     });
     this.dataHandler.clickedCategory$.subscribe(data => this.currentCategory = data);
  }
  // filtering by category on client side
  // categoryClicked(): void {
  //   if (this.currentCategory.category_id === 11){
  //     this.viewTasks = this.tasks;
  //   }else{
  //     this.viewTasks = this.tasks.filter(task => task.category.category_id === this.currentCategory.category_id);
  //   }
  // }
  // filtering by category on server side
  categoryClicked(): void {
   this.dataHandler.fillTasksByCategory(this.currentCategory).subscribe(data => this.viewTasks = data);
  }

  deleteTask(id: number): void {
    this.dataHandler.deleteTask(id).subscribe(data => {
      this.tasks = data;
      this.viewTasks = data;
    });
  }
  showAddTaskComponent(): void{
    this.showAddTask.emit(null);
  }
}
