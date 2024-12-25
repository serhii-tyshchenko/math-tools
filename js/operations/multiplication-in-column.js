import {
  generateCells,
  generateCellsWithBorder,
  generateEmptyCells,
  generateEmptyCellsWithBorder,
} from './utils.js';

const generateNumber1Cells = (number, totalCells) => {
  const cells = generateCells(number);
  const offsetBefore = generateEmptyCells(
    totalCells - number.toString().length
  );

  return `<td rowspan="2">×</td>${offsetBefore}${cells}`;
};

const generateNumber2Cells = (number, totalCells) => {
  const cells = generateCellsWithBorder(number);
  const offsetBefore = generateEmptyCellsWithBorder(
    totalCells - number.toString().length
  );

  return `${offsetBefore}${cells}`;
};

const generateIntermediateCells = (number, stepsCount, index) => {
  if (number === 0) {
    return '';
  }
  const cells = generateCells(number);
  const offsetBefore = generateEmptyCells(stepsCount - index);
  const offsetAfter = generateEmptyCells(index);

  return `${offsetBefore}${cells}${offsetAfter}`;
};

const generateIntermediateRows = (number1, number2, extraColumn) => {
  if (number2.toString().length === 1) {
    return '';
  }

  const extraColumnCells = extraColumn ? '<td></td>' : '';

  const intermediateResults = number2
    .toString()
    .split('')
    .reverse()
    .map((digit) => Number(digit) * number1);

  return intermediateResults
    .map(
      (intermediateResult, index) =>
        `<tr><td></td>${extraColumnCells}${generateIntermediateCells(
          intermediateResult,
          intermediateResults.length,
          index
        )}<td></td></tr>`
    )
    .join('');
};

const generateResultCells = (number, totalCells) => {
  const cells = generateCellsWithBorder(number, 'top');
  const offsetBefore = generateEmptyCells(
    totalCells - number.toString().length + 1
  );

  return `${offsetBefore}${cells}`;
};

export const getMultiplicationInColumnResult = (
  number1,
  number2,
  extraColumn
) => {
  const result = number1 * number2;
  const maxLength = result.toString().length;

  const number1Cells = generateNumber1Cells(number1, maxLength);
  const number2Cells = generateNumber2Cells(number2, maxLength);
  const intermediateRows = generateIntermediateRows(
    number1,
    number2,
    extraColumn
  );
  const resultCells = generateResultCells(result, maxLength);
  const emptyCells = generateEmptyCells(maxLength + 1);
  const extraColumnCells = extraColumn ? '<td></td>' : '';

  return `<table class="tp-cells">
      <tbody>
          <tr><td></td>${extraColumnCells}${emptyCells}<td></td></tr>
          <tr><td></td>${extraColumnCells}${number1Cells}<td></td></tr>
          <tr><td></td>${extraColumnCells}${number2Cells}<td></td></tr>
          ${intermediateRows}
          <tr><td></td>${extraColumnCells}${resultCells}<td></td></tr>
          <tr><td></td>${extraColumnCells}${emptyCells}<td></td></tr>
      </tbody>
      </table>`;
};
