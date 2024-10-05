export const OPERATION_MAP = {
  PRIME_FACTORS: 'prime-factors',
  GCD_LCM: 'gcd-lcm',
  ADDITION_IN_COLUMN: 'addition-in-column',
  SUBSTRACTION_IN_COLUMN: 'substraction-in-column',
  MULTIPLICATION_IN_COLUMN: 'multiplication-in-column',
};

export const OPERATION_LABEL_MAP = {
  [OPERATION_MAP.ADDITION_IN_COLUMN]: 'Додавання в стовпчик',
  [OPERATION_MAP.SUBSTRACTION_IN_COLUMN]: 'Віднімання в стовпчик',
  [OPERATION_MAP.MULTIPLICATION_IN_COLUMN]: 'Множення в стовпчик',
  [OPERATION_MAP.PRIME_FACTORS]: 'Розклад на прості множники',
  [OPERATION_MAP.GCD_LCM]: 'НСД і НСК двох чисел',
};

export const OPERATION_SYMBOL_MAP = {
  [OPERATION_MAP.ADDITION_IN_COLUMN]: '+',
  [OPERATION_MAP.SUBSTRACTION_IN_COLUMN]: '–',
  [OPERATION_MAP.MULTIPLICATION_IN_COLUMN]: '×',
  [OPERATION_MAP.PRIME_FACTORS]: '',
  [OPERATION_MAP.GCD_LCM]: 'і',
};
