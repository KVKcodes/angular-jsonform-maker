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
  selector: 'app-form-layout-two',
  templateUrl: './form-layout-two.component.html',
  styleUrls: ['./form-layout-two.component.css']
})
export class FormLayoutTwoComponent implements OnInit {
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
        name: {
          type: 'string',
          minLength: 3,
          title: 'Product Name',
          description: 'Enter the product name'
        },
        description: {
          type: 'string',
          title: 'Description',
          description: 'Product description'
        },
        category: {
          type: 'string',
          enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Other'],
          default: 'Electronics',
          title: 'Category'
        },
        inStock: {
          type: 'boolean',
          title: 'In Stock',
          default: true
        },
        price: {
          type: 'number',
          minimum: 0,
          title: 'Price (USD)',
          description: 'Product base price'
        },
        discount: {
          type: 'integer',
          minimum: 0,
          maximum: 100,
          default: 0,
          title: 'Discount (%)',
          description: 'Discount percentage'
        },
        taxRate: {
          type: 'number',
          enum: [0, 5, 10, 15, 20],
          default: 10,
          title: 'Tax Rate (%)'
        }
      },
      required: ['name', 'price']
    };

    // Define the UI schema (layout)
    this.uischema = {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Group',
          label: 'Product Details',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/name'
            } as ControlElement,
            {
              type: 'Control',
              scope: '#/properties/description',
              options: {
                multi: true
              }
            } as ControlElement,
            {
              type: 'Control',
              scope: '#/properties/category'
            } as ControlElement,
            {
              type: 'Control',
              scope: '#/properties/inStock'
            } as ControlElement
          ]
        } as CustomLayout,
        {
          type: 'Group',
          label: 'Pricing Information',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/price'
            } as ControlElement,
            {
              type: 'Control',
              scope: '#/properties/discount'
            } as ControlElement,
            {
              type: 'Control',
              scope: '#/properties/taxRate'
            } as ControlElement
          ]
        } as CustomLayout
      ]
    };

    // Initial data
    this.data = {
      name: '',
      description: '',
      category: 'Electronics',
      inStock: true,
      price: 0,
      discount: 0,
      taxRate: 10
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

  calculateFinalPrice(): number {
    if (!this.data.price) return 0;
    
    const basePrice = this.data.price;
    const discount = this.data.discount || 0;
    const taxRate = this.data.taxRate || 0;
    
    const discountedPrice = basePrice * (1 - discount / 100);
    const finalPrice = discountedPrice * (1 + taxRate / 100);
    
    return Math.round(finalPrice * 100) / 100;
  }
}
