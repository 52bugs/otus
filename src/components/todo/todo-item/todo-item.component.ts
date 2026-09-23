import { Component, input, output } from "@angular/core";
import { TodoItem } from "../../../models/todo-item.interface";
import { SharedModule } from "../../../shared/shared.module";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrl: "./todo-item.component.scss",
  imports: [SharedModule, CommonModule],
})
export class ToDoListItemComponent {
  item = input.required<TodoItem>();
  selectedItemId = input.required<number | null>();
  deleteItem = output<number>();

  showDescription = output<number>();
}
