import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLayoutTwoComponent } from './form-layout-two.component';

describe('FormLayoutTwoComponent', () => {
  let component: FormLayoutTwoComponent;
  let fixture: ComponentFixture<FormLayoutTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLayoutTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLayoutTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
