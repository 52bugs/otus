import { Routes } from "@angular/router";
import { ToDoItemViewComponent } from "../components/todo/todo-item-view/todo-item-view.component";
import { TodoListComponent } from "../components/todo/todo-list/todo-list.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "tasks",
    pathMatch: "full",
  },
  {
    path: "tasks",
    component: TodoListComponent,
    children: [
      {
        path: ":id",
        component: ToDoItemViewComponent,
      },
    ],
  },
  {
    path: "**",
    redirectTo: "tasks",
  },
];
