import { Component, OnInit } from '@angular/core';
import { StaysServiceService } from './stays-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'WindBNB';
  location = 'Stays in Finland'
  quantity = 0
  constructor(private staysServiceService: StaysServiceService) {
  }
  ngOnInit(): void {
    this.staysServiceService.getStays.subscribe(stayss=>{
      this.quantity = stayss.length
    })
  }
  home(){
    this.staysServiceService.filterStays()
  }
}
