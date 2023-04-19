import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MouseFollowerComponent } from './shared/components/mouse-follower/mouse-follower.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MouseFollowerComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
