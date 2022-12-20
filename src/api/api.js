export const calculate = (num1, num2, operator, setResult, setErrors) => {
  console.log('type of values', typeof num1, typeof operator);
  fetch(
    `https://sensational-semolina-f3dd15.netlify.app/.netlify/functions/apis/${operator}/?num1=${parseInt(
      num1,
    )}&num2=${parseInt(num2)}`,
  )
    .then(res => {
      return res.json();
    })
    .then(response => {
      console.log(response, operator, num1, num2);
      setResult(response.result);
    })
    .catch(error =>
      setErrors(state => {
        return {...state, result: error.message};
      }),
    );
};
