function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

export const getGcdLcmResult = (a, b) => {
  return `
      НСК(${a}, ${b}) = ${lcm(a, b)}<br>НСД(${a}, ${b}) = ${gcd(a, b)}`;
};
