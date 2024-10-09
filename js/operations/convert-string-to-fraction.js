import { addEmToLetter } from './utils.js';

const formatString = (str) => {
  return addEmToLetter(str)
    .replace('+', ' + ')
    .replace('-', ' - ')
    .replace('*', ' · ');
};

export const getConvertStringToFractionResult = (expression) => {
  const parts = expression.split(' ');

  let html = '<table class="tp-fraction"><tbody><tr>';
  let bottomRow = '<tr>';

  parts.forEach((part) => {
    if (part.includes('/')) {
      const [numerator, denominator] = part.split('/');
      html += `<td>${formatString(numerator)}</td>`;
      bottomRow += `<td>${formatString(denominator)}</td>`;
    } else {
      html += `<td rowspan="2">&nbsp;${formatString(part)}&nbsp;</td>`;
    }
  });

  html += `</tr>${bottomRow}</tr></tbody></table>`;
  return html;
};
