import { HttpClient } from "@angular/common/http";
import { Service, inject } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { TodoItem, TodoItemStatus } from "../../models/todo-item.interface";

const API_URL = "http://localhost:3000/items";

@Service()
export class TodoListService {
  private readonly http = inject(HttpClient);

  private readonly _items$ = new BehaviorSubject<TodoItem[]>([]);

  readonly items$ = this._items$.asObservable();

  getItems(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(API_URL).pipe(
      tap((items) => this._items$.next(items)),
    );
  }

  addItem(text: string, description: string): Observable<TodoItem> {
    const body = { text, description, status: TodoItemStatus.TODO };

    return this.http.post<TodoItem>(API_URL, body).pipe(
      tap((item) => this._items$.next([...this._items$.value, item])),
    );
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`).pipe(
      tap(() => this._items$.next(this._items$.value.filter((item) => item.id !== id))),
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
        this._items$.next(this._items$.value.map((item) => (item.id === id ? updatedItem : item))),
      ),
    );
  }
}
