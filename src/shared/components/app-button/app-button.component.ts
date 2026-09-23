import { Component, input } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./app-button.component.html",
  styleUrl: "./app-button.component.scss",
  standalone: false,
})
export class AppButtonComponent {
  title = input.required<string>();
}
