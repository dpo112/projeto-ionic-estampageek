import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamisasPage } from './camisas.page';

describe('CamisasPage', () => {
  let component: CamisasPage;
  let fixture: ComponentFixture<CamisasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamisasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamisasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
