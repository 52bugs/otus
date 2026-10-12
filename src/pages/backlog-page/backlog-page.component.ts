import { Component, computed, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { filter, map, startWith } from "rxjs";
import { TodoListComponent } from "../../components/todo/todo-list/todo-list.component";

@Component({
  selector: "app-backlog-page",
  templateUrl: "./backlog-page.component.html",
  styleUrl: "./backlog-page.component.scss",
  imports: [RouterOutlet, TodoListComponent],
})
export class BacklogPageComponent {

  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  private readonly routeId = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.route.snapshot.firstChild?.paramMap.get("id") ?? null),
      startWith(this.route.snapshot.firstChild?.paramMap.get("id") ?? null),
    ),
  );

  protected readonly hasSelectedTask = computed(() => this.routeId() !== null);
}
