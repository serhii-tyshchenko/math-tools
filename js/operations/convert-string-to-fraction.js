import {
  addEmToVariables,
  addPseudoEmToVariables,
  normalizePseudoEmTag,
  pipe,
} from './utils.js';

const addSpaces = (str) =>
  str
    .replaceAll('+', '&nbsp;+&nbsp')
    .replaceAll('–', '&nbsp;–&nbsp')
    .replaceAll('-', '&nbsp;–&nbsp')
    .replaceAll('·', '&nbsp;·&nbsp')
    .replaceAll('*', '&nbsp;·&nbsp')
    .replaceAll('•', '&nbsp;·&nbsp')
    .replaceAll('=', '&nbsp;=&nbsp')
    .replaceAll('≠', '&nbsp;≠&nbsp')
    .replaceAll('≈', '&nbsp;≈&nbsp')
    .replaceAll(':', '&nbsp;:&nbsp')
    .replaceAll('<', '&nbsp;<&nbsp')
    .replaceAll('>', '&nbsp;>&nbsp')
    .replaceAll('≤', '&nbsp;≤&nbsp')
    .replaceAll('≥', '&nbsp;≥&nbsp')
    .replaceAll('&nbsp;&nbsp;', '&nbsp;');

const formatString = (str) =>
  pipe(addPseudoEmToVariables, addSpaces, normalizePseudoEmTag)(str);

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
      html += `<td rowspan="2">${formatString(part)}</td>`;
    }
  });

  html += `</tr>${bottomRow}</tr></tbody></table>`;
  return html;
};
