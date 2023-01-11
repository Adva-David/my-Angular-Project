import { ModalService } from './../../data-access/modal.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  constructor(public modalService: ModalService) {}

  close() {
    this.modalService.closeAlert();
  }
  ngOnInit(): void {}
}
