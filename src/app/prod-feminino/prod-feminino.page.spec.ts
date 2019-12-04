import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdFemininoPage } from './prod-feminino.page';

describe('ProdFemininoPage', () => {
  let component: ProdFemininoPage;
  let fixture: ComponentFixture<ProdFemininoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdFemininoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdFemininoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
