export class Priority {
  priority_id: number;
  title: string;
  color: string;

  constructor(priority_id: number, title: string, color: string) {
    this.priority_id = priority_id;
    this.title = title;
    this.color = color;
  }
}
