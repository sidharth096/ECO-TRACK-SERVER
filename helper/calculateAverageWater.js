/**
 * Calculate the monthly water usage based on age.
 * @param {Array} familyMembers - Array of family members with `age`.
 * @param {number} daysInMonth - Number of days in the month (default is 30).
 * @returns {number} - Total monthly water usage in liters.
 */
export default function calculateAverageWater(familyMembers, daysInMonth = 30) {
    if (!familyMembers || familyMembers.length === 0) {
        return 0; // No family members, no usage
      }
    
      let totalWaterUsage = 0;
    
      familyMembers.forEach(member => {
        const { age } = member;
    
        // Define water usage rate based on age group
        let waterUsagePerDay;
    
        if (age < 12) {
          waterUsagePerDay = 30; // Children use 30 liters per day
        } else if (age >= 12 && age < 60) {
          waterUsagePerDay = 80; // Adults use 80 liters per day
        } else {
          waterUsagePerDay = 50; // Elderly use 50 liters per day
        }   
    
        // Calculate the monthly usage for this family member
        const monthlyUsage = waterUsagePerDay * daysInMonth;
        totalWaterUsage += monthlyUsage;
      });
    
      return totalWaterUsage;
}