import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRenderersComponent } from './custom-renderers.component';

describe('CustomRenderersComponent', () => {
  let component: CustomRenderersComponent;
  let fixture: ComponentFixture<CustomRenderersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomRenderersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomRenderersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
