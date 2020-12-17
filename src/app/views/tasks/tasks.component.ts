import {Component, Input, OnInit} from '@angular/core';
import {Task} from 'src/app/model/Task';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
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

  categoryClicked(): void {
    if (this.currentCategory.category_id === 11){
      this.viewTasks = this.tasks;
    }else{
      this.viewTasks = this.tasks.filter(task => task.category.category_id === this.currentCategory.category_id);
    }
  }
}
