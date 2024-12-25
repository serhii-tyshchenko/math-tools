import { generateEmptyCells } from './utils.js';

const EMPTY_SYMBOL = 'x';

const getPrimeFactors = (number) => {
  const primeFactors = [];
  for (let i = 2; i <= number; i++) {
    while (number % i === 0) {
      primeFactors.push({ number, factor: i });
      number /= i;
    }
  }
  primeFactors.push({ number: 1, factor: EMPTY_SYMBOL });

  return primeFactors;
};

const generateNumberCells = (number, totalCells, withBorder = false) => {
  const cells = number
    .toString()
    .split('')
    .map((digit, index) =>
      withBorder && index === 0
        ? `<td class="td-border-left">${
            digit === EMPTY_SYMBOL ? '' : digit
          }</td>`
        : `<td>${digit}</td>`
    );
  const emptyCellsCount = totalCells - cells.length;
  const emptyCells = Array(emptyCellsCount).fill('<td></td>').join('');

  return withBorder
    ? `${cells.join('')}${emptyCells}`
    : `${emptyCells}${cells.join('')}`;
};

const generateFactorCells = (number, totalCells) =>
  generateNumberCells(number, totalCells, true);

const createPrimeFactorsTable = (primeFactors, extraColumn) => {
  const maxLengthNumber = Math.max(
    ...primeFactors.map(({ number }) => number.toString().length)
  );

  const maxLengthFactor = Math.max(
    ...primeFactors.map(({ factor }) => factor.toString().length)
  );

  const extraColumnCells = extraColumn ? '<td></td>' : '';
  const emptyCells = generateEmptyCells(maxLengthNumber + maxLengthFactor);

  const rows = primeFactors.map(({ number, factor }) => {
    const numberCells = generateNumberCells(number, maxLengthNumber);
    const factorCells = generateFactorCells(factor, maxLengthFactor);
    return `<tr><td></td>${extraColumnCells}${numberCells}${factorCells}<td></td></tr>`;
  });

  return `
    <table class="tp-cells">
      <tbody>
        <tr><td></td>${extraColumnCells}${emptyCells}<td></td></tr>
        ${rows.join('')}
        <tr><td></td>${extraColumnCells}${emptyCells}<td></td></tr>
      </tbody>
    </table>
  `;
};

export const getPrimeFactorsResult = (number, extraColumn) => {
  const factors = getPrimeFactors(number);
  if (factors.length < 3) {
    return `${number} — просте число!`;
  }
  return createPrimeFactorsTable(factors, extraColumn);
};
