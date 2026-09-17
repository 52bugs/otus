import { Component, Input } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./app-button.component.html",
  styleUrl: "./app-button.component.scss",
  standalone: false,
})
export class AppButtonComponent {
  @Input() title = "";
}
