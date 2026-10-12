import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AppToastComponent } from '../shared/components/toast/app-toast.component';
import { TodoItemCreateDialogComponent } from '../components/todo/todo-item-create/todo-item-create-dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AppToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = 'TasksBoard';

  private readonly router = inject(Router);

  private readonly dialog = inject(MatDialog);

  protected readonly sectionName = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.resolveSectionName(this.router.url)),
      startWith(this.resolveSectionName(this.router.url)),
    ),
    { initialValue: 'Backlog' },
  );

  protected readonly isBacklog = computed(() => this.sectionName() === 'Backlog');

  protected openCreateTaskModal(): void {
    this.dialog.open(TodoItemCreateDialogComponent, { width: '480px' });
  }

  private resolveSectionName(url: string): string {
    return url.startsWith('/board') ? 'Board' : 'Backlog';
  }
}
