const isDollarSign = (symbol) => symbol === '$';
const isEqualSign = (symbol) => symbol === '=';

const isMonetary = (symbol) =>
  isDollarSign(symbol) || isEqualSign(symbol);

export const formatTierValueStatment = ({ symbol }) => ({
  value,
}) => {
  let output = value;
  if (isMonetary(symbol)) output = `$${output}`;
  if (!isEqualSign(symbol)) output = `-${output}`;
  if (!isMonetary(symbol)) output += '%';
  return output;
};
