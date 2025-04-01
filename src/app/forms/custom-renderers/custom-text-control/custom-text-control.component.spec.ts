import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTextControlComponent } from './custom-text-control.component';

describe('CustomTextControlComponent', () => {
  let component: CustomTextControlComponent;
  let fixture: ComponentFixture<CustomTextControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTextControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomTextControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
