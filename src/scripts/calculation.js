export const validateNums = value => {
  if (value == +value) {
    return false;
  } else {
    return 'the value is not a valid number';
  }
};

export const validateFirstValue = value => {};
export const validateSecondValue = value => {};
