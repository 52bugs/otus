import { Routes } from "@angular/router";
import { ToDoItemViewComponent } from "../components/todo/todo-item-view/todo-item-view.component";
import { BacklogPageComponent } from "../pages/backlog-page/backlog-page.component";
import { BoardPageComponent } from "../pages/board-page/board-page.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "backlog",
    pathMatch: "full",
  },
  {
    path: "backlog",
    component: BacklogPageComponent,
    children: [
      {
        path: ":id",
        component: ToDoItemViewComponent,
      },
    ],
  },
  {
    path: "board",
    component: BoardPageComponent,
  },
  {
    path: "**",
    redirectTo: "backlog",
  },
];
