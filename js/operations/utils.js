export const generateEmptyRow = (totalCells) =>
  `<tr>${Array(totalCells).fill('<td></td>').join('')}</tr>`;
