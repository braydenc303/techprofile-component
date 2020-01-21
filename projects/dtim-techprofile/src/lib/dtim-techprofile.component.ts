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
  @Input() allowMultiSelect: boolean = false;

  _controller = undefined;

  selectedTopicIDs = [];
  selectedLineItemIDs = [];

  expandedTopicIDs = [];
  expandedLineItemIDs = [];

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
                getProfileLineItemsByTopic: (topic) => {
                  return self.tpsvc.getLineItemsForATopic(topic['id']);
                },
                _onTopicClick: (topic) => {
                  let thisId = topic['id'];
                  let isSelected = undefined;

                  if (self.selectedTopicIDs.length === 0) {
                    self.selectedTopicIDs.push(thisId);
                    isSelected = true;
                  } else {
                    if (self.allowMultiSelect) {
                      if (self.selectedTopicIDs.find((thatId) => { return thisId === thatId; })) {
                        self.selectedTopicIDs = self.selectedTopicIDs.filter((thatId) => { return thisId !== thatId; })
                        isSelected = false;
                      } else {
                        self.selectedTopicIDs.push(thisId);
                        isSelected = true;
                      }
                    } else {
                      if (self.selectedTopicIDs[0] === thisId) {
                        self.selectedTopicIDs = [];
                        isSelected = false;
                      } else {
                        self.selectedTopicIDs[0] = thisId;
                        isSelected = true;
                      }
                    }
                  }

                  return isSelected;
                },
                _onLineItemClick: (lineItem) => {
                  let thisId = lineItem['id'];
                  let isSelected = undefined;
                  if (self.selectedLineItemIDs.length === 0) {
                    self.selectedLineItemIDs.push(thisId);
                    isSelected = true;
                  } else {
                    if (self.allowMultiSelect) {
                      if (self.selectedLineItemIDs.find((thatId) => { return thisId === thatId; })) {
                        self.selectedLineItemIDs = self.selectedLineItemIDs.filter((thatId) => { return thisId !== thatId; })
                        isSelected = false;
                      } else {
                        self.selectedLineItemIDs.push(thisId);
                        isSelected = true;
                      }
                    } else {
                      if (self.selectedLineItemIDs[0] === thisId) {
                        self.selectedLineItemIDs = [];
                        isSelected = false;
                      } else {
                        self.selectedLineItemIDs[0] = thisId;
                        isSelected = true;
                      }
                    }
                  }

                  return isSelected;
                }
            }

            self._controller = { ...defaultFunctionDefinitionObj, ...ctrl };

            if (self._controller) { // handle inits and provider funcs for the client..
              if( self._controller["initTechProfile"]) {
                self._controller["initTechProfile"](self.tpsvc.getTechProfile());
              }
              if( self._controller["setProviderForSelectedTopicIDs"]) {
                self._controller["setProviderForSelectedTopicIDs"](() => {
                  return self.selectedTopicIDs.slice(0) // return a copy of the array
                });
              }
              if( self._controller["setProviderForSelectedLineItemIDs"]) {
                self._controller["setProviderForSelectedLineItemIDs"](() => {
                  return self.selectedLineItemIDs.slice(0) // return a copy of the array
                });
              }
            } 
        });
      });
  }

  isButtonBarShowing() {
    if (this._controller && this._controller["isButtonBarShowing"]) {
      return this._controller["isButtonBarShowing"]()
    } else {
      return true;
    }
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

  getProfileLineItemsByTopic(topic) {
    if (this._controller && this.areLineItemHeadersShowing(topic) && this._controller["getProfileLineItemsByTopic"]) {
      return this._controller["getProfileLineItemsByTopic"](topic);
    } else {
      return [ ];
    }
  }

  getBackgroundColor(lineItem, idx) {
    if (this._controller && this._controller["getBackgroundColor"]) {
      return this._controller["getBackgroundColor"](lineItem, idx);
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

  getLineItemBackgroundColor(lineItem) {
    if (this._controller && this._controller["getLineItemBackgroundColor"]) {
      return this._controller["getLineItemBackgroundColor"](lineItem, this.selectedLineItemIDs.includes(lineItem['id']), !this.isFullDetailShowing(lineItem));
    } else {
      return "white";
    }
  }

  getTopicBackgroundColor(topic) {
    if (this._controller && this._controller["getTopicBackgroundColor"]) {
      return this._controller["getTopicBackgroundColor"](topic, this.selectedTopicIDs.includes(topic['id']), !this.areLineItemHeadersShowing(topic));
    } else {
      return "white";
    }
  }

  onLxDescriptionClick(lineItem, idx) {
    if (this._controller && this._controller["onLxDescriptionClick"]) {
      return this._controller["onLxDescriptionClick"](lineItem, idx);
    } 
  }

  onLineItemNameClick(lineItem) {
    if (this._controller && this._controller["_onLineItemClick"]) {
      let isSelected = this._controller["_onLineItemClick"](lineItem);

      if (this._controller && this._controller["onLineItemClick"]) {
        this._controller["onLineItemClick"](lineItem, isSelected);
      }
    }
  }

  onTopicNameClick(topic) {
    if (this._controller && this._controller["_onTopicClick"]) {
      let isSelected = this._controller["_onTopicClick"](topic);

      if (this._controller && this._controller["onTopicClick"]) {
        this._controller["onTopicClick"](topic, isSelected);
      }
    }
  }

  onExpandLineItemBtnClick() {
    if (this.allowMultiSelect === false) {
      let currSelectedId = this.selectedLineItemIDs[0];
      if (this.expandedLineItemIDs.includes(currSelectedId)) {
        this.expandedLineItemIDs = this.expandedLineItemIDs.filter((existingId) => { return existingId !== currSelectedId })
      } else {
        this.expandedLineItemIDs.push(currSelectedId)
      }
    }
  }

  onExpandTopicBtnClick() {
    if (this.allowMultiSelect === false) {
      let currSelectedId = this.selectedTopicIDs[0];
      if (this.expandedTopicIDs.includes(currSelectedId)) {
        this.expandedTopicIDs = this.expandedTopicIDs.filter((existingId) => { return existingId !== currSelectedId })
      } else {
        this.expandedTopicIDs.push(currSelectedId)
      }
    }
  }

  _STATE_TOPICS_ONLY = 'topicsOnly'
  _STATE_TOPICS_HEADERS = 'topicsHeaders'
  _STATE_FULL_DETAIL = 'fullDetail'
  collapseToState = this._STATE_FULL_DETAIL;

  onTopicsOnlyBtnClick() {
    this.collapseToState = this._STATE_TOPICS_ONLY;
  }

  onTopicsAndHeadersBtnClick() {
    this.collapseToState = this._STATE_TOPICS_HEADERS;
  }

  onTopicsHeadersAndDetailBtnClick() {
    this.collapseToState = this._STATE_FULL_DETAIL;
  }

  areLineItemHeadersShowing(topic) {
    if (this.expandedTopicIDs.includes(topic['id'])) {
      return true;
    }

    return this.collapseToState === this._STATE_FULL_DETAIL || this.collapseToState === this._STATE_TOPICS_HEADERS;
  }

  isFullDetailShowing(lineItem) {
    if (this.expandedLineItemIDs.includes(lineItem['id'])) {
      return true;
    }
    
    return this.collapseToState === this._STATE_FULL_DETAIL;
  }

}
