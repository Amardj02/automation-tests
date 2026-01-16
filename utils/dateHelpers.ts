import { faker } from '@faker-js/faker';

function formatDateToYYYYDDMM(date: Date) {
  const yyyy = date.getFullYear();
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${yyyy}-${dd}-${mm}`;
}

export function generateLeaveDates() {
  const MAX_DATE = new Date('2026-12-31');
  const MAX_DURATION = 7;

  const latestStartDate = new Date(MAX_DATE);
  latestStartDate.setDate(latestStartDate.getDate() - MAX_DURATION);

  const startDateObj = faker.date.between({ from: new Date(), to: latestStartDate });

  const durationDays = faker.number.int({ min: 1, max: MAX_DURATION });

  const endDateObj = new Date(startDateObj.getTime());
  endDateObj.setDate(endDateObj.getDate() + durationDays);

  const startDate = formatDateToYYYYDDMM(startDateObj);
  const endDate = formatDateToYYYYDDMM(endDateObj);

  return { startDate, endDate };
}
