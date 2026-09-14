import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Заготовка для общего инпута
 */
@Component({
  selector: 'app-input',
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.scss'],
  standalone: false
})
export class AppInputComponent {
  @Input() placeholder = '';
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();
  
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}