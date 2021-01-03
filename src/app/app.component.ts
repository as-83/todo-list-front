import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CategoriesComponent} from './views/categories/categories.component';
import {Category} from './model/Category';
import {DataHandlerService} from './service/data-handler.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor() { }

}
