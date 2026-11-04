import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateSolarReadiness } from './solarCalculator';

test('solarCalculator calculates accurate capacity for a typical household bill', () => {
  const result = calculateSolarReadiness({
    monthlyBill: 3000,
    city: 'Ahmedabad',
    pinCode: '380015',
    roofAreaSqFt: 500,
    shadingLevel: 'none',
  });

  assert.ok(result.recommendedKw >= 2.5 && result.recommendedKw <= 4.0);
  assert.equal(result.isRoofSufficient, true);
  assert.ok(result.estimatedMonthlyUnits > 300);
  assert.ok(result.indicativeGovtSubsidy >= 60000); // 2kW or 3kW slab
  assert.ok(result.questionsForInstaller.length >= 4);
});

test('solarCalculator detects insufficient roof area correctly', () => {
  const result = calculateSolarReadiness({
    monthlyBill: 6000,
    city: 'Surat',
    pinCode: '395007',
    roofAreaSqFt: 150, // very small roof for a large bill
    shadingLevel: 'none',
  });

  assert.equal(result.isRoofSufficient, false);
  assert.ok(result.requiredRoofAreaSqFt > 150);
});

test('solarCalculator adjusts for partial shading gracefully', () => {
  const unshaded = calculateSolarReadiness({
    monthlyBill: 2500,
    city: 'Vadodara',
    pinCode: '390001',
    roofAreaSqFt: 400,
    shadingLevel: 'none',
  });

  const shaded = calculateSolarReadiness({
    monthlyBill: 2500,
    city: 'Vadodara',
    pinCode: '390001',
    roofAreaSqFt: 400,
    shadingLevel: 'partial',
  });

  // Capacity or yield adapts to shading
  assert.ok(shaded.recommendedKw >= unshaded.recommendedKw);
});
