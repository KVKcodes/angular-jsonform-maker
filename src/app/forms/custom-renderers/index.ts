import { CustomNumberControlComponent, customNumberControlTester } from './custom-number-control/custom-number-control.component';
import { CustomTextControlComponent, customTextControlTester } from './custom-text-control/custom-text-control.component';

export const customRenderers = [
  { renderer: CustomTextControlComponent, tester: customTextControlTester },
  { renderer: CustomNumberControlComponent, tester: customNumberControlTester }
];

export const customComponents = [
  CustomTextControlComponent,
  CustomNumberControlComponent
]; 