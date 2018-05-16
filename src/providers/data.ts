import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the DataProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  public BASE_URL = 'http://localhost/backend/';
  public HAS_LOGGED_IN = 'status_login';

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello DataProvider Provider');
  }

  login(data: any,role:string){
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set('user_data', data);
    this.storage.set('role', role);
  }

  getDatauser(){
    return this.storage.get('user_data').then((value) => {
      return value;
    })
  }

  getRole() {
    return this.storage.get('role').then((value) =>{
      return value;
    })
  }
}