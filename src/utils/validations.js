export const validateForm = (selectedState, selectedDate, fieldNames) => {
  const errors = {};

  if (fieldNames.includes('selectedState') && !selectedState) {
    errors.selectedState = 'Please select a state.';
  }

  if (fieldNames.includes('selectedDate') && !selectedDate) {
    errors.selectedDate = 'Please select a date.';
  }

  return errors;
};
