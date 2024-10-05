import {
  generateCells,
  generateCellsWithBorder,
  generateEmptyRow,
  generateEmptyCells,
  generateEmptyCellsWithBorder,
} from './utils.js';

const generateNumber1Row = (number, totalCells) => {
  const cells = generateCells(number);
  const offsetBefore = generateEmptyCells(
    totalCells - number.toString().length
  );

  return `<tr><td></td><td rowspan="2">×</td>${offsetBefore}${cells}<td></td></tr>`;
};

const generateNumber2Row = (number, totalCells) => {
  const cells = generateCellsWithBorder(number);
  const offsetBefore = generateEmptyCellsWithBorder(
    totalCells - number.toString().length
  );

  return `<tr><td></td>${offsetBefore}${cells}<td></td></tr>`;
};

const generateResultsRow = (number, totalCells) => {
  const cells = generateCellsWithBorder(number, 'top');
  const offsetBefore = generateEmptyCells(
    totalCells - number.toString().length + 1
  );

  return `<tr><td></td>${offsetBefore}${cells}<td></td></tr>`;
};

const generateIntermediateRow = (number, stepsCount, index) => {
  if (number === 0) {
    return '';
  }
  const cells = generateCells(number);
  const offsetBefore = generateEmptyCells(stepsCount - index);
  const offsetAfter = generateEmptyCells(index);

  return `<tr><td></td>${offsetBefore}${cells}${offsetAfter}<td></td></tr>`;
};

const generateIntermediateRows = (number1, number2) => {
  if (number2.toString().length === 1) {
    return '';
  }

  const intermediateResults = number2
    .toString()
    .split('')
    .reverse()
    .map((digit) => Number(digit) * number1);

  return intermediateResults
    .map((intermediateResult, index) =>
      generateIntermediateRow(
        intermediateResult,
        intermediateResults.length,
        index
      )
    )
    .join('');
};

export const getMultiplicationInColumnResult = (number1, number2) => {
  const result = number1 * number2;
  const maxLength = result.toString().length;

  const number1Row = generateNumber1Row(number1, maxLength);
  const number2Row = generateNumber2Row(number2, maxLength);
  const intermediateRows = generateIntermediateRows(
    number1,
    number2,
    maxLength
  );
  const resultRow = generateResultsRow(result, maxLength);
  const emptyRow = generateEmptyRow(maxLength + 3);

  return `<table class="tp-cells">
      <tbody>
          ${emptyRow}
          ${number1Row}
          ${number2Row}
          ${intermediateRows}
          ${resultRow}
          ${emptyRow}
      </tbody>
      </table>`;
};
