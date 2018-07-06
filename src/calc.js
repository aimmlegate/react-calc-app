const mathDispatcher = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
};

export const calc = (...params) => {
  if (params.length === 2) {
    const [operand, a] = params;
    const parsedA = parseFloat(a);
    return mathDispatcher[operand](parsedA, parsedA).toString();
  }
  const [operand, a, b] = params;
  const parsedA = parseFloat(a);
  const parsedB = parseFloat(b);
  return mathDispatcher[operand](parsedA, parsedB).toString();
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

