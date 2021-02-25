import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';

import { TransferHttpService } from '@gorniv/ngx-universal';
import { MetaService } from '@ngx-meta/core';
import { UniversalStorage } from '@shared/storage/universal.storage';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import {LocalService} from '../services/local.services';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  errorMessage: string;
  launchPrograms: any[] = [];
  yearArray:number[]=[];
  developedBY: string = "Nirzar Ambade";
  selectedYear: number;
  selectedLaunchValue: boolean;
  selectedLandValue: boolean;
  currentUrl = null;
  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private _http: TransferHttpService,
    private readonly _meta: MetaService,
    private _universalStorage: UniversalStorage,
    private localService: LocalService,
    private _route: ActivatedRoute,
    private _router: Router,
    // instead window.document
    @Inject(DOCUMENT) private _document: Document,
  ) {}

  ngOnInit(): void {
    this._universalStorage.removeItem('test');    
    let tempArray: number[] = [];
    for(let i=2006;i<=2020;i++){
      tempArray.push(i);
    }
    this.yearArray = [].concat(tempArray);
    let resultCookie = this._universalStorage.getItem('test');
    if (resultCookie) {
      this.errorMessage = 'Cookie remove item not working';
      console.log('Cookie put remove not working');
    }
    console.log('home resultCookie 0:', resultCookie);
    this._universalStorage.setItem('test', 'test2');
    resultCookie = this._universalStorage.getItem('test');
    if (!resultCookie) {
      this.errorMessage = 'Cookie put item not working';
      console.log('Cookie put item not working');
    }
    console.log('home resultCookie 1:', resultCookie);
    const t = window;
    const t1 = document;
    this._meta.setTag('description', 'Meta update from init');
    this.getLaunchPrograms();
  }
  
  clearFilters(){
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        launch_year: null,
        launch_success: null,
        land_success: null
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // do not trigger navigation
    });
  }

  getLaunchPrograms(){
    this.localService.launchPrograms()
      .subscribe((launchPrograms:any[])=>{ 
        this.launchPrograms =launchPrograms;  
      });
  }

  filterByYear(year:number) {
    this.selectedYear = year;
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        launch_year: year
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // do not trigger navigation
    });
    this.launchPrograms = this.launchPrograms.filter(x=>x.launch_year == year);
  }

  filterByLaunch(isSuccess:boolean) {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        launch_success: isSuccess
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // do not trigger navigation
    });
    this.launchPrograms = this.launchPrograms.filter(x=>x.launch_success === isSuccess);
    this.selectedLaunchValue = isSuccess;
  }

  filterByLanding(isSuccess:boolean) {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        land_success: isSuccess
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // do not trigger navigation
    });
    this.launchPrograms = this.launchPrograms.filter(x=>x.launch_landing === isSuccess);
    this.selectedLandValue = isSuccess;
  }
}
