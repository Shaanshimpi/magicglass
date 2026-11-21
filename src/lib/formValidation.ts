/**
 * Shared Form Validation Utilities
 * Used for client-side and server-side validation across Magic Glass forms
 */

export interface ValidationResult {
  isValid: boolean
  error?: string
  cleanValue?: string
}

/**
 * Validates email address format
 */
export function validateEmail(email: string): ValidationResult {
  const trimmed = (email || '').trim()

  if (!trimmed) {
    return { isValid: false, error: 'Email address is required.' }
  }

  // Check for spaces
  if (/\s/.test(trimmed)) {
    return { isValid: false, error: 'Email address cannot contain spaces.' }
  }

  // Standard RFC 5322 compatible regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

  if (!emailRegex.test(trimmed)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address (e.g. name@company.com).',
    }
  }

  // Ensure TLD has at least 2 alpha characters
  const parts = trimmed.split('@')
  if (parts.length !== 2) {
    return { isValid: false, error: 'Please enter a valid email address.' }
  }

  const domain = parts[1]
  const lastDotIndex = domain.lastIndexOf('.')
  if (lastDotIndex === -1 || domain.slice(lastDotIndex + 1).length < 2) {
    return {
      isValid: false,
      error: 'Email domain must include a valid extension (e.g. .com, .in).',
    }
  }

  return { isValid: true, cleanValue: trimmed.toLowerCase() }
}

/**
 * Normalizes a phone number to extract its core 10 digits
 * Handles +91, 91 (when 12 digits), and 0 (when 11 digits)
 */
export function cleanPhoneNumber(phone: string): string {
  if (!phone) return ''
  // Strip all non-digit characters
  let digits = phone.replace(/\D/g, '')

  // If 12 digits starting with 91 (India country code), strip 91
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2)
  }

  // If 11 digits starting with 0 (national trunk prefix), strip 0
  if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1)
  }

  return digits
}

/**
 * Restricts input value as the user types
 * Allows digits, spaces, +, -, (, )
 */
export function formatPhoneInput(value: string): string {
  if (!value) return ''
  // Strip characters that cannot be part of a phone number
  const sanitized = value.replace(/[^0-9+\s\-()]/g, '')
  // Limit length to 17 characters (e.g. "+91 98765 43210")
  return sanitized.slice(0, 17)
}

/**
 * Validates a 10-digit mobile number
 */
export function validatePhone(phone: string, required: boolean = true): ValidationResult {
  const trimmed = (phone || '').trim()

  if (!trimmed) {
    if (required) {
      return { isValid: false, error: 'Phone number is required (10 digits).' }
    }
    return { isValid: true, cleanValue: '' }
  }

  // Check for alphabetic or disallowed characters
  if (/[a-zA-Z]/.test(trimmed)) {
    return {
      isValid: false,
      error: 'Phone number must only contain digits and symbols like +, -, ().',
    }
  }

  const clean = cleanPhoneNumber(trimmed)

  if (clean.length < 10) {
    return {
      isValid: false,
      error: `Phone number is too short (${clean.length}/10 digits). Please enter 10 digits.`,
    }
  }

  if (clean.length > 10) {
    return {
      isValid: false,
      error: `Phone number is too long (${clean.length} digits). Please enter a 10-digit number.`,
    }
  }

  // Indian mobile numbering plan: numbers start with 6, 7, 8, or 9
  if (!/^[6-9]/.test(clean)) {
    return {
      isValid: false,
      error: 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.',
    }
  }

  return { isValid: true, cleanValue: clean }
}

/**
 * Validates full name
 */
export function validateFullName(name: string): ValidationResult {
  const trimmed = (name || '').trim()

  if (!trimmed) {
    return { isValid: false, error: 'Full name is required.' }
  }

  if (trimmed.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long.' }
  }

  // Must contain at least one letter and not purely digits/special symbols
  if (!/[a-zA-Z]/.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid name with letters.' }
  }

  return { isValid: true, cleanValue: trimmed }
}

/**
 * Validates message / requirements text
 */
export function validateMessage(
  message: string,
  required: boolean = false,
  minLength: number = 10
): ValidationResult {
  const trimmed = (message || '').trim()

  if (!trimmed) {
    if (required) {
      return { isValid: false, error: 'Message / project requirements are required.' }
    }
    return { isValid: true, cleanValue: '' }
  }

  if (required && trimmed.length < minLength) {
    return {
      isValid: false,
      error: `Message must be at least ${minLength} characters (currently ${trimmed.length}).`,
    }
  }

  return { isValid: true, cleanValue: trimmed }
}

/**
 * Validates Quote Drawer form fields
 */
export function validateQuoteForm(data: {
  fullName: string
  email: string
  phone: string
  glassTypes?: string[]
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

  const nameVal = validateFullName(data.fullName)
  if (!nameVal.isValid && nameVal.error) {
    errors.fullName = nameVal.error
  }

  const emailVal = validateEmail(data.email)
  if (!emailVal.isValid && emailVal.error) {
    errors.email = emailVal.error
  }

  const phoneVal = validatePhone(data.phone, true)
  if (!phoneVal.isValid && phoneVal.error) {
    errors.phone = phoneVal.error
  }

  if (data.glassTypes && data.glassTypes.length === 0) {
    errors.glassTypes = 'Please select at least one glass specification.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Validates Contact Us form fields
 */
export function validateContactForm(data: {
  fullName: string
  email: string
  phone: string
  message: string
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

  const nameVal = validateFullName(data.fullName)
  if (!nameVal.isValid && nameVal.error) {
    errors.fullName = nameVal.error
  }

  const emailVal = validateEmail(data.email)
  if (!emailVal.isValid && emailVal.error) {
    errors.email = emailVal.error
  }

  const phoneVal = validatePhone(data.phone, true)
  if (!phoneVal.isValid && phoneVal.error) {
    errors.phone = phoneVal.error
  }

  const msgVal = validateMessage(data.message, true, 10)
  if (!msgVal.isValid && msgVal.error) {
    errors.message = msgVal.error
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
