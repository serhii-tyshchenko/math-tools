import {
  getPrimeFactorsResult,
  getGcdLcmResult,
} from './js/operations/index.js';
import { OPERATION_LABEL_MAP, OPERATION_MAP } from './js/constants.js';

const FORM = document.querySelector('#form');
const INPUT_CONTAINER = document.querySelector('#input-container');
const OPERATION_SELECTOR = document.querySelector('#operation-selector');
const INPUT_FIELD_1 = document.querySelector('#number-1');
const INPUT_FIELD_2 = document.querySelector('#number-2');
const COPY_RESULT_BUTTON = document.querySelector('#copy-result');
const OUTPUT_CONTAINER = document.querySelector('#output-container');
const OUTPUT_BLOCK = document.querySelector('#output');

const OPERATION_HANDLER_MAP = {
  [OPERATION_MAP.PRIME_FACTORS]: (num) => getPrimeFactorsResult(num),
  [OPERATION_MAP.GCD_LCM]: (num1, num2) => getGcdLcmResult(num1, num2),
};

Object.entries(OPERATION_LABEL_MAP).forEach(([operation, label]) => {
  const option = document.createElement('option');
  option.value = operation;
  option.textContent = label;
  OPERATION_SELECTOR.appendChild(option);
});

OPERATION_SELECTOR.addEventListener('change', () => {
  INPUT_CONTAINER.classList.remove('invisible');
  OUTPUT_CONTAINER.classList.add('invisible');
  const operation = OPERATION_SELECTOR.value;

  switch (operation) {
    case OPERATION_MAP.PRIME_FACTORS:
      INPUT_FIELD_2.classList.add('d-none');
      INPUT_FIELD_2.removeAttribute('required');
      break;
    case OPERATION_MAP.GCD_LCM:
      INPUT_FIELD_2.classList.remove('d-none');
      INPUT_FIELD_2.setAttribute('required', true);
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
  const num1 = INPUT_FIELD_1.valueAsNumber;
  const num2 = INPUT_FIELD_2.valueAsNumber;
  const operation = OPERATION_SELECTOR.value;

  const result = OPERATION_HANDLER_MAP[operation](num1, num2);

  OUTPUT_BLOCK.innerHTML = result;
  OUTPUT_CONTAINER.classList.remove('invisible');
});
