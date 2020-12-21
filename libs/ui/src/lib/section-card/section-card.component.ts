import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'backbase-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionCardComponent implements OnInit {
  @Input() title = 'Unnamed section';

  constructor() {}

  ngOnInit(): void {}
}
