import { Product } from './../../models/product.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ModalService } from './../../data-access/modal.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal_content')
  public modalContent: ElementRef;
  subscription: Subscription;
  constructor(public modalService: ModalService) {}

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {}
  ngOnInit(): void {}
}
