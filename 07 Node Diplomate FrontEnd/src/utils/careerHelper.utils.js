// Returns the ordinal suffix (st, nd, rd, th)
export const getOrdinalSuffix = (num) => {
    if (num % 10 === 1 && num % 100 !== 11) return "st";
    if (num % 10 === 2 && num % 100 !== 12) return "nd";
    if (num % 10 === 3 && num % 100 !== 13) return "rd";
    return "th";
  };
  
  // Adds a new year to a career
  export const addYearToCareer = (career) => {
    const currentCount = career.years.length; // Current number of years
    if (currentCount < 20) {
      const newYear = {
        id: Date.now(),
        name: `${currentCount + 1}${getOrdinalSuffix(currentCount + 1)} year`, // Dynamically generate the text
      };
      return { ...career, years: [...career.years, newYear] };
    } else {
      alert("You cannot add more than 20 years.");
      return career; // No changes if the limit is reached
    }
  };
  
  // Updates the name of a career
  export const updateCareerName = (career, newName) => ({
    ...career,
    name: newName,
  });
  
  // Removes a year from a career
  export const deleteYearFromCareer = (career, yearId) => ({
    ...career,
    years: career.years.filter((year) => year.id !== yearId),
  });
  