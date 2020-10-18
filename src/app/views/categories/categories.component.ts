import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];

  selectedCategory: Category;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.categoriesSubject.subscribe(categories => this.categories = categories);
    this.selectedCategory = this.categories[0];
    // console.log(this.categories);
  }

  showTaskByCategory(category: Category): void {
    this.selectedCategory = category;
    this.dataHandler.fillTasksByCategory(category);
  }
}
