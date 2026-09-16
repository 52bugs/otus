import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ToDoListItemComponent } from "../todo-item/todo-item.component";
import { TodoItem } from "../models/todo-item.interface";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.scss",
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ToDoListItemComponent],
})
export class TodoListComponent {
  readonly items = signal<TodoItem[]>([
    {
      id: 1,
      text: "Buy a new gaming laptop",
    },
    {
      id: 2,
      text: "Complete previous task",
    },
    {
      id: 3,
      text: "Create some angular app",
    },
  ]);

  newTodoText = "";

  addItem() {
    const text = this.newTodoText.trim();
    const maxId = Math.max(0, ...this.items().map((item) => item.id));
    this.items.update((items) => [...items, { id: maxId + 1, text }]);
    this.newTodoText = "";
  }

  deleteItem(id: number) {
    this.items.update((items) => items.filter((item) => item.id !== id));
  }
}
