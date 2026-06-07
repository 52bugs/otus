import { NgModule } from "@angular/core";
import { AppInputComponent } from "./app-input/app-input.component";
import { AppButtonComponent } from "./app-button/app-button.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AppInputComponent,
    AppButtonComponent
  ],
  imports: [CommonModule],
  exports: [
    AppInputComponent, 
    AppButtonComponent
  ]
})
export class SharedModule {}