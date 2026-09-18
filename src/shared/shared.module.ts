import { NgModule } from "@angular/core";
import { AppButtonComponent } from "./components/app-button/app-button.component";
import { TooltipDirective } from "./directives/tooltip/tooltip.directive";

@NgModule({
  declarations: [AppButtonComponent, TooltipDirective],
  exports: [AppButtonComponent, TooltipDirective],
})
export class SharedModule {}
