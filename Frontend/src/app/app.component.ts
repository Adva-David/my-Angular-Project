import { ModalService } from './shared/data-access/modal.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public modalService: ModalService) {}
  title = 'Frontend';
}
