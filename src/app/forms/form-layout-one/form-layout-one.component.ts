import { Component, OnInit } from '@angular/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { JsonSchema, Layout, UISchemaElement, createAjv } from '@jsonforms/core';
import { FormsService } from '../forms.service';

interface CustomLayout extends UISchemaElement {
  type: string;
  label?: string;
  elements: UISchemaElement[];
}

interface ControlElement extends UISchemaElement {
  type: 'Control';
  scope: string;
  options?: {
    multi?: boolean;
  };
}

@Component({
  selector: 'app-form-layout-one',
  templateUrl: './form-layout-one.component.html',
  styleUrls: ['./form-layout-one.component.css']
})
export class FormLayoutOneComponent implements OnInit {
  schema: JsonSchema = {} as JsonSchema;
  uischema: Layout = {} as Layout;
  data: any = {};
  renderers: any[] = [];
  
  // Form state
  formSubmitted = false;
  isFormValid = false;
  isSubmitting = false;
  
  // Store initial data for reset functionality
  private initialData: any = {};
  
  // Validation
  private ajv = createAjv({useDefaults: true});
  
  constructor(private formsService: FormsService) { 
    this.initForm();
  }

  ngOnInit(): void {
    // Register renderers
    this.renderers = [
      ...angularMaterialRenderers
    ];
    
    // Keep a copy of the initial data for reset functionality
    this.initialData = JSON.parse(JSON.stringify(this.data));
  }

  initForm(): void {
    // Define the JSON schema (data model)
    this.schema = {
      type: 'object',
      properties: {
        personalInfo: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              minLength: 2,
              title: 'First Name',
              description: 'Your first name'
            },
            lastName: {
              type: 'string',
              minLength: 2,
              title: 'Last Name',
              description: 'Your last name'
            },
            email: {
              type: 'string',
              format: 'email',
              title: 'Email',
              description: 'Your email address'
            },
            age: {
              type: 'integer',
              title: 'Age',
              description: 'Your age (18-120)',
              minimum: 18,
              maximum: 120,
              default: 25
            }
          },
          required: ['firstName', 'lastName', 'email']
        },
        address: {
          type: 'object',
          properties: {
            street: {
              type: 'string',
              title: 'Street Address'
            },
            city: {
              type: 'string',
              title: 'City'
            },
            state: {
              type: 'string',
              title: 'State',
              enum: ['CA', 'NY', 'TX', 'FL', 'IL']
            },
            zipCode: {
              type: 'string',
              title: 'ZIP Code',
              pattern: '^[0-9]{5}$'
            }
          }
        }
      }
    };

    // Define the UI schema (layout)
    this.uischema = {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Group',
          label: 'Personal Information',
          elements: [
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/personalInfo/properties/firstName'
                } as ControlElement,
                {
                  type: 'Control',
                  scope: '#/properties/personalInfo/properties/lastName'
                } as ControlElement
              ]
            },
            {
              type: 'Control',
              scope: '#/properties/personalInfo/properties/email'
            } as ControlElement,
            {
              type: 'Control',
              scope: '#/properties/personalInfo/properties/age'
            } as ControlElement
          ]
        } as CustomLayout,
        {
          type: 'Group',
          label: 'Address',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/address/properties/street'
            } as ControlElement,
            {
              type: 'HorizontalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/city'
                } as ControlElement,
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/state'
                } as ControlElement,
                {
                  type: 'Control',
                  scope: '#/properties/address/properties/zipCode'
                } as ControlElement
              ]
            }
          ]
        } as CustomLayout
      ]
    };

    // Initial data
    this.data = {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        age: 25
      },
      address: {
        street: '',
        city: '',
        state: 'CA',
        zipCode: ''
      }
    };
  }

  onFormChange(event: any): void {
    this.data = event;
    // Reset form submitted state when user makes changes
    if (this.formSubmitted) {
      this.formSubmitted = false;
    }
  }
  
  validateForm(): boolean {
    // Validate against the schema
    const validate = this.ajv.compile(this.schema);
    return validate(this.data);
  }

  submitForm(): void {
    this.isFormValid = this.validateForm();
    this.formSubmitted = true;
    
    if (this.isFormValid) {
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

  resetForm(): void {
    this.data = JSON.parse(JSON.stringify(this.initialData));
    this.formSubmitted = false;
    this.isFormValid = false;
  }
}
