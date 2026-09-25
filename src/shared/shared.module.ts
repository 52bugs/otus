import { NgModule } from "@angular/core";
import { AppButtonComponent } from "./components/app-button/app-button.component";
import { TooltipDirective } from "./directives/tooltip/tooltip.directive";
import { PreLoaderComponent } from "./components/pre-loader/pre-loader.component";

@NgModule({
  declarations: [AppButtonComponent, TooltipDirective, PreLoaderComponent],
  exports: [AppButtonComponent, TooltipDirective, PreLoaderComponent],
})
export class SharedModule {}
