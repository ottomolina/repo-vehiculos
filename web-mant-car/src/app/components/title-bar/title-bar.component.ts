import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {
  @Input() title = '';
  @Output() handleAgregar = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
