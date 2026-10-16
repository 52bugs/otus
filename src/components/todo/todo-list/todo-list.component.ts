import { Component, inject, OnInit, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ToDoListItemComponent } from "../todo-item/todo-item.component";
import { SharedModule } from "../../../shared/shared.module";
import { TodoListService } from "../todo-list.service";
import { ToastService } from "../../../shared/components/toast/toast.service";
import { TodoItemStatus } from "../../../models/todo-item.interface";
import { BehaviorSubject, combineLatest, filter, map } from "rxjs";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.scss",
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ToDoListItemComponent, SharedModule, TranslatePipe],
})
export class TodoListComponent implements OnInit {

  private readonly todoListService = inject(TodoListService);

  private readonly toastService = inject(ToastService);

  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  private readonly translate = inject(TranslateService);

  isLoading = signal(true);

  protected readonly selectedItemId = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.route.snapshot.firstChild?.paramMap.get("id") ?? null),
    ),
    { initialValue: this.route.snapshot.firstChild?.paramMap.get("id") ?? null },
  );

  protected readonly statusFilter$ = new BehaviorSubject<TodoItemStatus | null>(null);

  protected readonly statusFilter = toSignal(this.statusFilter$, { initialValue: null });

  readonly statusOptions: { value: TodoItemStatus | null; labelKey: string }[] = [
    { value: null, labelKey: "status.all" },
    { value: TodoItemStatus.TODO, labelKey: "board.columns.todo" },
    { value: TodoItemStatus.IN_PROGRESS, labelKey: "board.columns.inProgress" },
    { value: TodoItemStatus.COMPLETED, labelKey: "board.columns.done" },
  ];

  ngOnInit() {
    this.todoListService.getItems().subscribe({
      next: () => this.isLoading.set(false),
      error: () => this.isLoading.set(false),
    });
  }

  protected readonly items = toSignal(
    combineLatest([
      this.todoListService.items$, 
      this.statusFilter$,
    ]).pipe(
      map(([items, statusFilter]) =>
        statusFilter === null ? items : items.filter((item) => item.status === statusFilter),
      ),
    ),
    { initialValue: [] },
  );

  deleteItem(id: string) {
    this.todoListService.deleteItem(id).subscribe(() => {
      this.toastService.showToast(this.translate.instant('todo.deleted'));
      if (this.selectedItemId() === id) {
        this.router.navigate(["/backlog"]);
      }
    });
  }

  showDescription(id: string) {
    if (this.selectedItemId() === id) {
      this.router.navigate(["/backlog"]);
      return;
    }
    this.router.navigate(["/backlog", id]);
  }
}