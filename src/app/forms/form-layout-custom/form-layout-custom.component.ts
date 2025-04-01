import { Component, OnInit } from '@angular/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { JsonSchema, Layout } from '@jsonforms/core';
import { FormsService } from '../forms.service';

interface Example {
  schema: any;
  uischema: any;
  data: any;
}

interface Examples {
  [key: string]: Example;
}

@Component({
  selector: 'app-form-layout-custom',
  templateUrl: './form-layout-custom.component.html',
  styleUrls: ['./form-layout-custom.component.css']
})
export class FormLayoutCustomComponent implements OnInit {
  // Form states
  schemaText: string = '';
  uiSchemaText: string = '';
  
  // JSON Forms properties
  schema: JsonSchema = {} as JsonSchema;
  uischema: Layout = {} as Layout;
  data: any = {};
  renderers: any[] = [];
  
  // Form status
  formValid: boolean = false;
  errorMessage: string = '';
  formSubmitted: boolean = false;
  isSubmitting: boolean = false;
  previewMode: boolean = false;
  
  // Default examples to help users get started
  examples: Examples = {
    basic: {
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            title: 'Name',
            minLength: 3
          },
          email: {
            type: 'string',
            format: 'email',
            title: 'Email'
          },
          age: {
            type: 'integer',
            minimum: 0,
            maximum: 120,
            title: 'Age'
          },
          comment: {
            type: 'string',
            title: 'Comment'
          }
        },
        required: ['name', 'email']
      },
      uischema: {
        type: 'VerticalLayout',
        elements: [
          {
            type: 'Group',
            label: 'User Information',
            elements: [
              {
                type: 'HorizontalLayout',
                elements: [
                  {
                    type: 'Control',
                    scope: '#/properties/name'
                  },
                  {
                    type: 'Control',
                    scope: '#/properties/age'
                  }
                ]
              },
              {
                type: 'Control',
                scope: '#/properties/email'
              },
              {
                type: 'Control',
                scope: '#/properties/comment',
                options: {
                  multi: true
                }
              }
            ]
          }
        ]
      },
      data: {
        name: '',
        email: '',
        age: 30,
        comment: ''
      }
    }
  };
  
  constructor(private formsService: FormsService) {}

  ngOnInit(): void {
    this.resetToExample('basic');
    this.renderers = [...angularMaterialRenderers];
  }
  
  updateSchema(): void {
    try {
      this.schema = JSON.parse(this.schemaText);
      this.formValid = true;
      this.errorMessage = '';
    } catch (e) {
      this.formValid = false;
      this.errorMessage = 'Invalid JSON Schema: ' + (e as Error).message;
    }
  }
  
  updateUiSchema(): void {
    try {
      this.uischema = JSON.parse(this.uiSchemaText);
      this.formValid = true;
      this.errorMessage = '';
    } catch (e) {
      this.formValid = false;
      this.errorMessage = 'Invalid UI Schema: ' + (e as Error).message;
    }
  }
  
  resetToExample(example: string): void {
    if (this.examples[example]) {
      this.schemaText = JSON.stringify(this.examples[example].schema, null, 2);
      this.uiSchemaText = JSON.stringify(this.examples[example].uischema, null, 2);
      this.data = { ...this.examples[example].data };
      this.updateSchema();
      this.updateUiSchema();
    }
  }
  
  togglePreview(): void {
    this.previewMode = !this.previewMode;
    // When enabling preview, update schemas
    if (this.previewMode) {
      this.updateSchema();
      this.updateUiSchema();
    }
  }
  
  onFormChange(newData: any): void {
    this.data = newData;
  }
  
  submitForm(): void {
    this.formSubmitted = true;
    
    if (this.isValidForm()) {
      this.isSubmitting = true;
      
      this.formsService.submitForm(this.data).subscribe({
        next: () => {
          this.isSubmitting = false;
        },
        error: () => {
          this.isSubmitting = false;
        }
      });
    }
  }
  
  isValidForm(): boolean {
    return this.formValid && Object.keys(this.data).length > 0;
  }
}
