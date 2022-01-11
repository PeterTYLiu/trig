export default function numOrUndefined(num: number) {
  if (num > 1000 || num < -1000) return "undefined";
  if (Math.abs(Number(num.toFixed(7))) == 0) return "0.00";
  return num.toFixed(2);
}
