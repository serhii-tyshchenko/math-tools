import {
  generateCells,
  generateCellsWithBorder,
  generateEmptyRow,
  generateEmptyCells,
  generateEmptyCellsWithBorder,
} from './utils.js';

const getDivisionSteps = (number1, number2) => {
  let steps = [];
  let dividend = number1;

  while (dividend >= number2) {
    let partialDividend = parseInt(
      dividend.toString().slice(0, number2.toString().length)
    );
    if (partialDividend < number2) {
      partialDividend = parseInt(
        dividend.toString().slice(0, number2.toString().length + 1)
      );
    }
    let partialProduct = Math.floor(partialDividend / number2) * number2;
    steps.push({ first: partialDividend, second: partialProduct });
    dividend = parseInt(
      dividend
        .toString()
        .replace(
          partialDividend.toString(),
          (partialDividend - partialProduct).toString()
        )
    );
  }

  if (dividend > 0) {
    steps.push({ first: dividend, second: null });
  }
  return steps;
};

const getResultPartLength = (number2, result) =>
  Math.max(number2.toString().length, result.toString().length);

const generateFirstRow = (number1, number2, result) => {
  const number1Cells = generateCells(number1);
  const number2FirstCell = generateCellsWithBorder(
    +number2.toString()[0],
    'bottom-left'
  );
  const resultPartLength = getResultPartLength(number2, result);
  const number2RestCells = number2.toString().slice(1)
    ? generateCellsWithBorder(number2.toString().slice(1), 'bottom')
    : '';

  return `<tr><td></td><td rowspan="2">–</td>${number1Cells}${number2FirstCell}${number2RestCells}${generateEmptyCellsWithBorder(
    resultPartLength - number2.toString().length
  )}<td></td></tr>`;
};

const generateSecondRow = (number1, number2, result) => {
  const intermediateResult = +result.toString()[0] * number2;
  const intermediateCells = generateCellsWithBorder(
    intermediateResult,
    'bottom'
  );
  const intermediateResultOffset = generateEmptyCells(
    number1.toString().length - intermediateResult.toString().length
  );
  const resultFirstCell = generateCellsWithBorder(
    +result.toString()[0],
    'left'
  );
  const resultPartLength = getResultPartLength(number2, result);
  const resultRestCells = +result.toString().slice(1)
    ? generateCells(+result.toString().slice(1))
    : generateEmptyCells(resultPartLength - result.toString().length);

  return `<tr><td></td>${intermediateCells}${intermediateResultOffset}${resultFirstCell}${resultRestCells}<td></td></tr>`;
};

const generateIntermediateRows = (number1, number2, result) => {
  const steps = getDivisionSteps(number1, number2);
  let output = '';
  let offset = 0;

  const resultPartLength = getResultPartLength(number2, result);

  for (let i = 1; i < steps.length; i++) {
    if (steps[i - 1].first - steps[i - 1].second === 0) {
      output += `<tr><td></td>${generateEmptyCells(offset + 2)}${generateCells(
        0
      )}${generateEmptyCells(
        number1.toString().length + resultPartLength + offset - 1
      )}</tr>`;
    }
    const firstRow = generateCells(steps[i].first);
    const secondRow = steps[i].second
      ? generateCellsWithBorder(steps[i].second, 'bottom')
      : '';
    offset =
      (steps[i - 1].first.toString().length -
        (steps[i - 1].first - steps[i - 1].second).toString().length) *
      (i - 1);
    if (steps[i].first - steps[i].second === 0) offset++;

    output += `<tr><td></td>${generateEmptyCells(offset)}${
      secondRow ? '<td rowspan="2">–</td>' : '<td></td>'
    }${firstRow}${generateEmptyCells(
      number1.toString().length -
        offset -
        steps[i].first.toString().length +
        resultPartLength +
        1
    )}</tr>
    ${
      secondRow
        ? `<tr>${generateEmptyCells(
            offset
          )}<td></td>${generateEmptyCellsWithBorder(
            steps[i].first.toString().length - steps[i].second.toString().length
          )}${secondRow}${generateEmptyCells(
            number1.toString().length -
              offset -
              steps[i].second.toString().length +
              resultPartLength +
              1
          )}</tr>`
        : ''
    }`;
  }
  if (steps[steps.length - 1].first - steps[steps.length - 1].second === 0) {
    output += `<tr><td></td>${generateEmptyCells(offset + 2)}${generateCells(
      0
    )}${generateEmptyCells(
      number1.toString().length - offset + resultPartLength - 1
    )}</tr>`;
  }

  return output;
};

export const getDivisionInColumnResult = (number1, number2) => {
  if (number2 === 0) {
    return 'На нуль ділити не можна!';
  }
  if (number1 < number2) {
    return 'Ділене має бути більше дільника!';
  }
  const result = Math.floor(number1 / number2);
  const firstRow = generateFirstRow(number1, number2, result);
  const secondRow = generateSecondRow(number1, number2, result);
  const intermediateRows = generateIntermediateRows(number1, number2, result);
  const resultPartLength = getResultPartLength(number2, result);
  const emptyRow = generateEmptyRow(
    number1.toString().length + resultPartLength + 3
  );

  return `<table class="tp-cells">
      <tbody>
          ${emptyRow}
          ${firstRow}
          ${secondRow}
          ${intermediateRows}
          ${emptyRow}
      </tbody>
      </table>`;
};
