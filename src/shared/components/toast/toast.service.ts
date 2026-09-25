import { Service, signal } from "@angular/core";

@Service()
export class ToastService {
  private readonly _toasts = signal<string[]>([]);

  readonly toasts = this._toasts.asReadonly();

  showToast(message: string) {
    this._toasts.update((toasts) => [...toasts, message]);
  }

  hideToast(index: number) {
    this._toasts.update((toasts) => toasts.filter((_, i) => i !== index));
  }
}
