import { Component, computed, inject, input } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { TodoItemStatus } from "../../../models/todo-item.interface";
import { TodoListService } from "../todo-list.service";

@Component({
  selector: "app-todo-item-view",
  templateUrl: "./todo-item-view.component.html",
  styleUrl: "./todo-item-view.component.scss",
  imports: [MatFormFieldModule, MatSelectModule],
})
export class ToDoItemViewComponent {

  private readonly todoListService = inject(TodoListService);

  readonly id = input<string>();

  readonly item = computed(() => {
    const id = this.id();
    if (!id) {
      return null;
    }
    return this.todoListService.items().find((item) => item.id === id) ?? null;
  });

  readonly statusOptions: TodoItemStatus[] = [TodoItemStatus.IN_PROGRESS, TodoItemStatus.COMPLETED];

  updateItemStatus(status: TodoItemStatus) {
    const item = this.item();
    if (!item) {
      return;
    }
    this.todoListService.updateItemStatus(item.id, status).subscribe();
  }
}
