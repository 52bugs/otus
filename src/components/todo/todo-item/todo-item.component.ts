import { Component, inject, input, linkedSignal, output, signal } from "@angular/core";
import { TodoItem, TodoItemStatus } from "../../../models/todo-item.interface";
import { SharedModule } from "../../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { TodoListService } from "../todo-list.service";
import { ToastService } from "../../../shared/components/toast/toast.service";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrl: "./todo-item.component.scss",
  imports: [SharedModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
})
export class ToDoListItemComponent {

  todoListService = inject(TodoListService)

  private toastService = inject(ToastService)

  item = input.required<TodoItem>();
  selectedItemId = input.required<string | null>();
  deleteItem = output<string>();

  showDescription = output<string>();

  isEditing = signal(false);

  newTodoText = linkedSignal(() => this.item().text);

  updateItemText() {
    this.todoListService.updateItemText(this.item().id, this.newTodoText()).subscribe(() => {
      this.toastService.showToast("Task updated");
      this.isEditing.set(false);
    });
  }

  updateItemStatus() {
    this.todoListService.updateItemStatus(this.item().id, TodoItemStatus.COMPLETED).subscribe();
  }

  TodoItemStatus = TodoItemStatus;
}
