const mathDispatcher = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  x: (a, b) => a * b,
  '/': (a, b) => a / b,
  '': a => a,
};

export const calc = (...params) => {
  const [operand, a, b] = params;
  if (a === null) {
    const parsedB = parseFloat(b);
    return mathDispatcher[operand](parsedB, parsedB).toPrecision(3).toString();
  }
  const parsedB = parseFloat(b);
  const parsedA = parseFloat(a);
  return mathDispatcher[operand](parsedA, parsedB).toPrecision(3).toString();
};

export const isStrFloat = str => str.split('').some(el => el === '.');

export const togglePM = (str) => {
  if (str === '0') {
    return str;
  }
  const isMinus = str.split('').some(el => el === '-');
  if (isMinus) {
    return str.split('').filter(el => el !== '-').join('');
  }
  return `-${str}`;
};

