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
		return this.getTechProfileTopics();
	}

	getLineItemsForATopic(topicId) {
		return this.getTechProfileLineItemsByTopic(topicId);
	}
	/** ** */

	getTechProfile() {
		return this.getModel()
	}

	getTechProfileTopics() {
		let rtn = undefined;

		let model = this.getModel()
		if (model) {
			rtn = model["topics"].sort((a, b) => { return a["sequence"] - b["sequence"]; });	
		}
		
		return rtn;
	}

	getTechProfileTopicById(topicId) {
		let rtn = undefined;

		let model = this.getModel()
		if (model) {
			rtn = model["topics"].find((t) => { return t['id'] === topicId });
		}
		
		return rtn;
	}

	getTechProfileLineItemsByTopic(topicId) {
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

	getTechProfileLineItemById(id) {
		let rtn = undefined;

		let model = this.getModel();
		if (model) {
			for (var x=0; !!rtn && x < model["topics"].length; x++) {
				rtn = model["topics"][x]["lineItems"].find((li) => { return li["id"] === id; });
			}
		}

		return rtn;
	}
}
