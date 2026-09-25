import { Component, inject } from "@angular/core";
import { ToastService } from "./toast.service";

@Component({
  selector: 'app-toast',
  templateUrl: './app-toast.component.html',
  styleUrls: ['./app-toast.component.scss'],
})
export class AppToastComponent {
  protected readonly toastService = inject(ToastService);
}
