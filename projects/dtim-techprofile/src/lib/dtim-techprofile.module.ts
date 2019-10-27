import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DtimTechprofileComponent } from './dtim-techprofile.component';

import { DtimTechprofileComponentService } from './dtim-techprofile.service'
import { TechProfileAPIService } from './_services/tech-profile-api.service'
import { ApiService } from './_services/api.service'

@NgModule({
  declarations: [DtimTechprofileComponent],
  imports: [
  	CommonModule
  	,HttpClientModule
  ],
  providers: [
  	DtimTechprofileComponentService
  	,TechProfileAPIService
  	,ApiService
  ],
  exports: [DtimTechprofileComponent]
})
export class DtimTechprofileModule { }
