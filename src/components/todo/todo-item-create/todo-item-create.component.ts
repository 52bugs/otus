import { Component, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SharedModule } from "../../../shared/shared.module";
import { TodoListService } from "../todo-list.service";
import { ToastService } from "../../../shared/components/toast/toast.service";
import { createTodoItemCreateForm } from "./todo-item-create.form";

@Component({
  selector: "app-todo-item-create",
  templateUrl: "./todo-item-create.component.html",
  styleUrl: "./todo-item-create.component.scss",
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, SharedModule],
})
export class TodoItemCreateComponent {

  private readonly todoListService = inject(TodoListService);

  private readonly toastService = inject(ToastService);

  readonly form = createTodoItemCreateForm();

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { title, description } = this.form.getRawValue();
    const text = title.trim();

    if (!text) {
      return;
    }

    this.todoListService.addItem(text, description.trim()).subscribe(() => {
      this.toastService.showToast("Task added");
      this.form.reset();
    });
  }
}
