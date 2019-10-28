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
  @Input() allowMultiSelect: boolean = false;

  _controller = undefined;

  selectedTopicIDs = [];
  selectedLineItemIDs = [];

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
                },
                _onTopicClick: (thisId) => {
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
                _onLineItemClick: (thisId) => {
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
      let rtn = this._controller["isButtonBarShowing"]()
      console.log("isButtonBarShowing ", rtn)
      return rtn;
    } else {
      console.log("isButtonBarShowing returning true")
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

  getProfileLineItemsByTopic(topicId) {
    if (this._controller && this.areTopicHeadersShowing() && this._controller["getProfileLineItemsByTopic"]) {
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
      return this._controller["getLineItemBackgroundColor"](id, this.selectedLineItemIDs.includes(id));
    } else {
      return "white";
    }
  }

  getTopicBackgroundColor(id) {
    if (this._controller && this._controller["getTopicBackgroundColor"]) {
      return this._controller["getTopicBackgroundColor"](id, this.selectedTopicIDs.includes(id));
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
    if (this._controller && this._controller["_onLineItemClick"]) {
      let isSelected = this._controller["_onLineItemClick"](id);

      if (this._controller && this._controller["onLineItemClick"]) {
        this._controller["onLineItemClick"](id, isSelected);
      }
    }
  }

  onTopicNameClick(id) {
    if (this._controller && this._controller["_onTopicClick"]) {
      let isSelected = this._controller["_onTopicClick"](id);

      if (this._controller && this._controller["onTopicClick"]) {
        this._controller["onTopicClick"](id, isSelected);
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

  areTopicHeadersShowing() {
    return this.collapseToState === this._STATE_FULL_DETAIL || this.collapseToState === this._STATE_TOPICS_HEADERS;
  }

  isFullDetailShowing() {
    return this.collapseToState === this._STATE_FULL_DETAIL;
  }

}
