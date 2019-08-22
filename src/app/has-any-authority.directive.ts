import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Directive({
  selector: '[hasAnyAuthority]'
})
export class HasAnyAuthorityDirective {

  private authorities: string[];

  // tslint:disable-next-line: max-line-length
  constructor(private keycloakService: KeycloakService, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {}

  @Input()
  set hasAnyAuthority(value: string | string[]) {
    this.authorities = typeof value === 'string' ? [value] : value;
    this.updateView();
    // Get notified each time authentication state changes.
    this.keycloakService.keycloakEvents$.subscribe(identity => this.updateView());
  }

  private updateView(): void {

    const hasAnyAuthority = this.keycloakService.getUserRoles().some(r => this.authorities.includes(r));
    this.viewContainerRef.clear();
    if (hasAnyAuthority) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
