import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'backbase-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {
  @Input() title = 'Untitled Panel';
  @Input() icon = '/assets/icons/arrows.png';
  @Input() loading = false;
}
