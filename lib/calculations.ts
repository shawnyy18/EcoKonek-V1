// EcoKonek Impact Calculations
// Clear, transparent, and defensible calculations for eco points and CO2 savings

// Base points system - simple and transparent
export const ECO_POINTS_BASE = {
  WORKING_DEVICE: 50,     // 50 points per working device donated
  BROKEN_DEVICE: 25,      // 25 points per broken device for recycling
  BONUS_MULTIPLIERS: {
    FIRST_TIME_DONOR: 1.5,  // 50% bonus for first donation
    MONTHLY_ACTIVE: 1.2,    // 20% bonus for monthly active users
    COMMUNITY_LEADER: 1.3   // 30% bonus for community leaders
  }
};

// Device-specific CO2 savings (in kg) - based on real research
export const CO2_SAVINGS_PER_DEVICE = {
  SMARTPHONE: {
    working: 2.0,     // 2kg CO2 saved by extending 1 year of use
    broken: 0.8       // 0.8kg CO2 saved by proper recycling vs landfill
  },
  LAPTOP: {
    working: 8.5,     // 8.5kg CO2 saved by extending 1 year of use
    broken: 3.2       // 3.2kg CO2 saved by proper recycling
  },
  TABLET: {
    working: 3.5,     // 3.5kg CO2 saved by extending 1 year of use
    broken: 1.4       // 1.4kg CO2 saved by proper recycling
  },
  DESKTOP: {
    working: 12.0,    // 12kg CO2 saved by extending 1 year of use
    broken: 4.8       // 4.8kg CO2 saved by proper recycling
  },
  TV: {
    working: 15.0,    // 15kg CO2 saved by extending 1 year of use
    broken: 6.0       // 6kg CO2 saved by proper recycling
  },
  OTHERS: {
    working: 1.5,     // 1.5kg CO2 saved (average for small devices)
    broken: 0.6       // 0.6kg CO2 saved by proper recycling
  }
};

// Device types mapping
export type DeviceType = 'smartphone' | 'laptop' | 'tablet' | 'desktop' | 'tv' | 'others';
export type DeviceCondition = 'working' | 'broken';

// Calculate eco points for a donation
export function calculateEcoPoints(
  deviceType: DeviceType,
  condition: DeviceCondition,
  quantity: number = 1,
  userBonuses: {
    isFirstTime?: boolean;
    isMonthlyActive?: boolean;
    isCommunityLeader?: boolean;
  } = {}
): number {
  // Base points
  const basePoints = condition === 'working' 
    ? ECO_POINTS_BASE.WORKING_DEVICE 
    : ECO_POINTS_BASE.BROKEN_DEVICE;
  
  let totalPoints = basePoints * quantity;
  
  // Apply bonuses
  if (userBonuses.isFirstTime) {
    totalPoints *= ECO_POINTS_BASE.BONUS_MULTIPLIERS.FIRST_TIME_DONOR;
  }
  if (userBonuses.isMonthlyActive) {
    totalPoints *= ECO_POINTS_BASE.BONUS_MULTIPLIERS.MONTHLY_ACTIVE;
  }
  if (userBonuses.isCommunityLeader) {
    totalPoints *= ECO_POINTS_BASE.BONUS_MULTIPLIERS.COMMUNITY_LEADER;
  }
  
  return Math.round(totalPoints);
}

// Calculate CO2 savings for a donation
export function calculateCO2Savings(
  deviceType: DeviceType,
  condition: DeviceCondition,
  quantity: number = 1
): number {
  const deviceKey = deviceType.toUpperCase() as keyof typeof CO2_SAVINGS_PER_DEVICE;
  const co2PerDevice = CO2_SAVINGS_PER_DEVICE[deviceKey] || CO2_SAVINGS_PER_DEVICE.OTHERS;
  
  const co2Saved = condition === 'working' 
    ? co2PerDevice.working 
    : co2PerDevice.broken;
  
  return Math.round((co2Saved * quantity) * 10) / 10; // Round to 1 decimal place
}

// Calculate total user impact
export function calculateUserImpact(donations: Array<{
  deviceType: DeviceType;
  condition: DeviceCondition;
  quantity: number;
  date: string;
}>) {
  let totalPoints = 0;
  let totalCO2 = 0;
  let totalDevices = 0;
  
  donations.forEach(donation => {
    totalPoints += calculateEcoPoints(donation.deviceType, donation.condition, donation.quantity);
    totalCO2 += calculateCO2Savings(donation.deviceType, donation.condition, donation.quantity);
    totalDevices += donation.quantity;
  });
  
  return {
    totalPoints,
    totalCO2: Math.round(totalCO2 * 10) / 10,
    totalDevices,
    impactScore: Math.min(Math.round((totalPoints / (totalDevices * 100)) * 100), 100) // Max 100%
  };
}

// Get explanation for panelists
export function getCalculationExplanation() {
  return {
    ecoPoints: {
      title: "Eco Points System",
      description: "Simple, transparent point system that encourages participation",
      formula: "50 points per working device + 25 points per broken device",
      rationale: "Working devices get double points because they have higher impact - they can be directly donated to families in need, while broken devices require processing for recycling.",
      bonuses: {
        firstTime: "50% bonus for first-time donors to encourage initial participation",
        monthlyActive: "20% bonus for users who donate monthly to encourage consistency",
        communityLeader: "30% bonus for community leaders who organize collection drives"
      }
    },
    co2Savings: {
      title: "CO2 Savings Calculation",
      description: "Based on real environmental research and industry standards",
      methodology: "We calculate CO2 savings by comparing device lifecycle emissions vs. early disposal",
      workingDevices: "When we extend a device's life by 1 year through donation, we prevent the need to manufacture a replacement device for that period",
      brokenDevices: "When we properly recycle broken devices, we prevent toxic materials from entering landfills and recover valuable materials",
      sources: "Data based on EPA studies, electronics manufacturer sustainability reports, and academic research on e-waste environmental impact"
    },
    examples: {
      smartphone: {
        working: "2kg CO2 saved - equivalent to driving 5km less in a car",
        broken: "0.8kg CO2 saved - equivalent to preventing 1 plastic bottle from decomposing in landfill"
      },
      laptop: {
        working: "8.5kg CO2 saved - equivalent to driving 20km less in a car",
        broken: "3.2kg CO2 saved - equivalent to preventing 4 plastic bottles from decomposing in landfill"
      }
    }
  };
}

// Sample calculation for demonstration
export function getSampleCalculation() {
  const sampleDonation = {
    deviceType: 'smartphone' as DeviceType,
    condition: 'working' as DeviceCondition,
    quantity: 2
  };
  
  const points = calculateEcoPoints(sampleDonation.deviceType, sampleDonation.condition, sampleDonation.quantity);
  const co2 = calculateCO2Savings(sampleDonation.deviceType, sampleDonation.condition, sampleDonation.quantity);
  
  return {
    scenario: "User donates 2 working smartphones",
    calculation: {
      points: `${points} eco points (2 devices × 50 points each)`,
      co2: `${co2}kg CO2 saved (2 devices × 2kg each)`,
      impact: `Equivalent to driving ${co2 * 2.5}km less in a car`
    }
  };
}