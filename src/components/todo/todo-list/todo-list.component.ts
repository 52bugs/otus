import { Component, inject, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ToDoListItemComponent } from "../todo-item/todo-item.component";
import { SharedModule } from "../../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { TodoListService } from "../todo-list.service";
import { ToastService } from "../../../shared/components/toast/toast.service";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.scss",
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ToDoListItemComponent, SharedModule, CommonModule],
})
export class TodoListComponent implements OnInit {

  private readonly todoListService = inject(TodoListService);

  private readonly toastService = inject(ToastService);

  isLoading = signal(true);

  selectedItemId = signal<number | null>(null);

  newTodoText = "";
  newTodoDescription = "";

  ngOnInit() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  get items() {
    return this.todoListService.items();
  }

  addItem() {
    const text = this.newTodoText.trim();
    const description = this.newTodoDescription.trim();

    if (!text) {
      return;
    }
    
    this.todoListService.addItem(text, description);
    this.toastService.showToast("Task added");
    this.newTodoText = "";
    this.newTodoDescription = "";
  }

  deleteItem(id: number) {
    this.todoListService.deleteItem(id);
    this.toastService.showToast("Task deleted");
    if (this.selectedItemId() === id) {
      this.selectedItemId.set(null);
    }
  }


  showDescription(id: number) {
    if (this.selectedItemId() === id) {
      this.selectedItemId.set(null);
      return;
    }
    this.selectedItemId.set(id);
  }
}
