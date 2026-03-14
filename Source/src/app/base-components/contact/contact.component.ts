import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  isSubmitting = false;
  submitButtonText = 'Send Message';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitButtonText = 'Sending...';

      // Simulate form submission (replace with actual service call)
      setTimeout(() => {
        console.log('Form submitted:', this.contactForm.value);
        this.isSubmitting = false;
        this.submitButtonText = 'Message Sent!';
        this.contactForm.reset();

        // Reset button text after 3 seconds
        setTimeout(() => {
          this.submitButtonText = 'Send Message';
        }, 3000);
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  // Helper method to check if a field has errors
  hasError(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  // Helper method to get error message
  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (field?.hasError('minlength')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors?.['minlength']?.requiredLength} characters`;
    }
    return '';
  }

  sendEmail(): void {
    window.location.href = 'mailto:evangoldman10@gmail.com?subject=Hiring Inquiry - Robotics Engineer Position';
  }

  scheduleCall(): void {
    // Open Calendly or similar scheduling tool
    window.open('https://calendly.com/evan-goldman/hiring-call', '_blank');
  }

  viewResume(): void {
    // Trigger download or open resume
    const link = document.createElement('a');
    link.href = '/assets/resume-evan-goldman.pdf';
    link.download = 'Evan_Goldman_Resume.pdf';
    link.click();
  }
}
