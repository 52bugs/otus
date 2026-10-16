import { Component, inject } from "@angular/core";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { TranslatePipe } from "@ngx-translate/core";
import { TodoItemCreateComponent } from "./todo-item-create.component";

@Component({
  selector: "app-todo-item-create-dialog",
  templateUrl: "./todo-item-create-dialog.component.html",
  styleUrl: "./todo-item-create-dialog.component.scss",
  imports: [MatDialogModule, TodoItemCreateComponent, TranslatePipe],
})
export class TodoItemCreateDialogComponent {

  private readonly dialogRef = inject<MatDialogRef<TodoItemCreateDialogComponent>>(MatDialogRef);

  close(): void {
    this.dialogRef.close();
  }
}