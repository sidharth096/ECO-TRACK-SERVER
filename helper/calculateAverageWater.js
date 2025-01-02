/**
 *
 * @param {Array} familyMembers
 * @param {number} daysInMonth
 * @returns {number}
 */
export default function calculateAverageWater(familyMembers, daysInMonth = 30) {
  if (!familyMembers || familyMembers.length === 0) {
    return 0;
  }

  let totalWaterUsage = 0;

  familyMembers.forEach((member) => {
    const { age } = member;

    let waterUsagePerDay;

    if (age < 12) {
      waterUsagePerDay = 30;
    } else if (age >= 12 && age < 60) {
      waterUsagePerDay = 80;
    } else if (age >= 60 && age <= 80) {
      waterUsagePerDay = 60;
    }
    else{
        waterUsagePerDay = 40
    }

    const monthlyUsage = waterUsagePerDay * daysInMonth;
    totalWaterUsage += monthlyUsage;
  });

  return totalWaterUsage;
}
