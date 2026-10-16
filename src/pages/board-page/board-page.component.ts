import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { TodoItem, TodoItemStatus } from "../../models/todo-item.interface";
import { TodoListService } from "../../components/todo/todo-list.service";
import { ToastService } from "../../shared/components/toast/toast.service";
import { SharedModule } from "../../shared/shared.module";
import { finalize } from "rxjs";

interface BoardColumn {
  status: TodoItemStatus;
  titleKey: string;
  prev: TodoItemStatus | null;
  next: TodoItemStatus | null;
}

@Component({
  selector: "app-board-page",
  templateUrl: "./board-page.component.html",
  styleUrl: "./board-page.component.scss",
  imports: [SharedModule, TranslatePipe],
})
export class BoardPageComponent implements OnInit {

  private readonly todoListService = inject(TodoListService);

  private readonly toastService = inject(ToastService);

  private readonly router = inject(Router);

  private readonly translate = inject(TranslateService);

  protected readonly isLoading = signal(true);

  private readonly items = toSignal(this.todoListService.items$, { initialValue: [] });

  protected readonly itemsByStatus = computed<Record<TodoItemStatus, TodoItem[]>>(() => {
    const items = this.items();
    return {
      [TodoItemStatus.TODO]: items.filter((item) => item.status === TodoItemStatus.TODO),
      [TodoItemStatus.IN_PROGRESS]: items.filter((item) => item.status === TodoItemStatus.IN_PROGRESS),
      [TodoItemStatus.COMPLETED]: items.filter((item) => item.status === TodoItemStatus.COMPLETED),
    };
  });

  protected readonly columns: BoardColumn[] = [
    { status: TodoItemStatus.TODO, titleKey: "board.columns.todo", prev: null, next: TodoItemStatus.IN_PROGRESS },
    { status: TodoItemStatus.IN_PROGRESS, titleKey: "board.columns.inProgress", prev: TodoItemStatus.TODO, next: TodoItemStatus.COMPLETED },
    { status: TodoItemStatus.COMPLETED, titleKey: "board.columns.done", prev: null, next: null },
  ];

  ngOnInit(): void {
    this.todoListService.getItems().pipe(finalize(() => this.isLoading.set(false))).subscribe();
  }

  protected openTask(id: string): void {
    this.router.navigate(["/backlog", id]);
  }

  protected moveStatus(item: TodoItem, status: TodoItemStatus, event: MouseEvent): void {
    event.stopPropagation();
    this.todoListService.updateItemStatus(item.id, status).subscribe(() => {
      const statusLabel = this.getStatusLabel(status);
      this.toastService.showToast(this.translate.instant('board.taskMoved', { status: statusLabel }));
    });
  }

  private getStatusLabel(status: TodoItemStatus): string {
    const statusMap: Record<TodoItemStatus, string> = {
      [TodoItemStatus.TODO]: 'status.todo',
      [TodoItemStatus.IN_PROGRESS]: 'status.inProgress',
      [TodoItemStatus.COMPLETED]: 'status.completed',
    };
    return this.translate.instant(statusMap[status]);
  }
}