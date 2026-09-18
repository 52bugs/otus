import { Directive, ElementRef, OnDestroy, Renderer2, inject, input } from "@angular/core";

@Directive({
  selector: "[appTooltip]",
  standalone: false,
  host: {
    "(mouseenter)": "show()",
    "(mouseleave)": "hide()",
  },
})
export class TooltipDirective implements OnDestroy {
  appTooltip = input("Нажми на меня");

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private tooltipElement: HTMLElement | null = null;

  show(): void {
    if (this.tooltipElement) return;

    const tooltip = this.renderer.createElement("div");
    this.renderer.addClass(tooltip, "app-tooltip");
    this.renderer.setProperty(tooltip, "textContent", this.appTooltip());
    this.renderer.appendChild(document.body, tooltip);

    this.position(tooltip);
    this.tooltipElement = tooltip;
  }

  hide(): void {
    if (!this.tooltipElement) return;
    this.renderer.removeChild(document.body, this.tooltipElement);
    this.tooltipElement = null;
  }

  ngOnDestroy(): void {
    this.hide();
  }

  private position(tooltip: HTMLElement): void {
    const hostRect = this.host.nativeElement.getBoundingClientRect();
    const tipRect = tooltip.getBoundingClientRect();

    const left = Math.max(
      8,
      Math.min(
        hostRect.left + hostRect.width / 2 - tipRect.width / 2,
        window.innerWidth - tipRect.width - 8,
      ),
    );
    const top =
      hostRect.top > tipRect.height + 8
        ? hostRect.top - tipRect.height - 8
        : hostRect.bottom + 8;

    this.renderer.setStyle(tooltip, "left", `${left}px`);
    this.renderer.setStyle(tooltip, "top", `${top}px`);
  }
}