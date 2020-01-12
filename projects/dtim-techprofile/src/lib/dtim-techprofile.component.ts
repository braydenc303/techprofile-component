import { Component, OnInit, Injectable, Input } from '@angular/core';

import { DtimTechprofileComponentService } from './dtim-techprofile.service';


// This component presents a view of the tech profile.
//
// It is included within a larger component, for instance the question edit page (which needs a tech profile
//  so as to associate a question with various cells), or the tech profile editor (which allows the user to
//  change the order of the skills, add new ones, etc.). The larger component therefore defines the meaning
//  and behavior of the tech profile it presents. For instance, the tech profile editor will need to allow
//  a row to be moved, but the question editor does not need this behavior.
//
// The custom behavior is supplied by the 'ctrl' object which is passed as a parameter to this component by
//  its containing component. This component defines a set of functions which it calls in order to respond to
//  some user action. The ctrl object overrides those functions to provide the custom behavior. If a containing
//  component does not need that behavior, it does not override the method. 

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
        
        // wait for the tech profile service to load, then.....
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
              // pass a copy of the tech profile object to the component that is our container
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
