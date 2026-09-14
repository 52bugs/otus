import { Component } from "@angular/core";
import { TodoListComponent } from "../../components/todo/todo-list/todo-list.component";

@Component({
  selector: "app-todo-page",
  templateUrl: "./todo-page.component.html",
  styleUrls: ["./todo-page.component.scss"],
  imports: [
    TodoListComponent,
  ],
})
export class TodoPageComponent {}
