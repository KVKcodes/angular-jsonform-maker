import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonFormsModule } from '@jsonforms/angular';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { MaterialModule } from './material/material.module';

import { FormContainerComponent } from './form-container/form-container.component';
import { FormLayoutCustomComponent } from './form-layout-custom/form-layout-custom.component';
import { FormLayoutOneComponent } from './form-layout-one/form-layout-one.component';
import { FormLayoutTwoComponent } from './form-layout-two/form-layout-two.component';

@NgModule({
  declarations: [
    FormContainerComponent,
    FormLayoutOneComponent,
    FormLayoutTwoComponent,
    FormLayoutCustomComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JsonFormsModule,
    JsonFormsAngularMaterialModule,
    MaterialModule
  ],
  exports: [
    FormContainerComponent,
    FormLayoutOneComponent,
    FormLayoutTwoComponent,
    FormLayoutCustomComponent
  ],
  providers: []
})
export class CustomFormsModule { }
