import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {validateNums} from '../scripts/calculation';
import {calculate} from '../api/api';

function Calculator() {
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [result, setResult] = useState('');
  const [errors, setErrors] = useState({
    firstValue: '',
    secondValue: '',
  });
  const [touched, setTouched] = useState({
    firstValue: false,
    secondValue: false,
  });
  const [disabled, setDisabled] = useState(true);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    setDisabled(
      errors.hasOwnProperty('firstValue') ||
        errors.hasOwnProperty('secondValue') ||
        !selected
        ? true
        : false,
    );
  }, [errors, selected]);
  const operators = [
    {key: 'add', value: '+'},
    {key: 'subtract', value: '-'},
    {key: 'multiply', value: '*'},
  ];

  useEffect(() => {
    setResult(
      `${firstValue}  ${
        selected
          ? operators.filter(item => item.key === selected)[0].value
          : selected
      }  ${secondValue}`,
    );
  }, [selected, firstValue, secondValue]);

  const handleCalculate = () => {
    calculate(firstValue, secondValue, selected, setResult, setErrors);
    initialize();
  };
  const handleClear = () => {
    setResult('');
    initialize();
  };
  const initialize = () => {
    setFirstValue('');
    setSecondValue('');
    setErrors({
      firstValue: '',
      secondValue: '',
    });
    setTouched({
      firstValue: false,
      secondValue: false,
    });
    setSelected('');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculator</Text>
      <View style={styles.resultBox}>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 3}}>
          <CustomInput
            placeholder="firstValue"
            value={firstValue}
            setValue={setFirstValue}
            errors={errors}
            setErrors={setErrors}
            touched={touched}
            setTouched={setTouched}
            validate={{validate: validateNums, params: []}}
          />
          <CustomInput
            placeholder="secondValue"
            value={secondValue}
            setValue={setSecondValue}
            errors={errors}
            setErrors={setErrors}
            touched={touched}
            setTouched={setTouched}
            validate={{validate: validateNums, params: []}}
          />
        </View>
        <View style={styles.operatorsBox}>
          <Pressable onPress={() => handleClear()} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>AC</Text>
          </Pressable>
          <SelectList
            placeholder="+"
            setSelected={val => setSelected(val)}
            data={operators}
            save="key"
            boxStyles={styles.box}
          />
        </View>
      </View>
      <CustomButton
        title="calculate"
        onPress={() => handleCalculate()}
        color="#0093AB"
        disabled={disabled}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 40,
  },
  title: {
    fontSize: 50,
    color: '#0093AB',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  resultBox: {
    backgroundColor: 'white',
    height: 70,
    borderRadius: 5,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    justifyContent: 'center',
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20,
  },
  operatorsBox: {
    flex: 1,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  clearButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 50,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#FFD124',
    fontWeight: 'bold',
  },
});
export default Calculator;
