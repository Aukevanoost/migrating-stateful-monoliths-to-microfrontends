import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RouteHandlerService {

  private SHELL_ROUTE = 'mfe1/'

  private _navigation = signal(false);
  public navigation$: Observable<boolean> = toObservable(this._navigation);

  constructor(
    private router: Router
  ) {  }

  navigate(route: string, extras?: NavigationExtras) {
    if (window.shellActive) {
      console.log("Delegating reroute to shell");
      window.dispatchEvent(new CustomEvent('mfeRouteRequest', { detail: { route: `${this.SHELL_ROUTE}${route}`, extras } }));
    } else {
      console.log("Handling navigation");
      this.router.navigate([route], extras);
    }
    this._navigation.set(true);
  }
}
