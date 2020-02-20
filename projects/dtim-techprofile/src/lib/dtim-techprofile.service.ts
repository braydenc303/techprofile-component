import { Injectable } from '@angular/core';

import { FunctionPromiseService } from 'savvato-javascript-services'

import { TechProfileAPIService } from './_services/tech-profile-api.service';

@Injectable({
  providedIn: 'root'
})
export class DtimTechprofileComponentService {

	env = undefined;

	constructor(protected _techProfileAPI: TechProfileAPIService,
		private _functionPromiseService: FunctionPromiseService) { }

	_init(env) {
		let self = this;

		self._functionPromiseService.initFunc("THE-TP", () => {
			return new Promise((resolve, reject) => {
				self._techProfileAPI.get(env, 1).then((tp) => {
					resolve(tp);
				})
			})
		})
	}

	reset() {
		this._functionPromiseService.reset("THE-TP");
	}

	waitingPromise() {
		return this._functionPromiseService.waitAndGet("THE-TP", "THE-TP", { 'freshnessLengthInMillis': 60000 * 10 });
	}

	/** ** */
	/*		dtim-techprofile-component model service methods */
	/** ** */
	getModel() {
		return this._functionPromiseService.get("THE-TP", "THE-TP", { 'freshnessLengthInMillis': 60000 * 10 });
	}

	getName() {
		let model = this.getModel();

		if (model) 
			return model['name']
		else
			return undefined;
	}

	getTopics() {
		let rtn = undefined;

		let model = this.getModel()
		if (model) {
			rtn = model["topics"].sort((a, b) => { return a["sequence"] - b["sequence"]; });	
		}
		
		return rtn;
	}

	getLineItemsForATopic(topicId) {
		let rtn = undefined;
		
		let model = this.getModel();
		if (model) {
			let topic = model["topics"].find((t) => { return t["id"] === topicId; });

			if (topic) {
				rtn = topic["lineItems"].sort((a, b) => { return a["sequence"] - b["sequence"]; });
			}
		}

		return rtn;
	}
	/** ** */

}
