export default function degToRadInPi(angle: number) {
  const fractionMap: Record<string, string> = {
    "0": "0",
    "30": "1/6 ",
    "45": "1/4 ",
    "60": "1/3 ",
    "90": "1/2 ",
    "120": "2/3 ",
    "135": "3/4 ",
    "150": "5/6 ",
    "180": "",
    "210": "7/6 ",
    "225": "5/4 ",
    "240": "4/3 ",
    "270": "3/2 ",
    "300": "5/3 ",
    "315": "7/4 ",
    "330": "11/6 ",
    "360": "2",
  };
  return typeof fractionMap[angle.toString()] === "string"
    ? `${fractionMap[angle.toString()]}𝜋`
    : `${(angle / 180).toFixed(2)}𝜋`;
}
