import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdMasculinoPage } from './prod-masculino.page';

describe('ProdMasculinoPage', () => {
  let component: ProdMasculinoPage;
  let fixture: ComponentFixture<ProdMasculinoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdMasculinoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdMasculinoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
