import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Mouse Follower</h1>
    <button (click)="onToggleButton()">
      {{ isMouseFollowerEnabled ? 'Disable' : 'Enable' }} mouse follower
    </button>
    <app-mouse-follower [isEnabled]="isMouseFollowerEnabled" />
  `,
})
export class AppComponent {
  isMouseFollowerEnabled: boolean = false;
  onToggleButton() {
    this.isMouseFollowerEnabled = !this.isMouseFollowerEnabled;
  }
}
