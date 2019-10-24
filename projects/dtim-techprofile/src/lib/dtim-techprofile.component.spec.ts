import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtimTechprofileComponent } from './dtim-techprofile.component';

describe('DtimTechprofileComponent', () => {
  let component: DtimTechprofileComponent;
  let fixture: ComponentFixture<DtimTechprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtimTechprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtimTechprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
