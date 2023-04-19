import {
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Renderer2,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mouse-follower',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mouse-follower.component.html',
  styleUrls: ['./mouse-follower.component.css'],
})
export class MouseFollowerComponent implements OnChanges, OnDestroy {
  @Input() isEnabled: boolean = false;

  @ViewChild('mouseFollower')
  mouseFollowerEl: ElementRef | null = null;
  private unlistenMouseMove: () => void = () => null;

  constructor(private ngZone: NgZone, private renderer2: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    const isEnabled: SimpleChange = changes['isEnabled'];
    const mustUnlistenMouseMove =
      isEnabled.previousValue === true &&
      !isEnabled.currentValue &&
      this.unlistenMouseMove() === undefined;

    mustUnlistenMouseMove && this.unlistenMouseMove();

    if (!isEnabled.currentValue) return;

    this.ngZone.runOutsideAngular(() => {
      this.unlistenMouseMove = this.renderer2.listen(
        'document',
        'mousemove',
        (e: MouseEvent) => {
          if (!this.mouseFollowerEl) return;
          this.mouseFollowerEl.nativeElement.style.translate = `${e.x}px ${e.y}px`;
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.unlistenMouseMove();
  }
}
