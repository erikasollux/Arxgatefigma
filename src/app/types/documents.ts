export interface Person {
  firstName: string;
  lastName: string;
  gender: 'M' | 'F';
  dateOfBirth: string;
  nationality: string;
  photo: string; // Color code for simple representation
  hasIssues: boolean; // Whether this person should be denied
  issues?: string[]; // List of discrepancies
}

export interface Passport {
  type: 'passport';
  number: string;
  firstName: string;
  lastName: string;
  gender: 'M' | 'F';
  dateOfBirth: string;
  nationality: string;
  issueDate: string;
  expiryDate: string;
  photo: string;
}

export interface IdentityCard {
  type: 'identityCard';
  number: string;
  firstName: string;
  lastName: string;
  gender: 'M' | 'F';
  dateOfBirth: string;
  nationality: string;
  issueDate: string;
  expiryDate: string;
  photo: string;
}

export interface Visa {
  type: 'visa';
  number: string;
  firstName: string;
  lastName: string;
  purpose: string;
  issueDate: string;
  expiryDate: string;
  duration: string;
}

export interface WorkPass {
  type: 'workPass';
  number: string;
  firstName: string;
  lastName: string;
  employer: string;
  occupation: string;
  issueDate: string;
  expiryDate: string;
}

export interface VaccinationCertificate {
  type: 'vaccination';
  number: string;
  firstName: string;
  lastName: string;
  vaccineType: string;
  dateAdministered: string;
  expiryDate: string;
}

export type Document = Passport | IdentityCard | Visa | WorkPass | VaccinationCertificate;

export interface Applicant {
  person: Person;
  documents: Document[];
  id: number;
}

// Helper to check if a date is expired
export function isExpired(expiryDate: string): boolean {
  const today = new Date('2025-12-20'); // Current game date
  const expiry = new Date(expiryDate);
  return expiry < today;
}

// Helper to check if names match
export function namesMatch(name1: string, name2: string): boolean {
  return name1.toLowerCase() === name2.toLowerCase();
}
