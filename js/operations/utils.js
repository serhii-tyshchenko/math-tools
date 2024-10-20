import { VARIABLES } from '../constants.js';

export const generateEmptyCells = (totalCells) =>
  totalCells > 0 ? Array(totalCells).fill('<td></td>').join('') : '';

export const generateEmptyCellsWithBorder = (totalCells) =>
  totalCells > 0
    ? Array(totalCells).fill('<td class="td-border-bottom"></td>').join('')
    : '';

export const generateCells = (number) =>
  number
    .toString()
    .split('')
    .map((digit) => `<td>${digit}</td>`)
    .join('');

export const generateCellsWithBorder = (number, position = 'bottom') =>
  number
    .toString()
    .split('')
    .map((digit) => `<td class="td-border-${position}">${digit}</td>`)
    .join('');

export const generateEmptyRow = (totalCells) =>
  `<tr>${generateEmptyCells(totalCells)}</tr>`;

export const getSumOfTwoNumbers = (number1, number2) => number1 + number2;

export const getDifferenceOfTwoNumbers = (number1, number2) =>
  number1 - number2;

export const getMaxNumberLength = (number1, number2) =>
  Math.max(number1.toString().length, number2.toString().length);

export const addPseudoTag = (str, tag) => `x_${tag}_s${str}x_${tag}_e`;

export const normalizePseudoTag = (str, tag) =>
  str
    .replaceAll(`x_${tag}_s`, `<${tag}>`)
    .replaceAll(`x_${tag}_e`, `</${tag}>`);

const addPseudoEmTag = (str) => addPseudoTag(str, 'em');

export const normalizePseudoEmTag = (str) => normalizePseudoTag(str, 'em');

export const addEmToVariables = (rawString) =>
  rawString
    .split('')
    .map((l) => (VARIABLES.includes(l) ? `<em>${l}</em>` : l))
    .join('');

export const addPseudoEmToVariables = (rawString) =>
  rawString
    .split('')
    .map((l) => (VARIABLES.includes(l) ? addPseudoEmTag(l) : l))
    .join('');

export const pipe =
  (...fns) =>
  (...args) =>
    fns.reduce((v, f) => (Array.isArray(v) ? f(...v) : f(v)), args);
