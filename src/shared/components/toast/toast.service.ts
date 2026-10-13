import { Service } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Service()
export class ToastService {
  private readonly _toasts$ = new BehaviorSubject<string[]>([]);

  readonly toasts$ = this._toasts$.asObservable();

  showToast(message: string) {
    this._toasts$.next([...this._toasts$.value, message]);
  }

  hideToast(index: number) {
    this._toasts$.next(this._toasts$.value.filter((_, i) => i !== index));
  }
}
