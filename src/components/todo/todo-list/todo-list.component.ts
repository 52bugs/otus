import { Component, inject, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ToDoListItemComponent } from "../todo-item/todo-item.component";
import { TodoItemCreateComponent } from "../todo-item-create/todo-item-create.component";
import { SharedModule } from "../../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { TodoListService } from "../todo-list.service";
import { ToastService } from "../../../shared/components/toast/toast.service";
import { TodoItemStatus } from "../../../models/todo-item.interface";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.scss",
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ToDoListItemComponent, TodoItemCreateComponent, SharedModule, CommonModule],
})
export class TodoListComponent implements OnInit {

  private readonly todoListService = inject(TodoListService);

  private readonly toastService = inject(ToastService);

  isLoading = signal(true);

  selectedItemId = signal<string | null>(null);

  statusFilter = signal<TodoItemStatus | null>(null);

  readonly statusOptions: { value: TodoItemStatus | null; label: string }[] = [
    { value: null, label: "ALL" },
    { value: TodoItemStatus.IN_PROGRESS, label: "IN_PROGRESS" },
    { value: TodoItemStatus.COMPLETED, label: "COMPLETED" },
  ];

  ngOnInit() {
    this.todoListService.getItems().subscribe({
      next: () => this.isLoading.set(false),
      error: () => this.isLoading.set(false),
    });
  }

  get items() {
    const filter = this.statusFilter();
    const allItems = this.todoListService.items();
    if (filter === null) {
      return allItems;
    }
    return allItems.filter((item) => item.status === filter);
  }

  deleteItem(id: string) {
    this.todoListService.deleteItem(id).subscribe(() => {
      this.toastService.showToast("Task deleted");
      if (this.selectedItemId() === id) {
        this.selectedItemId.set(null);
      }
    });
  }


  showDescription(id: string) {
    if (this.selectedItemId() === id) {
      this.selectedItemId.set(null);
      return;
    }
    this.selectedItemId.set(id);
  }
}
