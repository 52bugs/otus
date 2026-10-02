import { HttpClient } from "@angular/common/http";
import { Service, inject, signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { TodoItem, TodoItemStatus } from "../../models/todo-item.interface";

const API_URL = "http://localhost:3000/items";

@Service()
export class TodoListService {
  private readonly http = inject(HttpClient);

  private readonly _items = signal<TodoItem[]>([]);

  readonly items = this._items.asReadonly();

  getItems(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(API_URL).pipe(
      tap((items) => this._items.set(items)),
    );
  }

  addItem(text: string, description: string): Observable<TodoItem> {
    const body = { text, description, status: TodoItemStatus.IN_PROGRESS };

    return this.http.post<TodoItem>(API_URL, body).pipe(
      tap((item) => this._items.update((items) => [...items, item])),
    );
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`).pipe(
      tap(() => this._items.update((items) => items.filter((item) => item.id !== id))),
    );
  }

  updateItemText(id: string, text: string): Observable<TodoItem> {
    return this.updateItem(id, { text });
  }

  updateItemStatus(id: string, status: TodoItemStatus): Observable<TodoItem> {
    return this.updateItem(id, { status });
  }

  private updateItem(id: string, changes: Partial<Pick<TodoItem, "text" | "status">>): Observable<TodoItem> {
    return this.http.patch<TodoItem>(`${API_URL}/${id}`, changes).pipe(
      tap((updatedItem) =>
        this._items.update((items) => items.map((item) => (item.id === id ? updatedItem : item))),
      ),
    );
  }
}
