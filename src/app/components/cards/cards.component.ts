import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/Users';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  @Input() users: User[] | [] = [];
  @Output() deleteUserEvent = new EventEmitter<number>();

  onDeleteUser(id: number) {
    this.deleteUserEvent.emit(id);
  }
}
