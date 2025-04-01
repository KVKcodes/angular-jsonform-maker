import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface FormSubmissionResponse {
  success: boolean;
  message: string;
  data?: any;
  errors?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor() { }

  /**
   * Simulate a personal information form submission to a server
   * In a real application, this would make an HTTP request
   */
  submitPersonalForm(formData: any): Observable<FormSubmissionResponse> {
    // Add validation here if needed
    const isValid = this.validatePersonalForm(formData);
    
    if (isValid) {
      // Simulate a successful server response
      return of({
        success: true,
        message: 'Personal information form submitted successfully',
        data: formData
      }).pipe(delay(800)); // Add a delay to simulate network latency
    } else {
      // Simulate an error response
      return of({
        success: false,
        message: 'Form validation failed',
        errors: ['Please complete all required fields.']
      }).pipe(delay(800));
    }
  }

  /**
   * Simulate a product form submission to a server
   * In a real application, this would make an HTTP request
   */
  submitProductForm(formData: any): Observable<FormSubmissionResponse> {
    // Add validation here if needed
    const isValid = this.validateProductForm(formData);
    
    if (isValid) {
      // Calculate the final price and add it to the response
      const { price, discount, taxRate } = formData.pricing;
      const discountAmount = price * (discount / 100);
      const priceAfterDiscount = price - discountAmount;
      const taxAmount = priceAfterDiscount * (taxRate / 100);
      const finalPrice = priceAfterDiscount + taxAmount;
      
      // Simulate a successful server response
      return of({
        success: true,
        message: 'Product form submitted successfully',
        data: {
          ...formData,
          pricing: {
            ...formData.pricing,
            finalPrice
          }
        }
      }).pipe(delay(800)); // Add a delay to simulate network latency
    } else {
      // Simulate an error response
      return of({
        success: false,
        message: 'Form validation failed',
        errors: ['Please enter valid product information and pricing.']
      }).pipe(delay(800));
    }
  }

  /**
   * Validate personal form data
   */
  private validatePersonalForm(formData: any): boolean {
    if (!formData || !formData.personalInfo) return false;
    
    const { firstName, lastName, email } = formData.personalInfo;
    if (!firstName || !lastName || !email) return false;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    
    return true;
  }

  /**
   * Validate product form data
   */
  private validateProductForm(formData: any): boolean {
    if (!formData || !formData.productInfo || !formData.pricing) return false;
    
    const { name } = formData.productInfo;
    const { price } = formData.pricing;
    
    if (!name || !price || price <= 0) return false;
    
    return true;
  }

  submitForm(data: any): Observable<any> {
    // Simulate API call with 1 second delay
    return of({ success: true, data }).pipe(
      delay(1000)
    );
  }
} 