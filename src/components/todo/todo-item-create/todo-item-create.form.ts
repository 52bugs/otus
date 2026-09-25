import { inject } from "@angular/core";
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";

export type TodoItemCreateForm = FormGroup<{
  title: FormControl<string>;
  description: FormControl<string>;
}>;

export function createTodoItemCreateForm(): TodoItemCreateForm {
  const fb = inject(NonNullableFormBuilder);

  return fb.group({
    title: ["", Validators.required],
    description: [""],
  });
}
