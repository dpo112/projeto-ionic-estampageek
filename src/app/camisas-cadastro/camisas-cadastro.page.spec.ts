import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamisasCadastroPage } from './camisas-cadastro.page';

describe('CamisasCadastroPage', () => {
  let component: CamisasCadastroPage;
  let fixture: ComponentFixture<CamisasCadastroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamisasCadastroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamisasCadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
