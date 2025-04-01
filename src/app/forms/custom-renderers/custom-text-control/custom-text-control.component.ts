import { Component, OnInit } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { isStringControl, RankedTester, rankWith } from '@jsonforms/core';

@Component({
  selector: 'app-custom-text-control',
  templateUrl: './custom-text-control.component.html',
  styleUrls: ['./custom-text-control.component.css']
})
export class CustomTextControlComponent extends JsonFormsControl implements OnInit {
  // Properties needed by the template
  override id = '';
  override label = '';
  required = false;
  override description = '';
  override enabled = true;
  override error = '';
  isValid = true;
  override data: any = null;

  constructor(jsonFormsService: JsonFormsAngularService) {
    super(jsonFormsService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    // Initialize properties when the component loads
    this.id = this.id || 'custom-input-' + Math.random().toString(36).substring(2, 9);
    this.required = this.uischema?.options?.['required'] || false;
    this.enabled = !this.disabled;
  }

  shouldShowElement(): boolean {
    return true; // Always show this element
  }

  override getEventValue = (event: any) => event.target.value;

  onFocus(): void {
    // Handle focus event
  }

  onBlur(): void {
    // Handle blur event
  }
}

export const customTextControlTester: RankedTester = rankWith(
  3,
  isStringControl
);
