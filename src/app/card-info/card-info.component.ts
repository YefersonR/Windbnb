import { Component, OnInit } from '@angular/core';
import stays from '../../assets/stays.json';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit {
  properties = stays;
  constructor() { }

  ngOnInit(): void {
    console.log(this.properties)
  }

}
