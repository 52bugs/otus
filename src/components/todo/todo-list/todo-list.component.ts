import { Component, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ToDoListItemComponent } from "../todo-item/todo-item.component";
import { TodoItem } from "../../../models/todo-item.interface";
import { SharedModule } from "../../../shared/shared.module";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.scss",
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ToDoListItemComponent, SharedModule, CommonModule],
})
export class TodoListComponent implements OnInit {
  readonly items = signal<TodoItem[]>([
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

  isLoading = signal(true);

  selectedItemId = signal<number | null>(null);

  newTodoText = "";
  newTodoDescription = "";

  ngOnInit() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  addItem() {
    const text = this.newTodoText.trim();
    const description = this.newTodoDescription.trim();

    if (!text) {
      return;
    }

    const maxId = Math.max(0, ...this.items().map((item) => item.id));
    this.items.update((items) => [...items, { id: maxId + 1, text, description }]);
    this.newTodoText = "";
    this.newTodoDescription = "";
  }

  deleteItem(id: number) {
    this.items.update((items) => items.filter((item) => item.id !== id));
  }

  showDescription(id: number) {
    if (this.selectedItemId() === id) {
      this.selectedItemId.set(null);
      return;
    }
    this.selectedItemId.set(id);
  }
}
