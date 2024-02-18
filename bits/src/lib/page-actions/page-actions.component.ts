import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

interface Actions {
  left: Action[];
  right: Action[];
}

interface Action {
  label: string;
  id: string;
  disabled?: boolean;
  validateForm?: boolean;
}

@Component({
  selector: 'glab-page-actions',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './page-actions.component.html',
  styleUrls: ['./page-actions.component.scss', '../../styles/global.scss'],
})
export class PageActionsComponent {
  @Input() actions?: Actions;
  @Input() isFormValid?: boolean;
  @Output() actionClick: EventEmitter<string> = new EventEmitter<string>();

  emitActionClick(actionId: string) {
    this.actionClick.emit(actionId);
  }
}
