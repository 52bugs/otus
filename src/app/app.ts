import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { AppToastComponent } from '../shared/components/toast/app-toast.component';
import { TodoItemCreateDialogComponent } from '../components/todo/todo-item-create/todo-item-create-dialog.component';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AppToastComponent, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = 'TasksBoard';

  protected readonly languageService = inject(LanguageService);

  private readonly router = inject(Router);

  private readonly dialog = inject(MatDialog);

  protected readonly sectionKey = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.resolveSectionKey(this.router.url)),
      startWith(this.resolveSectionKey(this.router.url)),
    ),
    { initialValue: 'backlog' },
  );

  protected readonly isBacklog = computed(() => this.sectionKey() === 'backlog');

  protected openCreateTaskModal(): void {
    this.dialog.open(TodoItemCreateDialogComponent, { width: '480px' });
  }

  private resolveSectionKey(url: string): string {
    return url.startsWith('/board') ? 'board' : 'backlog';
  }
}