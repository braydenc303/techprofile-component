import { Injectable } from '@angular/core';

import { TechProfileAPIService } from './_services/tech-profile-api.service';

@Injectable({
  providedIn: 'root'
})
export class DtimTechprofileComponentService {

	techProfile = undefined;
	questionCountsPerCell = undefined;

	constructor(protected _techProfileAPI: TechProfileAPIService) { }

	_init(env, force?: boolean) {
		let self = this;

		if (force || self.techProfile === undefined) {
			self.techProfile = null;

			self._techProfileAPI.get(env, 1).then((tp) => {
				self.techProfile = tp;
			})
		}
	}

	waitingPromise() {
		let self = this;
		return new Promise((resolve, reject) => {

			function to() {
				setTimeout(() => {
					if (self.isTechProfileAvailable())
						resolve();
					else
						to();
				}, 600);
			}

			to();
		})
	}

	isTechProfileAvailable() {
		return this.techProfile && this.techProfile != null;
	}

	/** ** */
	/*		dtim-techprofile-component model service methods */
	/** ** */
		getModel() {
			return this.getTechProfile();
		}

		getName() {
			return this.getTechProfile()['name']
		}

		getTopics() {
			return this.getTechProfileTopics();
		}

		getLineItemsForATopic(topicId) {
			return this.getTechProfileLineItemsByTopic(topicId);
		}
	/** ** */

	getTechProfile() {
		return this.techProfile;
	}

	getTechProfileTopics() {
		return this.techProfile["topics"].sort((a, b) => { return a["sequence"] - b["sequence"]; });
	}

	getTechProfileTopicById(topicId) {
		return this.techProfile["topics"].find((t) => { return t['id'] === topicId });
	}

	getTechProfileLineItemsByTopic(topicId) {
		let rtn = undefined;
		let topic = this.techProfile["topics"].find((t) => { return t["id"] === topicId; });

		if (topic) {
			rtn = topic["lineItems"].sort((a, b) => { return a["sequence"] - b["sequence"]; });
		}

		return rtn;
	}

	getTechProfileLineItemById(id) {
		let rtn = undefined;

		for (var x=0; this.techProfile && !rtn && x < this.techProfile["topics"].length; x++) {
			rtn = this.techProfile["topics"][x]["lineItems"].find((li) => { return li["id"] === id; });
		}

		return rtn;
	}
}
