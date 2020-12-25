import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Output() categoryEvent = new EventEmitter();
  categories: Category[] = [];
  selectedCategory: Category ;
  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    // this.dataHandler.categoriesSubject.subscribe(data => this.categories = data);
    this.dataHandler.categories$.subscribe(data => {this.categories = data;
                                                    this.selectedCategory = this.categories[10]; });
    this.dataHandler.clickedCategory$.subscribe(data => this.selectedCategory = data);
  }

  categoryClick(category: Category): void {
    // this.selectedCategory = category;
    this.dataHandler.setCategory(category);
    // this.dataHandler.fillTasksByCategory(category);
    this.categoryEvent.emit(null);
  }
}
