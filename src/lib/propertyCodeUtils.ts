export function generatePropertyCode(propertyName: string, propertyType: string): string {
  const typePrefix = propertyType
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  const namePrefix = propertyName
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();

  const randomNum = Math.floor(Math.random() * 900) + 100;
  const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const randomChar2 = String.fromCharCode(65 + Math.floor(Math.random() * 26));

  return `SC-${namePrefix}-${randomNum}-${randomChar}${randomChar2}`;
}

export function generateComplexCode(complexName: string, totalUnits: number): string {
  const namePrefix = complexName
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();

  const randomNum = Math.floor(Math.random() * 900) + 100;
  const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const randomChar2 = String.fromCharCode(65 + Math.floor(Math.random() * 26));

  return `RC-${namePrefix}-${randomNum}-${randomChar}${randomChar2}`;
}

export function calculateServiceScore(
  electricityCost: number,
  waterCost: number,
  internetCost: number
): number {
  const totalCost = electricityCost + waterCost + internetCost;

  let score = 100;

  if (totalCost > 300) {
    score -= 20;
  } else if (totalCost > 250) {
    score -= 15;
  } else if (totalCost > 200) {
    score -= 10;
  } else if (totalCost > 150) {
    score -= 5;
  }

  if (electricityCost > 120) {
    score -= 5;
  }
  if (waterCost > 60) {
    score -= 5;
  }
  if (internetCost > 100) {
    score -= 5;
  }

  return Math.max(60, Math.min(100, score));
}

export function getReliabilityRating(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Good';
  if (score >= 70) return 'Fair';
  return 'Poor';
}
