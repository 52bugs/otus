import { Component } from "@angular/core";
import { AppButtonDirective } from "../../../shared/app-button/app-button.directive";
import { AppInputDirective } from "../../../shared/app-input/app-input.directive";
import { TodoItemComponent } from "../todo-item/todo-item.component";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.scss",
  imports: [AppButtonDirective, AppInputDirective, TodoItemComponent],
})
export class TodoListComponent {

  readonly items = [
    {
      label: "Buy a new gaming  laptop",
      id: '1'
    },
    {
      label: "Complete previous task",
      id: '2'
    },
    {
      label: "Create some angular app",
      id: '3'
    }
  ] 
}
