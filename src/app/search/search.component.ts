import { Component, OnInit, ViewEncapsulation, HostListener, ElementRef  } from '@angular/core';
import { StaysServiceService } from '../stays-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  isActive : boolean = false;
  locationModel!:string;
  guestNumberAdults:number = 0;
  guestNumberChildren:number=0
  guestModel!:string;
  typeofSearch!:string;
  searchOptions:string[]= [];
  private element: any;
  private container:any;

  constructor(private ref:ElementRef,
              private staysServiceService:StaysServiceService) {
    this.element = ref.nativeElement
  }

  ngOnInit(): void {
    this.container = document.getElementById("container")
    this.getAllGuest()
  }

  @HostListener('document:click',['$event'])
  clickout(event:any){
    if(this.element.contains(event.target))
    {
      this.container!.classList.add('modal-open');
      document.body.classList.add('modal-open')
      this.isActive = true;
    }
    if(event.target == this.container){
      this.close()
    }
  }

  close(){
    this.container!.classList.remove('modal-open');
    document.body.classList.add('modal-open')
    this.isActive = false;
  }
  getLocations(event:any){
    this.searchOptions =  this.staysServiceService.getLocations();
    this.typeofSearch = event.target.id;
    this.locationModel ??= this.searchOptions[0]
  }
  changeLocation(event:any){
    this.locationModel = this.searchOptions.find(so=> so === event.target.innerText)!
  }
  guest(event:any){
    this.typeofSearch = event.target.id;
  }
  increaseGuestAdults(){
    this.guestNumberAdults++
    this.getAllGuest()
  }
  decrementGuestAdults(){
    if (this.guestNumberAdults === 0) return
    this.guestNumberAdults--
    this.getAllGuest()
  }
  increaseGuestChildren(){
    if(this.guestNumberAdults> 0){
      this.guestNumberChildren++
      this.getAllGuest()
    }
  }
  decrementGuestChildren(){
    if (this.guestNumberChildren === 0) return
    this.guestNumberChildren--
     this.getAllGuest()
  }
  getAllGuest(){
    this.guestModel = this.guestNumberAdults + this.guestNumberChildren  + ' Guest';
  }
  searchStays(){
    const locationCity:string = this.locationModel ?? false ? this.locationModel.split(',')[0] : 'Helsinki'
    const locationCcountry:string = this.locationModel ?? false ? this.locationModel.split(',')[1] : 'Finland'
    const guestnumber:number = this.guestNumberAdults + this.guestNumberChildren

    this.staysServiceService.filterStays(
      locationCity,
      locationCcountry,
      guestnumber
      )
    console.log("CONIO QUE NO CIERRA")
    this.close()
  }
}
