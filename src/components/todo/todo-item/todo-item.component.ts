import { Component, Input } from "@angular/core";
import { SharedModule } from "../../../shared/shared.module";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.scss"],
  imports: [
    SharedModule
  ],
})
export class TodoItemComponent {
  @Input() label = "";

  deleteItem() {
    console.log("delete", this.label);
  }
}