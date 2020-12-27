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
  @Output() closeEvent = new EventEmitter();
  task: Task = new Task();
  categories: Category[];
  priorities: Priority[];
  filters = {
    priorityId: 1,
    categoryId: 1
  };
  visible: boolean = false;
  private message: string;
  private  map: Map<string, string>;

  constructor(private dataService: DataHandlerService) { }

  ngOnInit(): void {
    this.dataService.categories$.subscribe(data => this.categories = data);
    this.dataService.priorities$.subscribe(data => this.priorities = data);
    this.task.completed = false;
  }

  saveTask(): void {
    this.dataService.saveTask(this.task).subscribe(map => {
      this.map = map;
    });
  }

  deleteTask(id: number): void {
    this.dataService.deleteTask(id);
    this.task = new Task();
  }

  hideComponent(): void {
    this.message  = null;
    this.visible = false;
    this.map = null;
    this.closeEvent.emit(null);
  }

  showComponent($event): void {
    if ($event){
      this.task = $event;
    }else{
      this.task = new Task();
      this.task.completed = false;
      this.task.priority = this.priorities[0];
      this.task.category = this.categories[0];
      console.log('event===null' + ' -------- ' + this.priorities[0] + this.categories[0]);
    }
    this.visible = true;
  }

  setCategory(event: any): void {
    this.task.category = this.categories[ event.target.value];
    console.log(this.task + '------' + event.target.value);
  }

  setPriority($event: any): void {
    this.task.priority = this.priorities[ $event.target.value];
    console.log(this.task + '------' + $event.target.value);
  }

  setStatus(): void {
    this.task.completed = !this.task.completed;
  }

  filterCategories(): Category[] {
    return this.categories.filter(category => category.category_id !== 11);
  }
}
