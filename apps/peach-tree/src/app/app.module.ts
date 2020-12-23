import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiClientModule } from '@backbase/api-client';
import { UiModule } from '@backbase/ui';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UiModule,
    ApiClientModule.withConfig({ baseUrl: environment.baseUrl }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
