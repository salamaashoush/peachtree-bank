import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'backbase-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
