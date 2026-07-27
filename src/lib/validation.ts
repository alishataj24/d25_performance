/** Phone-number validation shared across all lead-capture forms. */

/** Strip everything except digits. */
export function digitsOnly(raw: string): string {
  return raw.replace(/\D/g, "");
}

/**
 * Validate an Indian mobile number. Accepts an optional +91 / 91 / 0 prefix
 * and requires a 10-digit number starting 6–9.
 */
export function isValidIndianMobile(raw: string): boolean {
  let d = digitsOnly(raw);
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d);
}

export const PHONE_ERROR = "Please enter a valid 10-digit mobile number.";
