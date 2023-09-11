import { Injectable, OnInit } from '@angular/core';
import { Stays } from './interfaces/stays';
import stays from "../assets/stays.json"
import { BehaviorSubject, max } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaysServiceService {
  data:Stays[] = stays;
  actualStays!:Stays[];
  locations:string[]=[];
  _stays: BehaviorSubject<Stays[]> = new BehaviorSubject<Stays[]>(this.data)
  constructor() { }

  get getStays(){
    return this._stays.asObservable();
  }
  getLocations():string[]{
    this.data.forEach((stay:Stays)=>{
      if(this.locations.includes(`${stay.city},${stay.country}`)) return
      this.locations.push(`${stay.city},${stay.country}`)
    })
    return this.locations;
  }
  filterStays(city?:string,country?:string,maxGuests?:number){
    this.actualStays = this.data

    if(country ?? false){
      this.actualStays = this.actualStays.filter(stay=> stay.country === country)
    }
    if(city ?? false){
      this.actualStays = this.actualStays.filter(stay=> stay.city === city)
    }
    if(maxGuests !== undefined){
      this.actualStays = this.actualStays.filter(stay=> stay.maxGuests > maxGuests)
    }
    this._stays.next(this.actualStays);
  }

}
