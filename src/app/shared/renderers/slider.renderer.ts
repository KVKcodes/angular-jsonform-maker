import { Component } from '@angular/core';
import { JsonFormsControl } from '@jsonforms/angular';
import { and, isNumberControl, RankedTester, rankWith } from '@jsonforms/core';

@Component({
  selector: 'app-slider-control',
  template: `
    <div class="mb-4">
      <label [for]="id" class="block text-sm font-medium text-gray-700 mb-1">
        {{ label }}
        <span class="text-red-500" *ngIf="scopedSchema.required">*</span>
      </label>
      <div class="flex items-center space-x-4">
        <input
          [id]="id"
          type="range"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          [min]="min"
          [max]="max"
          [step]="1"
          [value]="data || min"
          (input)="onChange($event)"
          [disabled]="!enabled"
        />
        <span class="text-sm text-gray-600">{{ data || min }}</span>
      </div>
      <div *ngIf="description" class="mt-1 text-sm text-gray-500">
        {{ description }}
      </div>
    </div>
  `
})
export class SliderRenderer extends JsonFormsControl {
  get min(): number {
    return this.schema.minimum || 0;
  }

  get max(): number {
    return this.schema.maximum || 100;
  }

  override onChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.data = parseInt(value, 10);
  }
}

export const sliderRendererTester: RankedTester = rankWith(
  3,
  and(
    isNumberControl,
    (uischema, schema) => {
      return schema.type === 'integer' && 
             uischema.options !== undefined && 
             uischema.options['slider'] === true;
    }
  )
); 