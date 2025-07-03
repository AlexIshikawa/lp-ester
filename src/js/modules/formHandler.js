// =============================================
// FORM HANDLER MODULE
// =============================================

export class FormHandler {
  constructor() {
    this.forms = document.querySelectorAll("form");
    this.init();
  }

  init() {
    if (!this.forms.length) return;

    this.bindEvents();
    console.log("📋 Form handler module initialized");
  }

  bindEvents() {
    this.forms.forEach((form) => {
      form.addEventListener("submit", (e) => this.handleSubmit(e));

      // Real-time validation
      const inputs = form.querySelectorAll("input, textarea");
      inputs.forEach((input) => {
        input.addEventListener("blur", () => this.validateField(input));
        input.addEventListener("input", () => this.clearError(input));
      });
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate form
    if (!this.validateForm(form)) {
      return;
    }

    // Get submit button
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    try {
      // Show loading state
      this.setLoadingState(submitButton, true);

      // Simulate API call (replace with actual endpoint)
      await this.submitForm(data);

      // Show success message
      this.showSuccess(form, "Obrigado! Entraremos em contato em breve.");

      // Reset form
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      this.showError(form, "Ocorreu um erro. Tente novamente.");
    } finally {
      // Reset button state
      this.setLoadingState(submitButton, false, originalText);
    }
  }

  validateForm(form) {
    const inputs = form.querySelectorAll("input[required], textarea[required]");
    let isValid = true;

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(input) {
    const value = input.value.trim();
    const type = input.type;
    const isRequired = input.hasAttribute("required");

    // Clear previous errors
    this.clearError(input);

    // Required validation
    if (isRequired && !value) {
      this.setError(input, "Este campo é obrigatório");
      return false;
    }

    // Skip other validations if field is empty and not required
    if (!value && !isRequired) {
      return true;
    }

    // Email validation
    if (type === "email" && !this.isValidEmail(value)) {
      this.setError(input, "Digite um email válido");
      return false;
    }

    // Phone validation
    if (type === "tel" && !this.isValidPhone(value)) {
      this.setError(input, "Digite um telefone válido");
      return false;
    }

    // Minimum length validation
    const minLength = input.getAttribute("minlength");
    if (minLength && value.length < parseInt(minLength)) {
      this.setError(input, `Mínimo de ${minLength} caracteres`);
      return false;
    }

    return true;
  }

  setError(input, message) {
    input.classList.add("error");
    input.setAttribute("aria-invalid", "true");

    const errorElement = this.getErrorElement(input);
    errorElement.textContent = message;
    errorElement.classList.add("show");

    // Focus on first error
    if (!document.querySelector(".error:focus")) {
      input.focus();
    }
  }

  clearError(input) {
    input.classList.remove("error");
    input.removeAttribute("aria-invalid");

    const errorElement = this.getErrorElement(input);
    errorElement.textContent = "";
    errorElement.classList.remove("show");
  }

  getErrorElement(input) {
    const inputGroup = input.closest(".input-group");
    if (inputGroup) {
      return (
        inputGroup.querySelector(".input-group__error") ||
        this.createErrorElement(inputGroup)
      );
    }

    // Fallback: create error element after input
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains("field-error")) {
      errorElement = this.createErrorElement(input.parentNode);
    }

    return errorElement;
  }

  createErrorElement(parent) {
    const errorElement = document.createElement("div");
    errorElement.className = "field-error";
    errorElement.setAttribute("role", "alert");
    errorElement.setAttribute("aria-live", "polite");
    parent.appendChild(errorElement);
    return errorElement;
  }

  setLoadingState(button, isLoading, originalText = "Enviando...") {
    if (isLoading) {
      button.disabled = true;
      button.textContent = "Enviando...";
      button.classList.add("loading");
    } else {
      button.disabled = false;
      button.textContent = originalText;
      button.classList.remove("loading");
    }
  }

  showSuccess(form, message) {
    const successElement = this.createNotification(message, "success");
    form.parentNode.insertBefore(successElement, form.nextSibling);

    // Remove after 5 seconds
    setTimeout(() => {
      successElement.remove();
    }, 5000);
  }

  showError(form, message) {
    const errorElement = this.createNotification(message, "error");
    form.parentNode.insertBefore(errorElement, form);

    // Remove after 5 seconds
    setTimeout(() => {
      errorElement.remove();
    }, 5000);
  }

  createNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.setAttribute("role", "alert");
    notification.setAttribute("aria-live", "polite");

    // Add styles
    notification.style.cssText = `
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 0.5rem;
      font-weight: 500;
      animation: slideIn 0.3s ease-out;
      ${
        type === "success"
          ? "background-color: #10b981; color: white;"
          : "background-color: #ef4444; color: white;"
      }
    `;

    return notification;
  }

  async submitForm(data) {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success/failure
        if (Math.random() > 0.1) {
          resolve({ success: true, data });
        } else {
          reject(new Error("Simulation error"));
        }
      }, 1500);
    });
  }

  // Validation helpers
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    return phoneRegex.test(phone);
  }

  // Public method to validate a specific form
  validate(formSelector) {
    const form = document.querySelector(formSelector);
    if (form) {
      return this.validateForm(form);
    }
    return false;
  }
}

// Add CSS for animations
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .input-group__input.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 1px #ef4444;
  }
  
  .field-error {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: none;
  }
  
  .field-error.show {
    display: block;
  }
  
  .loading {
    position: relative;
    pointer-events: none;
  }
  
  .loading::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    top: 50%;
    left: 50%;
    margin-left: -8px;
    margin-top: -8px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

document.head.appendChild(style);
