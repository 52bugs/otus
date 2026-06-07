import { Component } from "@angular/core";
import { SharedModule } from "../../../shared/shared.module";
import { TodoItemComponent } from "../todo-item/todo-item.component";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
  imports: [SharedModule, TodoItemComponent],
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