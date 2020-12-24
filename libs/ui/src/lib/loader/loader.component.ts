import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'backbase-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  @Input() message = 'Loading...';
}
