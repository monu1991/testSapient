import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const baseAPI = "https://api.spacexdata.com/v3/launches?limit=100";

@Injectable({
  providedIn: 'root'
})

export class LocalService {
  private currentLocale = new BehaviorSubject<string>("en");
  constructor(private http:HttpClient) { };

  setLocale(){
  }

  launchPrograms() {
    return this.http.get(baseAPI);
  }
}
