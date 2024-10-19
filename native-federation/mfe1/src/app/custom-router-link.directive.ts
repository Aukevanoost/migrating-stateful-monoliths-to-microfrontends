import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { RouteHandlerService } from './route-handler.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[customRouterLink]',
  standalone: true
})
export class CustomRouterLinkDirective implements OnInit {
  private _routeSub?: Subscription;
  @Input() customRouterLink: any;
  @Input() routerLinkActive: string = "";
  @Input() queryParams: any;

  constructor(
    private routeHandler: RouteHandlerService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this._routeSub = this.routeHandler.navigation$.subscribe(() => {
      this.checkIfRouterLinkActive();
    });

    this.checkIfRouterLinkActive();
  }

  @HostListener('click')
  navigate(): void {
    this.routeHandler.navigate(this.customRouterLink, { queryParams: this.queryParams });
  }

  checkIfRouterLinkActive(): void {
    if (this.routerLinkActive) {
      if (window.location.pathname === this.customRouterLink) {
        this.el.nativeElement.classList.add(this.routerLinkActive);
      } else {
        this.el.nativeElement.classList.remove(this.routerLinkActive);
      }
    }
  }

  ngOnDestroy(): void {
    if(this._routeSub) this._routeSub.unsubscribe();
  }
}
