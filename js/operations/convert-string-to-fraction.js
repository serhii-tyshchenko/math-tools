import { addEmToVariables } from './utils.js';

const formatString = (str, withNBSP = false) =>
  addEmToVariables(str)
    .replace('+', withNBSP ? '&nbsp;+&nbsp' : ' + ')
    .replace('-', withNBSP ? '&nbsp;–&nbsp' : ' - ')
    .replace('–', withNBSP ? '&nbsp;–&nbsp' : ' – ')
    .replace('*', withNBSP ? '&nbsp;·&nbsp' : ' · ')
    .replace('•', withNBSP ? '&nbsp;·&nbsp' : ' · ')
    .replace('=', withNBSP ? '&nbsp;=&nbsp' : ' = ');

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
      html += `<td rowspan="2">${formatString(part, true)}</td>`;
    }
  });

  html += `</tr>${bottomRow}</tr></tbody></table>`;
  return html;
};
