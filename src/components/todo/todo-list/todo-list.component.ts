import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { ToDoListItemComponent } from "../todo-item/todo-item.component";
import { TodoItemCreateComponent } from "../todo-item-create/todo-item-create.component";
import { SharedModule } from "../../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { TodoListService } from "../todo-list.service";
import { ToastService } from "../../../shared/components/toast/toast.service";
import { TodoItemStatus } from "../../../models/todo-item.interface";
import { filter, map, startWith } from "rxjs";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.scss",
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, RouterOutlet, ToDoListItemComponent, TodoItemCreateComponent, SharedModule, CommonModule],
})
export class TodoListComponent implements OnInit {

  private readonly todoListService = inject(TodoListService);

  private readonly toastService = inject(ToastService);

  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  isLoading = signal(true);

  selectedItemId = signal<string | null>(null);

  private readonly routeId = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.route.snapshot.firstChild?.paramMap.get("id") ?? null),
      startWith(this.route.snapshot.firstChild?.paramMap.get("id") ?? null),
    ),
  );

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

  protected items = computed(() => {
    const filter = this.statusFilter();
    const allItems = this.todoListService.items();
    if (filter === null) {
      return allItems;
    }
    return allItems.filter((item) => item.status === filter);    
  })

  deleteItem(id: string) {
    this.todoListService.deleteItem(id).subscribe(() => {
      this.toastService.showToast("Task deleted");
      if (this.routeId() === id) {
        this.router.navigate(["/tasks"]);
      }
    });
  }

  showDescription(id: string) {
    this.selectedItemId.set(id);
    if (this.routeId() === id) {
      this.selectedItemId.set(null);
      this.router.navigate(["/tasks"]);
      return;
    }
    this.router.navigate(["/tasks", id]);
  }
}
