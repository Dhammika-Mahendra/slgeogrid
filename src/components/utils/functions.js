//random number generator
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

//-----------------------------------------------------------------------------
//                Map color determination (continuous)
//-----------------------------------------------------------------------------

/**
 * Performs linear interpolation between two color values
 * @param {number|string} minColor - Minimum color value (number or hex color code)
 * @param {number|string} maxColor - Maximum color value (number or hex color code)
 * @param {number} minValue - Minimum value in the range
 * @param {number} maxValue - Maximum value in the range
 * @param {number} currentValue - The value to interpolate for
 * @returns {number|string} Interpolated color value (same type as input)
 */
export function interpolateColor(minColor, maxColor, minValue, maxValue, currentValue) {
  // Handle edge cases
  if (minValue === maxValue) {
    return minColor;
  }
  
  // Calculate the total range (handling negative values)
  const totalRange = Math.abs(maxValue - minValue);
  
  // Calculate how far the current value is from the minimum
  const valueOffset = currentValue - minValue;
  
  // Calculate the interpolation factor (0 to 1)
  const interpolationFactor = valueOffset / totalRange;
  
  // Clamp the interpolation factor between 0 and 1
  const clampedFactor = Math.max(0, Math.min(1, interpolationFactor));
  
  // Check if we're dealing with hex colors or numeric values
  if (typeof minColor === 'string' && typeof maxColor === 'string') {
    return interpolateHexColor(minColor, maxColor, clampedFactor);
  } else {
    // Numeric interpolation
    return minColor + (maxColor - minColor) * clampedFactor;
  }
}

/**
 * Interpolates between two hex color codes
 * @param {string} minColor - Minimum hex color (e.g., '#FF0000')
 * @param {string} maxColor - Maximum hex color (e.g., '#0000FF')
 * @param {number} factor - Interpolation factor (0 to 1)
 * @returns {string} Interpolated hex color
 */
function interpolateHexColor(minColor, maxColor, factor) {
  // Remove # symbol if present
  const cleanMinColor = minColor.replace('#', '');
  const cleanMaxColor = maxColor.replace('#', '');
  
  // Parse RGB components
  const minR = parseInt(cleanMinColor.substring(0, 2), 16);
  const minG = parseInt(cleanMinColor.substring(2, 4), 16);
  const minB = parseInt(cleanMinColor.substring(4, 6), 16);
  
  const maxR = parseInt(cleanMaxColor.substring(0, 2), 16);
  const maxG = parseInt(cleanMaxColor.substring(2, 4), 16);
  const maxB = parseInt(cleanMaxColor.substring(4, 6), 16);
  
  // Interpolate each RGB component
  const interpolatedR = Math.round(minR + (maxR - minR) * factor);
  const interpolatedG = Math.round(minG + (maxG - minG) * factor);
  const interpolatedB = Math.round(minB + (maxB - minB) * factor);
  
  // Convert back to hex
  const hexR = interpolatedR.toString(16).padStart(2, '0');
  const hexG = interpolatedG.toString(16).padStart(2, '0');
  const hexB = interpolatedB.toString(16).padStart(2, '0');
  
  return `#${hexR}${hexG}${hexB}`;
}

//-----------------------------------------------------------------------------
//                Map color determination (discrete)
//-----------------------------------------------------------------------------
/**
 * Performs discrete color interpolation by dividing the color scale into groups
 * @param {string} minColor - Minimum hex color (e.g., '#000000')
 * @param {string} maxColor - Maximum hex color (e.g., '#666666')
 * @param {number} minValue - Minimum value in the range
 * @param {number} maxValue - Maximum value in the range
 * @param {number} currentValue - The value to map to a color
 * @param {number} groups - Number of discrete color groups
 * @returns {string} The discrete hex color corresponding to the value
 */
export function interpolateGroupColor(minColor, maxColor, minValue, maxValue, currentValue, groups) {
  // Handle edge cases
  if (minValue === maxValue) {
    return minColor;
  }
  
  // Validate groups
  groups = Math.max(1, Math.floor(groups));
  
  // Generate the discrete color palette
  const colors = [];
  for (let i = 0; i < groups; i++) {
    const factor = groups === 1 ? 0 : i / (groups - 1); // 0 to 1
    colors.push(interpolateHexColor(minColor, maxColor, factor));
  }
  
  // Calculate the position of currentValue in the range (0 to 1)
  const totalRange = maxValue - minValue;
  const valueOffset = currentValue - minValue;
  const position = valueOffset / totalRange;
  
  // Clamp position between 0 and 1
  const clampedPosition = Math.max(0, Math.min(1, position));
  
  // Determine which color group the position falls into
  // Each group occupies 1/groups of the range
  const groupSize = 1 / groups;
  let colorIndex = Math.floor(clampedPosition / groupSize);
  
  // Handle edge case where position is exactly 1.0
  if (colorIndex >= groups) {
    colorIndex = groups - 1;
  }
  
  return colors[colorIndex];
}

//-----------------------------------------------------------------------------
//                Gradient color scale generation
//-----------------------------------------------------------------------------

export function groupColorScale(minColor, maxColor, groups) {
  // Validate inputs
  if (!minColor || !maxColor || !groups || isNaN(groups)) return '';
  groups = Math.max(1, Math.floor(groups));

  // Single color -> simple solid band via gradient
  if (groups === 1) {
    return `linear-gradient(to top, ${minColor} 0%, ${minColor} 100%)`;
  }

  // Generate the list of evenly spaced colors (including endpoints)
  const colors = [];
  for (let i = 0; i < groups; i++) {
    const factor = i / (groups - 1); // 0 .. 1
    colors.push(interpolateHexColor(minColor, maxColor, factor));
  }

  // Each color occupies an equal segment of the band. Use hard stops by
  // repeating each color at the segment's start and end.
  const segmentSize = 100 / groups;
  const stops = [];

  for (let i = 0; i < groups; i++) {
    const start = +(segmentSize * i).toFixed(4);
    const end = +((segmentSize * (i + 1)).toFixed(4));
    stops.push(`${colors[i]} ${start}%`);
    stops.push(`${colors[i]} ${end}%`);
  }

  return `linear-gradient(to top, ${stops.join(', ')})`;
}

