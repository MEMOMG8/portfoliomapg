/** Homography from a 1000 x 625 display to four tracked screen corners (TL, TR, BR, BL). */
export function screenTransform(quad: number[][], width: number, height: number) {
  const [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = quad.map(([x,y]) => [x * width,y * height]);
  const dx1=x1-x2, dx2=x3-x2, dx3=x0-x1+x2-x3;
  const dy1=y1-y2, dy2=y3-y2, dy3=y0-y1+y2-y3;
  const determinant=dx1*dy2-dx2*dy1;
  const g=(dx3*dy2-dx2*dy3)/determinant, h=(dx1*dy3-dx3*dy1)/determinant;
  const a=x1-x0+g*x1, b=y1-y0+g*y1, c=x3-x0+h*x3, d=y3-y0+h*y3;
  return `matrix3d(${a/1000},${b/1000},0,${g/1000},${c/625},${d/625},0,${h/625},0,0,1,0,${x0},${y0},0,1)`;
}
