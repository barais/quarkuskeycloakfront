import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HasAnyAuthorityDirective } from './has-any-authority.directive';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


const keycloakService = new KeycloakService();


@NgModule({
  declarations: [
    AppComponent,
    HasAnyAuthorityDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    KeycloakAngularModule,
    NgbModule
  ],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService
    }
  ],
  //bootstrap: [AppComponent]
  entryComponents: [AppComponent]

})
export class AppModule {

  ngDoBootstrap(app) {
    keycloakService
      .init()
      .then(() => {
        console.log('[ngDoBootstrap] bootstrap app');

        app.bootstrap(AppComponent);
      })
      .catch(error => console.error('[ngDoBootstrap] init Keycloak failed', error));
  }

}
