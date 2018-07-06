const mathDispatcher = {
  '+': (a, b) => a + b,
};

export default (...params) => {
  if (params.length === 2) {
    const [operand, a] = params;
    const parsedA = parseInt(a, 10);
    return mathDispatcher[operand](parsedA, parsedA).toString();
  }
  const [operand, a, b] = params;
  const parsedA = parseInt(a, 10);
  const parsedB = parseInt(b, 10);
  return mathDispatcher[operand](parsedA, parsedB).toString();
};
