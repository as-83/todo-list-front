import {Category} from '../model/Category';
import {Priority} from '../model/Priority';
import {Task} from '../model/Task';

export class TestData {
  static categories: Category[] = [
    {category_id: 11, title: 'Все категории'},
    {category_id: 1, title: 'Работа'},
    {category_id: 2, title: 'Семья'},
    {category_id: 3, title: 'Учеба'},
    {category_id: 4, title: 'Отдых'},
    {category_id: 5, title: 'Спорт'},
    {category_id: 6, title: 'Еда'},
    {category_id: 7, title: 'Финансы'},
    {category_id: 8, title: 'Гаджеты'},
    {category_id: 9, title: 'Здоровье'},
    {category_id: 10, title: 'Автомобиль'},
  ];

  static priorities: Priority[] = [
    {id: 1, title: 'Низкий', color: '#e5e5e5'},
    {id: 2, title: 'Средний', color: '#85d1b2'},
    {id: 3, title: 'Высокий', color: '#F1828D'},
    {id: 4, title: 'Очень срочно!!!', color: '#F1128D'},
  ];

  static tasks: Task[] = [
    {
      id: 1,
      title: 'купить бензин',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[10],
      date: new Date('2020-10-16'),
    },
    {
      id: 2,
      title: 'купить дом',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[2],
      date: new Date('2020-10-16'),
    },
    {
      id: 3,
      title: 'купить авто',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[10],
      date: new Date('2020-10-16'),
    },

  ];
}
