import { faker } from '@faker-js/faker';

export function generateRandomPersonalDetails(): {
  middleName: string;
  gender: '1' | '2';
  maritalStatus: string;
  nationality: string;
} {
  const genders: Array<'1' | '2'> = ['1', '2']; // literal types
  const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
  const nationalities = ['American', 'British', 'Canadian', 'Indian', 'German', 'French'];

  return {
    middleName: faker.person.middleName(),
    gender: genders[Math.floor(Math.random() * genders.length)],
    maritalStatus: maritalStatuses[Math.floor(Math.random() * maritalStatuses.length)],
    nationality: nationalities[Math.floor(Math.random() * nationalities.length)],
  };
}
