//^ ----> Returns the ordinal suffix (st, nd, rd, th)
export const getOrdinalSuffix = (num) => {
  if (num % 10 === 1 && num % 100 !== 11) return "st";
  if (num % 10 === 2 && num % 100 !== 12) return "nd";
  if (num % 10 === 3 && num % 100 !== 13) return "rd";
  return "th";
};

//^ ---->  Adds a new year to a career
export const addYearToCareer = (career) => {
  const currentYears = career.years;

  //^ ----> If the career has more than 20 years, return the career without changes
  if (currentYears.length >= 20) {
    alert("You cannot add more than 20 years.");
    return career;
  }

  //^ ----> Create a set with the numbers of the current years
  const existingNumbers = new Set(currentYears.map((year) => parseInt(year.number, 10)));

  //^ ----> Search for the next available year number
  let newYearNumber = 1;
  while (existingNumbers.has(newYearNumber)) {
    newYearNumber++;
  }

  //^ ----> Create the new year
  const newYear = {
    id: newYearNumber,
    name: `${newYearNumber}${getOrdinalSuffix(newYearNumber)} year`,
    number: String(newYearNumber),
  };

  return { ...career, years: [...currentYears, newYear] };
};

//^ ----> Updates the name of a career
export const updateCareerName = (career, newName) => ({
  ...career,
  name: newName,
});

// Removes a year from a career
export const deleteYearFromCareer = (career, yearNumber) => ({
  ...career,
  years: career.years.filter((year) => year.number !== yearNumber),
});

// Get the number of the next year
export const getNextYear = (career) => {
  const currentYears = career.years;

  // Cretae a set with the numbers of the current years
  const existingNumbers = new Set(
    currentYears.map((year) => parseInt(year.number, 10)) // Convertir `number` a entero
  );

  // Search for the next available year number
  let nextYearNumber = 1;
  while (existingNumbers.has(nextYearNumber)) {
    nextYearNumber++;
  }

  // If the next year number is greater than 20, return `null`
  if (nextYearNumber > 20) {
    return null; 
  }

  return nextYearNumber;
};
