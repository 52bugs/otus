import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Заготовка для общего компонента кнопки
 */
@Component({
  selector: 'app-button',
  templateUrl: './app-button.component.html',
  styleUrls: ['./app-button.component.scss'],
  standalone: false
})
export class AppButtonComponent {
  @Input() label = '';
  @Input() type = 'button';
  @Input() disabled = false;
  
  @Output() btnClick = new EventEmitter();
  
  onClick(event: Event): void {
    if (!this.disabled) {
      this.btnClick.emit(event);
    }
  }
}