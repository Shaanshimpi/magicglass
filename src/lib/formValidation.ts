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
 * Normalizes phone number digits
 * Strips non-digits, leading country code +91 or 91 when length is 12, or trunk 0 when length is 11
 */
export function cleanPhoneNumber(phone: string): string {
  if (!phone) return ''
  // Strip all non-digit characters
  let digits = phone.replace(/\D/g, '')

  // If 12 digits starting with 91 (India country code), strip 91 for Indian domestic handling
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2)
  }

  // If 11 digits starting with 0 (national trunk prefix in India), strip 0
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
  // Allow up to 20 characters for international formats e.g. "+971 50 123 4567"
  return sanitized.slice(0, 20)
}

/**
 * Validates a mobile, landline, or international phone number
 * Supports:
 * - Indian Mobile (10 digits starting with 6, 7, 8, or 9)
 * - Indian Landlines (STD code + local number, total 10 digits starting with 2-8)
 * - International formats (7 to 15 digits according to ITU-T E.164 standard)
 */
export function validatePhone(phone: string, required: boolean = true): ValidationResult {
  const trimmed = (phone || '').trim()

  if (!trimmed) {
    if (required) {
      return { isValid: false, error: 'Phone number is required.' }
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

  const allDigits = trimmed.replace(/\D/g, '')

  if (allDigits.length < 7) {
    return {
      isValid: false,
      error: `Phone number is too short (${allDigits.length} digits). Please enter at least 7 to 10 digits.`,
    }
  }

  if (allDigits.length > 15) {
    return {
      isValid: false,
      error: `Phone number is too long (${allDigits.length} digits). Maximum 15 digits allowed.`,
    }
  }

  const isInternationalPrefix = trimmed.startsWith('+') || (trimmed.startsWith('00') && allDigits.length > 10)
  const clean = cleanPhoneNumber(trimmed)

  // 1. If user entered a 10-digit number (standard Indian mobile or landline)
  if (clean.length === 10) {
    // Valid Indian phone numbers start with 2 through 9 (6-9 for mobile, 2-5 for landlines)
    if (!/^[2-9]/.test(clean)) {
      return {
        isValid: false,
        error: 'Please enter a valid phone number starting with digits 2–9.',
      }
    }
    return { isValid: true, cleanValue: clean }
  }

  // 2. If it's an international number with '+' prefix or between 7 and 15 digits
  if (isInternationalPrefix || (allDigits.length >= 7 && allDigits.length <= 15)) {
    const formattedInternational = trimmed.startsWith('+') ? `+${allDigits}` : allDigits
    return { isValid: true, cleanValue: formattedInternational }
  }

  return {
    isValid: false,
    error: 'Please enter a valid 10-digit phone number or international number with country code.',
  }
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
