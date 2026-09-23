import { Service, signal } from "@angular/core";
import { TodoItem } from "../../models/todo-item.interface";

@Service()
export class TodoListService {
  private readonly _items = signal<TodoItem[]>([
    {
      id: 1,
      text: "Buy a new gaming laptop",
      description: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 2,
      text: "Complete previous task",
      description: 'Consectetur adipiscing elit',
    },
    {
      id: 3,
      text: "Create some angular app",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ]);

  readonly items = this._items.asReadonly();

  addItem(title: string, description: string) {
    this._items.update((items) => {
      const maxId = Math.max(0, ...items.map((item) => item.id));
      return [...items, { id: maxId + 1, text: title, description }];
    });
  }

  deleteItem(id: number) {
    this._items.update((items) => items.filter((item) => item.id !== id));
  }

  updateItem(id: number, text: string) {
    this._items.update((items) => items.map((item) => (item.id === id ? { ...item, text } : item)));
  }
}