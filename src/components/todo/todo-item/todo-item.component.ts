import { Component, inject, input, linkedSignal, output, signal } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { TodoItem, TodoItemStatus } from "../../../models/todo-item.interface";
import { SharedModule } from "../../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { TranslatePipe } from "@ngx-translate/core";
import { TodoListService } from "../todo-list.service";
import { ToastService } from "../../../shared/components/toast/toast.service";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrl: "./todo-item.component.scss",
  imports: [SharedModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, TranslatePipe],
})
export class ToDoListItemComponent {

  todoListService = inject(TodoListService)

  private toastService = inject(ToastService)

  private readonly translate = inject(TranslateService);

  item = input.required<TodoItem>();
  
  deleteItem = output<string>();

  showDescription = output<string>();

  isEditing = signal(false);

  newTodoText = linkedSignal(() => this.item().text);

  selectedItemId = input.required<string | null>();

  updateItemText() {
    this.todoListService.updateItemText(this.item().id, this.newTodoText()).subscribe(() => {
      this.toastService.showToast(this.translate.instant('todo.updated'));
      this.isEditing.set(false);
    });
  }

  updateItemStatus() {
    const nextStatus = this.item().status === TodoItemStatus.COMPLETED ? TodoItemStatus.TODO : TodoItemStatus.COMPLETED;
    this.todoListService.updateItemStatus(this.item().id, nextStatus).subscribe();
  }

  TodoItemStatus = TodoItemStatus;
}