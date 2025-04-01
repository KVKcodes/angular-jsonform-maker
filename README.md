# JSON Form Maker

A dynamic form generation application built with Angular 15 and JSON Forms, featuring responsive design and custom renderers.

## Features

- Dynamic form generation from JSON schemas
- Two form layouts: Personal Information and Product Information
- Custom renderers for enhanced UI components
- Real-time validation and interactive elements
- Responsive design for mobile and desktop
- Tailwind CSS styling

## Prerequisites

- Node.js (v18 or higher recommended)
- Angular CLI 15.x
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd json-form-maker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── forms/
│   │   ├── form-container/       # Main container component
│   │   ├── form-layout-one/      # Personal Information form
│   │   ├── form-layout-two/      # Product Information form
│   │   └── services/            # Form submission service
│   ├── shared/
│   │   └── renderers/           # Custom form renderers
│   └── app.module.ts
└── styles.css                   # Global Tailwind CSS styles
```

## JSON Schema Structure

### Personal Information Form

```json
{
  "type": "object",
  "properties": {
    "firstName": { "type": "string", "minLength": 2 },
    "lastName": { "type": "string", "minLength": 2 },
    "email": { "type": "string", "format": "email" },
    "age": { 
      "type": "integer",
      "minimum": 18,
      "maximum": 120
    },
    "address": {
      "type": "object",
      "properties": {
        "street": { "type": "string" },
        "city": { "type": "string" },
        "zipCode": { "type": "string", "pattern": "^\\d{5}(-\\d{4})?$" }
      }
    }
  },
  "required": ["firstName", "lastName", "email", "age"]
}
```

### Product Information Form

```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string", "minLength": 3 },
    "description": { "type": "string" },
    "category": { 
      "type": "string",
      "enum": ["Electronics", "Clothing", "Books", "Other"]
    },
    "inStock": { "type": "boolean" },
    "price": { "type": "number", "minimum": 0 },
    "discount": { 
      "type": "integer",
      "minimum": 0,
      "maximum": 100
    },
    "taxRate": {
      "type": "number",
      "minimum": 0,
      "maximum": 100
    }
  },
  "required": ["name", "price"]
}
```

## Custom Renderers

The application includes custom renderers for:
- Age input with slider
- Price calculation with dynamic updates
- Form submission states with loading indicators

## Form Validation

- Client-side validation based on JSON schema
- Custom validation for:
  - Email format
  - ZIP code pattern
  - Age constraints
  - Price calculations

## Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Flexible layouts using Tailwind CSS
- Adaptive form controls
- Touch-friendly inputs

## Assumptions

1. Form submissions are simulated with a delay to demonstrate loading states
2. Product pricing calculations are done client-side
3. Form data is not persisted between sessions
4. Basic browser form validation is enhanced with custom validators

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
