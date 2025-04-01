import { Component, OnInit } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { isNumberControl, RankedTester, rankWith } from '@jsonforms/core';

@Component({
  selector: 'app-custom-number-control',
  templateUrl: './custom-number-control.component.html',
  styleUrls: ['./custom-number-control.component.css']
})
export class CustomNumberControlComponent extends JsonFormsControl implements OnInit {
  // Properties needed by the template
  override id = '';
  override label = '';
  required = false;
  override description = '';
  override enabled = true;
  override error = '';
  isValid = true;
  override data: any = null;
  format = '';
  useSlider = false;
  min = 0;
  max = 100;
  step = 1;

  constructor(jsonFormsService: JsonFormsAngularService) {
    super(jsonFormsService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    // Initialize properties when the component loads
    this.id = this.id || 'custom-number-' + Math.random().toString(36).substring(2, 9);
    this.required = this.scopedSchema && Array.isArray(this.scopedSchema.required) ? false : !!this.scopedSchema?.required;
    this.enabled = !this.disabled;

    // Handle options from UI schema
    if (this.uischema?.options) {
      this.format = this.uischema.options['format'] || '';
      this.useSlider = !!this.uischema.options['slider'];
    }

    // Get min, max, step from schema
    if (this.scopedSchema) {
      if (typeof this.scopedSchema.minimum === 'number') {
        this.min = this.scopedSchema.minimum;
      }
      if (typeof this.scopedSchema.maximum === 'number') {
        this.max = this.scopedSchema.maximum;
      }
      if (this.scopedSchema.multipleOf) {
        this.step = this.scopedSchema.multipleOf;
      }
    }
  }

  shouldShowElement(): boolean {
    return true; // Always show this element
  }

  override getEventValue = (event: any) => {
    const value = event.target.value;
    // Convert to number
    return value === '' ? null : parseFloat(value);
  };

  onFocus(): void {
    // Handle focus event
  }

  onBlur(): void {
    // Handle blur event
  }

  // Format for display
  getFormattedValue(): string {
    if (this.data === null || this.data === undefined) {
      return '';
    }

    if (this.format === 'currency') {
      return `$${this.data.toFixed(2)}`;
    } else if (this.format === 'percentage') {
      return `${this.data}%`;
    } else {
      return this.data.toString();
    }
  }

  // For slider value change
  onValueChange(event: number): void {
    this.onChange(event);
  }
}

export const customNumberControlTester: RankedTester = rankWith(
  5, // Higher rank than default to ensure this is used
  isNumberControl
); 