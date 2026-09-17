import { Component, input, output } from "@angular/core";
import { TodoItem } from "../models/todo-item.interface";
import { SharedModule } from "../../../shared/shared.module";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrl: "./todo-item.component.scss",
  imports: [SharedModule],
})
export class ToDoListItemComponent {
  item = input.required<TodoItem>();
  deleteItem = output<number>();
}
