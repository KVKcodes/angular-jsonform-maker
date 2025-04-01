import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLayoutCustomComponent } from './form-layout-custom.component';

describe('FormLayoutCustomComponent', () => {
  let component: FormLayoutCustomComponent;
  let fixture: ComponentFixture<FormLayoutCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLayoutCustomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLayoutCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
