import { StaysServiceService } from './../stays-service.service';
import { Stays } from './../interfaces/stays';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit {
  properties?:Stays[];
  constructor(private staysServiceService: StaysServiceService) { }

  ngOnInit(): void {
    this.staysServiceService.getStays.subscribe(stays=>{
      this.properties = stays
    })
  }

}
