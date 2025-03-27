/**
 * Utility function to check if a number is a multiple of a million.
 * @param {number} num - The number to check.
 * @returns {boolean} - True if the number is a multiple of a million, false otherwise.
 */
export const isMultipleOfMillion = (num) => {
  if (typeof num !== "number") {
    throw new Error("Input must be a number");
  }
  return num % 10 === 0;
};
