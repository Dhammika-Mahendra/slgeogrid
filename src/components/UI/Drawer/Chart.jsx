import React from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { useMap } from '../../context/MapContext';
import { lightGrey } from '../../utils/constants';

export default function Chart() {

  const width = 150;
  const height = 500;
  const margin = { top: 20, right: 10, bottom: 20, left: 80 };

  const [data, setData] = React.useState([]);
  const { regionData, regionLevel} = useMap()

  // Update data when regionData or regionLevel changes
  React.useEffect(() => {
    if (regionData ) {
      const currentRegionData = regionData;
      // Sort by value in descending order
      const sortedData = [...currentRegionData].sort((a, b) => b.value - a.value);
      setData(sortedData);
    }
  }, [regionData, regionLevel]);


  // Chart dimensions
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Scales
  const yScale = scaleBand({
    range: [0, yMax],
    domain: data.map(d => d.name),
    padding: 0.1,
  });

  const xScale = scaleLinear({
    range: [0, xMax],
    domain: [0, Math.max(...data.map(d => d.value), 0)],
  });

  return (
    <div>

      {
        regionLevel == 'L2'|| regionLevel == 'L1'?
        <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          {data.map((d, i) => {
            const barHeight = 10; // Fixed bar width (thickness) of 10px
            const barWidth = xScale(d.value); // Length based on data value
            const barY = yScale(d.name);
            
            return (
              <Group key={`bar-${i}`}>
                {/* Bar */}
                <Bar
                  x={0}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={d.value == 0 ? lightGrey : d.color} // Grey color for zero values
                  rx={2}
                />
                {/* Y-axis name (smaller font) */}
                <text
                  x={-5}
                  y={barY + barHeight / 2}
                  dy="0.35em"
                  textAnchor="end"
                  fontSize="10px"
                  fill="#374151"
                >
                  {d.name}
                </text>
              </Group>
            );
          })}
        </Group>
      </svg>:''
      }
    </div>
  );
}
