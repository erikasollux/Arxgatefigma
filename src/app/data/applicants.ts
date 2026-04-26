import { Applicant } from '../types/documents';

export const applicants: Applicant[] = [
  // Applicant 1 - Clean, should be approved
  {
    id: 1,
    person: {
      firstName: 'Ivan',
      lastName: 'Petrov',
      gender: 'M',
      dateOfBirth: '1985-03-15',
      nationality: 'Arstotzka',
      photo: '#4a90e2',
      hasIssues: false,
    },
    documents: [
      {
        type: 'passport',
        number: 'ARS-19850315',
        firstName: 'Ivan',
        lastName: 'Petrov',
        gender: 'M',
        dateOfBirth: '1985-03-15',
        nationality: 'Arstotzka',
        issueDate: '2020-01-10',
        expiryDate: '2030-01-10',
        photo: '#4a90e2',
      },
      {
        type: 'vaccination',
        number: 'VAX-001',
        firstName: 'Ivan',
        lastName: 'Petrov',
        vaccineType: 'COVID-19',
        dateAdministered: '2024-06-01',
        expiryDate: '2026-06-01',
      },
    ],
  },

  // Applicant 2 - Expired passport (should be denied)
  {
    id: 2,
    person: {
      firstName: 'Maria',
      lastName: 'Sokolov',
      gender: 'F',
      dateOfBirth: '1990-07-22',
      nationality: 'Kolechia',
      photo: '#e24a90',
      hasIssues: true,
      issues: ['Passport expired'],
    },
    documents: [
      {
        type: 'passport',
        number: 'KOL-19900722',
        firstName: 'Maria',
        lastName: 'Sokolov',
        gender: 'F',
        dateOfBirth: '1990-07-22',
        nationality: 'Kolechia',
        issueDate: '2015-03-20',
        expiryDate: '2025-03-20', // Expired!
        photo: '#e24a90',
      },
    ],
  },

  // Applicant 3 - Name mismatch (should be denied)
  {
    id: 3,
    person: {
      firstName: 'Viktor',
      lastName: 'Korovin',
      gender: 'M',
      dateOfBirth: '1962-04-12',
      nationality: 'USSR',
      photo: '#90e24a',
      hasIssues: true,
      issues: ['Name mismatch between passport and work pass'],
    },
    documents: [
      {
        type: 'passport',
        number: 'USSR-19620412',
        firstName: 'Viktor',
        lastName: 'Korovin',
        gender: 'M',
        dateOfBirth: '1962-04-12',
        nationality: 'USSR',
        issueDate: '2018-05-01',
        expiryDate: '2028-05-01',
        photo: '#90e24a',
      },
      {
        type: 'workPass',
        number: 'WP-042',
        firstName: 'Victor', // Misspelled!
        lastName: 'Korovin',
        employer: 'Chronos Directorate',
        occupation: 'System Architect',
        issueDate: '2020-01-01',
        expiryDate: '2026-01-01',
      },
    ],
  },

  // Applicant 4 - Clean with work pass
  {
    id: 4,
    person: {
      firstName: 'Elena',
      lastName: 'Volkov',
      gender: 'F',
      dateOfBirth: '1995-11-08',
      nationality: 'Republia',
      photo: '#e2904a',
      hasIssues: false,
    },
    documents: [
      {
        type: 'identityCard',
        number: 'REP-ID-1995',
        firstName: 'Elena',
        lastName: 'Volkov',
        gender: 'F',
        dateOfBirth: '1995-11-08',
        nationality: 'Republia',
        issueDate: '2022-01-15',
        expiryDate: '2027-01-15',
        photo: '#e2904a',
      },
      {
        type: 'workPass',
        number: 'WP-095',
        firstName: 'Elena',
        lastName: 'Volkov',
        employer: 'ARX GATE Maintenance',
        occupation: 'Software Engineer',
        issueDate: '2023-06-01',
        expiryDate: '2026-06-01',
      },
    ],
  },

  // Applicant 5 - Missing vaccination (should be denied based on rules)
  {
    id: 5,
    person: {
      firstName: 'Dmitri',
      lastName: 'Retrograde',
      gender: 'M',
      dateOfBirth: '1988-12-25',
      nationality: 'Antegria',
      photo: '#4ae290',
      hasIssues: true,
      issues: ['Missing required vaccination certificate'],
    },
    documents: [
      {
        type: 'passport',
        number: 'ANT-19881225',
        firstName: 'Dmitri',
        lastName: 'Retrograde',
        gender: 'M',
        dateOfBirth: '1988-12-25',
        nationality: 'Antegria',
        issueDate: '2021-12-25',
        expiryDate: '2031-12-25',
        photo: '#4ae290',
      },
      // No vaccination certificate!
    ],
  },
];
