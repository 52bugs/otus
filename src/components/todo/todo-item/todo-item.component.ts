import { Component, input } from "@angular/core";
import { AppButtonDirective } from "../../../shared/app-button/app-button.directive";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrl: "./todo-item.component.scss",
  imports: [
    AppButtonDirective
  ],
})
export class TodoItemComponent {
  label = input("");

  deleteItem() {
    console.log("delete", this.label());
  }
}
