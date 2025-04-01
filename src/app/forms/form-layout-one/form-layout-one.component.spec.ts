import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLayoutOneComponent } from './form-layout-one.component';

describe('FormLayoutOneComponent', () => {
  let component: FormLayoutOneComponent;
  let fixture: ComponentFixture<FormLayoutOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLayoutOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLayoutOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
