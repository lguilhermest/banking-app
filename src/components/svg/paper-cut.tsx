import Svg, { Path } from 'react-native-svg';

export const PaperCut = ({
  color,
  height,
  width,
  triangles = 20,
}: {
  color: string;
  height: number;
  width: number;
  triangles?: number;
}) => {
  const generatePath = () => {
    const totalTriangles = triangles;
    const step = width / totalTriangles; // base de cada triângulo
    const half = step / 2;

    const points: string[] = [`M0,0`];

    for (let i = 0; i < totalTriangles; i++) {
      const x1 = i * step + half;
      const y1 = height;
      const x2 = (i + 1) * step;
      const y2 = 0;
      points.push(`L${x1},${y1} L${x2},${y2}`);
    }

    points.push(`L${width},0 Z`);
    return points.join(' ');
  };

  return (
    <Svg width={width} height={height}>
      <Path d={generatePath()} fill={color} />
    </Svg>
  );
};
