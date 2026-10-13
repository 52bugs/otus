export interface TodoItem {
  id: string;
  text: string;
  description: string;
  status: TodoItemStatus;
}

export enum TodoItemStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

