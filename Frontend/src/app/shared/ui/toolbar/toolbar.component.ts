import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../data-access/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
