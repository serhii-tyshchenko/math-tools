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

const createPrimeFactorsTable = (primeFactors) => {
  const maxLengthNumber = Math.max(
    ...primeFactors.map(({ number }) => number.toString().length)
  );

  const maxLengthFactor = Math.max(
    ...primeFactors.map(({ factor }) => factor.toString().length)
  );

  const rows = primeFactors.map(({ number, factor }) => {
    const numberCells = generateNumberCells(number, maxLengthNumber);
    const factorCells = generateFactorCells(factor, maxLengthFactor);
    return `<tr><td></td>${numberCells}${factorCells}<td></td></tr>`;
  });

  const emptyRow = `<tr>${Array(maxLengthNumber + maxLengthFactor + 2)
    .fill('<td></td>')
    .join('')}</tr>`;

  return `
    <table class="tp-cells">
      <tbody>
        ${emptyRow}
        ${rows.join('')}
        ${emptyRow}
      </tbody>
    </table>
  `;
};

export const getPrimeFactorsResult = (number) => {
  const factors = getPrimeFactors(number);
  if (factors.length < 3) {
    return `${number} — просте число!`;
  }
  return createPrimeFactorsTable(factors);
};
