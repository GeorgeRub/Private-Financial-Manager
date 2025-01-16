import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  ngOnInit(): void {
    console.log('IndexComponent ngOnInit');
  }



}
