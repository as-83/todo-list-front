import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Task} from '../../model/Task';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';
import {Priority} from '../../model/Priority';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  task: Task = new Task();
  categories: Category[];
  priorities: Priority[];
  filters = {
    priorityId: 1,
    categoryId: 1
  };
  visible: boolean = false;

  constructor(private dataService: DataHandlerService) { }

  ngOnInit(): void {
    this.dataService.categories$.subscribe(data => this.categories = data);
    this.dataService.priorities$.subscribe(data => this.priorities = data);
  }

  saveTask(): void {
    this.dataService.saveTask(this.task);
    this.task = new Task();
  }

  deleteTask(id: number): void {
    this.dataService.deleteTask(id);
    this.task = new Task();
  }

  setCategory(): void {
    this.task.category = this.categories[this.filters.categoryId - 1];
  }

  hideComponent(): void {
    this.visible = false;
  }
  showComponent(): void {
    this.visible = true;
  }

  setPriority(): void {
    this.task.priority = this.priorities[this.filters.priorityId - 1];
  }

  setStatus(): void {
    this.task.completed = !this.task.completed;
  }
}
