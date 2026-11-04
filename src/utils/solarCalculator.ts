import { SolarCalculationResult } from '../types';

export function calculateSolarReadiness(params: {
  monthlyBill: number;
  city: string;
  pinCode: string;
  roofAreaSqFt: number;
  shadingLevel?: 'none' | 'partial' | 'heavy';
}): SolarCalculationResult {
  const {
    monthlyBill = 2500,
    city = 'Ahmedabad',
    pinCode = '380009',
    roofAreaSqFt = 400,
    shadingLevel = 'none',
  } = params;

  // Average residential tariff slab in Western India (Gujarat DISCOMs like UGVCL/Torrent)
  const averageTariffPerKwh = 6.4;
  const estimatedUnitsConsumed = Math.max(80, Math.round(monthlyBill / averageTariffPerKwh));

  // Shading efficiency multiplier
  const shadingMultipliers: Record<string, number> = {
    none: 1.0,
    partial: 0.85,
    heavy: 0.65,
  };
  const shadingFactor = shadingMultipliers[shadingLevel] || 1.0;

  // Daily energy requirement
  const dailyUnits = estimatedUnitsConsumed / 30;

  // Western India average peak sun-hours yield: ~4.2 kWh/kWp/day
  const dailyYieldPerKw = 4.2 * shadingFactor;

  // Calculated capacity needed
  let rawKw = dailyUnits / dailyYieldPerKw;
  // Snap to standard 0.5 kW increments, clamp between 1.0 and 10.0 kW
  let recommendedKw = Math.round(rawKw * 2) / 2;
  if (recommendedKw < 1.0) recommendedKw = 1.0;
  if (recommendedKw > 10.0) recommendedKw = 10.0;

  // Space requirement: ~90-100 sq ft shadow-free area per 1 kWp of mono-PERC / TOPCon panels
  const sqFtPerKw = 95;
  const requiredRoofAreaSqFt = Math.round(recommendedKw * sqFtPerKw);

  const isRoofSufficient = roofAreaSqFt <= 0 ? true : roofAreaSqFt >= requiredRoofAreaSqFt;

  // Generation estimate
  const estimatedMonthlyUnits = Math.round(recommendedKw * 4.2 * 30 * shadingFactor);

  // Savings estimate (capped at monthly bill)
  const indicativeMonthlySavings = Math.round(
    Math.min(monthlyBill * 0.9, estimatedMonthlyUnits * averageTariffPerKwh * 0.92)
  );
  const indicativeAnnualSavings = indicativeMonthlySavings * 12;

  // PM Surya Ghar Muft Bijli Yojana Benchmark Subsidies:
  // 1 kW: ₹30,000 | 2 kW: ₹60,000 | 3 kW+: ₹78,000 (standard national slab)
  let indicativeGovtSubsidy = 30000;
  if (recommendedKw >= 3.0) {
    indicativeGovtSubsidy = 78000;
  } else if (recommendedKw >= 2.0) {
    indicativeGovtSubsidy = 60000;
  } else if (recommendedKw >= 1.0) {
    indicativeGovtSubsidy = 30000;
  }

  // Indicative turnkey installation cost: ₹55,000 to ₹65,000 per kW (including structure & standard wiring)
  const costMin = Math.round(recommendedKw * 54000);
  const costMax = Math.round(recommendedKw * 64000);
  const netMin = Math.max(12000, costMin - indicativeGovtSubsidy);
  const netMax = Math.max(18000, costMax - indicativeGovtSubsidy);

  const avgNet = (netMin + netMax) / 2;
  const indicativeSimplePaybackYears =
    indicativeAnnualSavings > 0
      ? Math.round((avgNet / indicativeAnnualSavings) * 10) / 10
      : 3.8;

  const questionsForInstaller: string[] = [
    'Are you an empanelled vendor under the PM Surya Ghar Muft Bijli Yojana national portal?',
    'What is the typical timeline for DISCOM net-meter inspection and bi-directional meter installation in our ward?',
    'What tier-1 mono-crystalline or bifacial panel modules and inverter brands are included in your turnkey quote?',
    'Does the quote include elevated galvanized iron (GI) mounting structure for roof access and cleaning walkway?',
    'What is the 5-year comprehensive free maintenance, workmanship, and inverter warranty coverage?',
  ];

  return {
    monthlyBill,
    city: city || 'Ahmedabad',
    pinCode: pinCode || '380009',
    roofAreaSqFt,
    shadingLevel,
    recommendedKw,
    estimatedMonthlyUnits,
    indicativeMonthlySavings,
    indicativeAnnualSavings,
    requiredRoofAreaSqFt,
    isRoofSufficient,
    indicativeGovtSubsidy,
    indicativeSystemCostRange: [costMin, costMax],
    indicativeNetCostRange: [netMin, netMax],
    indicativeSimplePaybackYears,
    questionsForInstaller,
    disclaimer:
      'This calculation is an educational, illustrative estimate based on regional solar irradiance benchmarks. It is not an engineering feasibility study, DISCOM approval, vendor contract, or guaranteed return.',
  };
}
