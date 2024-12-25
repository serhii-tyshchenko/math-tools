import {
  getPrimeFactorsResult,
  getGcdLcmResult,
  getAdditionInColumnResult,
  getSubtractionInColumnResult,
  getMultiplicationInColumnResult,
  getDivisionInColumnResult,
  getConvertStringToFractionResult,
  getNormalizeExpressionResult,
} from './js/operations/index.js';
import {
  OPERATION_LABEL_MAP,
  OPERATION_MAP,
  OPERATION_SYMBOL_MAP,
} from './js/constants.js';

const FORM = document.querySelector('#form');
const INPUT_CONTAINER = document.querySelector('#input-container');
const OPERATION_SELECTOR = document.querySelector('#operation-selector');
const OPERATION_SYMBOL = document.querySelector('#operation-symbol');
const INPUT_FIELD_1 = document.querySelector('#number-1');
const INPUT_FIELD_2 = document.querySelector('#number-2');
const EXPRESSION_FIELD = document.querySelector('#expression');
const COPY_RESULT_BUTTON = document.querySelector('#copy-result');
const OUTPUT_CONTAINER = document.querySelector('#output-container');
const OUTPUT_BLOCK = document.querySelector('#output');
const ADD_COLUMN_CHECKBOX = document.querySelector('#add-column');
const ADD_COLUMN_CONTAINER = document.querySelector('#add-column-container');

const OPERATION_HANDLER_MAP = {
  [OPERATION_MAP.PRIME_FACTORS]: (num1, _num2, _exp, extraColumn) =>
    getPrimeFactorsResult(num1, extraColumn),
  [OPERATION_MAP.GCD_LCM]: (num1, num2) => getGcdLcmResult(num1, num2),
  [OPERATION_MAP.ADDITION_IN_COLUMN]: (num1, num2, _exp, extraColumn) =>
    getAdditionInColumnResult(+num1, +num2, extraColumn),
  [OPERATION_MAP.SUBSTRACTION_IN_COLUMN]: (num1, num2, _exp, extraColumn) =>
    getSubtractionInColumnResult(+num1, +num2, extraColumn),
  [OPERATION_MAP.MULTIPLICATION_IN_COLUMN]: (num1, num2, _exp, extraColumn) =>
    getMultiplicationInColumnResult(+num1, +num2, extraColumn),
  [OPERATION_MAP.DIVISION_IN_COLUMN]: (num1, num2) =>
    getDivisionInColumnResult(+num1, +num2),
  [OPERATION_MAP.CONVERT_STRING_TO_FRACTION]: (_1, _2, expression) =>
    getConvertStringToFractionResult(expression),
  [OPERATION_MAP.NORMALIZE_EXPRESSION]: (_1, _2, expression) =>
    getNormalizeExpressionResult(expression),
};

Object.entries(OPERATION_LABEL_MAP).forEach(([operation, label]) => {
  const option = document.createElement('option');
  option.value = operation;
  option.textContent = label;
  OPERATION_SELECTOR.appendChild(option);
});

const hideField = (field) => {
  field.classList.add('d-none');
  field.removeAttribute('required');
};

const showField = (field) => {
  field.classList.remove('d-none');
  field.setAttribute('required', true);
};

OPERATION_SELECTOR.addEventListener('change', () => {
  INPUT_CONTAINER.classList.remove('invisible');
  OUTPUT_CONTAINER.classList.add('invisible');
  const operation = OPERATION_SELECTOR.value;
  OPERATION_SYMBOL.textContent = OPERATION_SYMBOL_MAP[operation];

  switch (operation) {
    case OPERATION_MAP.PRIME_FACTORS:
      showField(INPUT_FIELD_1);
      showField(ADD_COLUMN_CONTAINER);
      hideField(INPUT_FIELD_2);
      hideField(EXPRESSION_FIELD);
      break;
    case OPERATION_MAP.GCD_LCM:
    case OPERATION_MAP.ADDITION_IN_COLUMN:
    case OPERATION_MAP.SUBSTRACTION_IN_COLUMN:
    case OPERATION_MAP.MULTIPLICATION_IN_COLUMN:
    case OPERATION_MAP.DIVISION_IN_COLUMN:
      showField(INPUT_FIELD_1);
      showField(INPUT_FIELD_2);
      hideField(EXPRESSION_FIELD);
      showField(ADD_COLUMN_CONTAINER);
      break;
    case OPERATION_MAP.CONVERT_STRING_TO_FRACTION:
      hideField(INPUT_FIELD_1);
      hideField(INPUT_FIELD_2);
      hideField(ADD_COLUMN_CONTAINER);
      showField(EXPRESSION_FIELD);
      EXPRESSION_FIELD.placeholder = 'Введіть вираз, наприклад 1/2 + 1/2 = 1';
      break;
    case OPERATION_MAP.NORMALIZE_EXPRESSION:
      hideField(INPUT_FIELD_1);
      hideField(INPUT_FIELD_2);
      hideField(ADD_COLUMN_CONTAINER);
      showField(EXPRESSION_FIELD);
      EXPRESSION_FIELD.placeholder = 'Введіть вираз, наприклад 1x + 2x = 3x';
      break;
    default:
      break;
  }
});

COPY_RESULT_BUTTON.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(OUTPUT_BLOCK.innerHTML);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
});

FORM.addEventListener('submit', (event) => {
  event.preventDefault();
  OUTPUT_CONTAINER.classList.add('invisible');
  const num1 = INPUT_FIELD_1.value;
  const num2 = INPUT_FIELD_2.value;
  const expression = EXPRESSION_FIELD.value;
  const operation = OPERATION_SELECTOR.value;
  const extraColumn = ADD_COLUMN_CHECKBOX.checked;

  const result = OPERATION_HANDLER_MAP[operation](
    num1,
    num2,
    expression,
    extraColumn
  );

  OUTPUT_BLOCK.innerHTML = result;
  OUTPUT_CONTAINER.classList.remove('invisible');
});
