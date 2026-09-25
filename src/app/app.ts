import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppToastComponent } from '../shared/components/toast/app-toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('otus');
}
