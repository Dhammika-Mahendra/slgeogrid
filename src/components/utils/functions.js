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

/**
 * Example usage and test cases
 */
export function testInterpolateColor() {
  // Test with numeric values (your example)
  console.log('Numeric interpolation test:');
  console.log('Result:', interpolateColor(0, 100, 5, 10, 8)); // Should output 60
  
  // Test with negative values
  console.log('Negative values test:');
  console.log('Result:', interpolateColor(0, 100, -5, 10, 5)); // Should output ~66.67
  console.log('Result:', interpolateColor(0, 100, -10, -5, -7)); // Should output 60
  
  // Test with hex colors
  console.log('Hex color interpolation test:');
  console.log('Result:', interpolateColor('#FF0000', '#0000FF', 0, 10, 5)); // Should be purple-ish
  console.log('Result:', interpolateColor('#FF0000', '#0000FF', -5, 5, 0)); // Should be purple-ish
}