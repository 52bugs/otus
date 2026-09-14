import { Component, input, output } from "@angular/core";
import { TodoItem } from "../models/todo-item.interface";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrl: "./todo-item.component.scss",
})
export class ToDoListItemComponent {
  item = input.required<TodoItem>();
  deleteItem = output<number>();
}
