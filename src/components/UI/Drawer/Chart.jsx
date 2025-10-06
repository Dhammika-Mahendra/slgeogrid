import React from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';

// Dummy data with 10 records
const data = [
  { label: 'Item 1', value: 85, color: '#3b82f6' },
  { label: 'Item 2', value: 42, color: '#ef4444' },
  { label: 'Item 3', value: 78, color: '#10b981' },
  { label: 'Item 4', value: 63, color: '#f59e0b' },
  { label: 'Item 5', value: 91, color: '#8b5cf6' },
  { label: 'Item 6', value: 34, color: '#06b6d4' },
  { label: 'Item 7', value: 67, color: '#f97316' },
  { label: 'Item 8', value: 89, color: '#84cc16' },
  { label: 'Item 9', value: 45, color: '#ec4899' },
  { label: 'Item 10', value: 72, color: '#6366f1' }
];

export default function Chart() {
  const width = 150;
  const height = 300;
  const margin = { top: 20, right: 10, bottom: 20, left: 60 };

  // Chart dimensions
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Scales
  const yScale = scaleBand({
    range: [0, yMax],
    domain: data.map(d => d.label),
    padding: 0.1,
  });

  const xScale = scaleLinear({
    range: [0, xMax],
    domain: [0, 100],
  });

  return (
    <div>
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          {data.map((d, i) => {
            const barHeight = 10; // Fixed bar width (thickness) of 10px
            const barWidth = xScale(d.value); // Length based on data value
            const barY = yScale(d.label);
            
            return (
              <Group key={`bar-${i}`}>
                {/* Bar */}
                <Bar
                  x={0}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={d.color}
                  rx={2}
                />
                {/* Y-axis label (smaller font) */}
                <text
                  x={-5}
                  y={barY + barHeight / 2}
                  dy="0.35em"
                  textAnchor="end"
                  fontSize="10px"
                  fill="#374151"
                >
                  {d.label}
                </text>
              </Group>
            );
          })}
        </Group>
      </svg>
    </div>
  );
}
