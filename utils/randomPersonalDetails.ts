import { faker } from '@faker-js/faker';

export function generateRandomPersonalDetails(): {
  middleName: string;
  gender: '1' | '2';
  maritalStatus: string;
  nationality: string;
} {
  const genders: Array<'1' | '2'> = ['1', '2']; 
  const maritalStatuses = ['Single', 'Married','Other'];
  const nationalities = ['American', 'British', 'Canadian', 'Indian', 'German', 'French'];

  return {
    middleName: faker.person.middleName(),
    gender: genders[Math.floor(Math.random() * genders.length)],
    maritalStatus: maritalStatuses[Math.floor(Math.random() * maritalStatuses.length)],
    nationality: nationalities[Math.floor(Math.random() * nationalities.length)],
  };
}
export function generateWorkExperience() {
  return {
    company: faker.company.name(),
    jobTitle: faker.person.jobTitle(),
  };
}

export function generateEducationLevel(): { educationLevel: string } {
  const educationLevels = [
    "Bachelor's Degree",
    "Master's Degree",
    "High School Diploma",
    "College Undergraduate",
  ];

  return {
    educationLevel: educationLevels[Math.floor(Math.random() * educationLevels.length)],
  };
}