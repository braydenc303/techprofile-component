import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DtimTechprofileComponent } from './dtim-techprofile.component';

@NgModule({
  declarations: [DtimTechprofileComponent],
  imports: [
  	CommonModule
  ],
  exports: [DtimTechprofileComponent]
})
export class DtimTechprofileModule { }
