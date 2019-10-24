import { Component, OnInit, Injectable, Input } from '@angular/core';

import { DtimTechprofileComponentService } from './dtim-techprofile.service';

@Injectable({
    providedIn: 'root'
})
@Component({
  selector: 'lib-dtim-techprofile-component',
  templateUrl: './dtim-techprofile.component.html',
  styleUrls: ['./dtim-techprofile.component.scss']
})
export class DtimTechprofileComponent implements OnInit {

  @Input() ctrl: any;

  _controller = undefined;

 constructor(private tpsvc: DtimTechprofileComponentService) { }

  ngOnInit() {
    let self = this;
    self.ctrl.then((ctrl) => { 

        self.tpsvc._init(ctrl.getEnv(), true);
        self.tpsvc.waitingPromise().then(() => {

            let defaultFunctionDefinitionObj = {  
                getModel: () => {
                  return self.tpsvc.getModel();
                },
                getProfileName: () => {
                  return self.tpsvc.getName();
                },
                getProfileTopics: () => {
                  return self.tpsvc.getTopics();
                },
                getProfileLineItemsByTopic: (topicId) => {
                  return self.tpsvc.getLineItemsForATopic(topicId);
                }
            }

            self._controller = { ...defaultFunctionDefinitionObj, ...ctrl };

            if (self._controller && self._controller["initTechProfile"]) {
              self._controller["initTechProfile"](self.tpsvc.getTechProfile());
            }
        });
      });
  }

  getProfileName() {
    if (this._controller && this._controller["getProfileName"]) {
      return this._controller["getProfileName"]();
    } else {
      return "";
    }
  }

  getProfileTopics() {
    if (this._controller && this._controller["getProfileTopics"]) {
      return this._controller["getProfileTopics"]();
    } else {
      return [ ];
    }
  }

  getProfileLineItemsByTopic(topicId) {
    if (this._controller && this._controller["getProfileLineItemsByTopic"]) {
      return this._controller["getProfileLineItemsByTopic"](topicId);
    } else {
      return [ ];
    }
  }

  getBackgroundColor(id, idx) {
    if (this._controller && this._controller["getBackgroundColor"]) {
      return this._controller["getBackgroundColor"](id, idx);
    } else {
      return "white";
    }
  }

  getColorMeaningString() {
    if (this._controller && this._controller["getColorMeaningString"]) {
      return this._controller["getColorMeaningString"]();
    } else {
      return "";
    }
  }

  getLineItemBackgroundColor(id) {
    if (this._controller && this._controller["getLineItemBackgroundColor"]) {
      return this._controller["getLineItemBackgroundColor"](id);
    } else {
      return "white";
    }
  }

  getTopicBackgroundColor(id) {
    if (this._controller && this._controller["getTopicBackgroundColor"]) {
      return this._controller["getTopicBackgroundColor"](id);
    } else {
      return "white";
    }
  }

  onLxDescriptionClick(id, idx) {
    if (this._controller && this._controller["onLxDescriptionClick"]) {
      return this._controller["onLxDescriptionClick"](id, idx);
    } 
  }

  onLineItemNameClick(id) {
    if (this._controller && this._controller["onLineItemClick"]) {
      return this._controller["onLineItemClick"](id);
    }
  }

  onTopicNameClick(id) {
    if (this._controller && this._controller["onTopicClick"]) {
      return this._controller["onTopicClick"](id);
    }
  }

}
