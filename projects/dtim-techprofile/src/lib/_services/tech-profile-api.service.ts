import { Injectable } from '@angular/core';
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root'
})
export class TechProfileAPIService {

  constructor(private _apiService: ApiService) {
  	
  }

  get(env, techProfileId) {
    let url = env.apiUrl + "/api/techprofile/" + techProfileId;

  	let rtn = new Promise(
  		(resolve, reject) => {
  			this._apiService.get(url).subscribe(
  				(data) => { 
  					console.log("getTechProfile API call returned");
  					console.log(data);

  					resolve(data);
  				}, (err) => {
  					reject(err);
  				});
  		});

  	return rtn;
  }
}