/**
 * Core calculation logic for the Contractor Communication Cost Calculator
 */

// Constants used in calculations
const CONSTANTS = {
  WORKING_CAPITAL_COST: 0.07, // 7% annually
  AVG_DISPUTE_COST: 3400, // $3,400 per dispute
  HOURLY_VALUE: 85, // $85 per hour
  WORKING_WEEKS: 50, // 50 working weeks per year
  WORKING_DAYS: 250, // 250 working days per year
  REFERRAL_LOSS_RATE: 0.3, // 30% of disputes lose referrals
  PROFIT_MARGIN: 0.15, // 15% profit margin
  STRESS_COST_FACTOR: 0.25, // 25% of payment delay + dispute costs
  POTENTIAL_SAVINGS_RATE: 0.82, // 82% potential reduction
};

// Class to handle all calculations
class CostCalculator {
  constructor() {
    // Default values (industry averages)
    this.defaultValues = {
      annualRevenue: 500000,
      projectsPerYear: 10,
      paymentDelay: 83, // Industry average
      disputesRate: 2, // ~21% dispute frequency (2.1 per 10 projects)
      weeklyHours: 5, // 5.2 hours weekly average
    };

    // Actual input values (will be updated by user inputs)
    this.inputs = { ...this.defaultValues };

    // Results object to store calculated values
    this.results = {};
  }

  /**
   * Set input values from user interface
   * @param {Object} inputValues - Object containing user input values
   */
  setInputs(inputValues) {
    // Validate and update input values
    this.inputs = {
      ...this.inputs,
      ...inputValues,
    };

    // Apply input validation rules
    this.validateInputs();

    return this;
  }

  /**
   * Reset to default values
   */
  resetToDefaults() {
    this.inputs = { ...this.defaultValues };
    return this;
  }

  /**
   * Validate inputs to prevent unrealistic values
   */
  validateInputs() {
    // Ensure annual revenue is within reasonable bounds
    if (this.inputs.annualRevenue < 100000) {
      this.inputs.annualRevenue = 100000;
    } else if (this.inputs.annualRevenue > 10000000) {
      this.inputs.annualRevenue = 10000000;
    }

    // Ensure projects per year is a reasonable number
    if (this.inputs.projectsPerYear < 1) {
      this.inputs.projectsPerYear = 1;
    } else if (this.inputs.projectsPerYear > 100) {
      this.inputs.projectsPerYear = 100;
    }

    // Ensure payment delay is within reasonable bounds
    if (this.inputs.paymentDelay < 0) {
      this.inputs.paymentDelay = 0;
    } else if (this.inputs.paymentDelay > 120) {
      this.inputs.paymentDelay = 120;
    }

    // Ensure disputes rate is within reasonable bounds
    if (this.inputs.disputesRate < 0) {
      this.inputs.disputesRate = 0;
    } else if (this.inputs.disputesRate > 10) {
      this.inputs.disputesRate = 10;
    }

    // Ensure weekly hours is within reasonable bounds
    if (this.inputs.weeklyHours < 0) {
      this.inputs.weeklyHours = 0;
    } else if (this.inputs.weeklyHours > 20) {
      this.inputs.weeklyHours = 20;
    }
  }

  /**
   * Calculate average project value
   * @returns {number} The average value per project
   */
  calculateAvgProjectValue() {
    return this.inputs.annualRevenue / this.inputs.projectsPerYear;
  }

  /**
   * Calculate payment delay cost
   * @returns {number} The cost of payment delays
   */
  calculatePaymentDelayCost() {
    const avgProjectValue = this.calculateAvgProjectValue();
    return (
      avgProjectValue *
      (this.inputs.paymentDelay / 365) *
      CONSTANTS.WORKING_CAPITAL_COST *
      this.inputs.projectsPerYear
    );
  }

  /**
   * Calculate dispute resolution cost
   * @returns {number} The cost of dispute resolution
   */
  calculateDisputeResolutionCost() {
    return (
      (this.inputs.disputesRate / 10) *
      this.inputs.projectsPerYear *
      CONSTANTS.AVG_DISPUTE_COST
    );
  }

  /**
   * Calculate time waste cost
   * @returns {number} The cost of wasted time
   */
  calculateTimeWasteCost() {
    const annualHoursWasted = this.inputs.weeklyHours * CONSTANTS.WORKING_WEEKS;
    return annualHoursWasted * CONSTANTS.HOURLY_VALUE;
  }

  /**
   * Calculate lost opportunity cost
   * @returns {number} The cost of lost opportunities
   */
  calculateLostOpportunityCost() {
    const avgProjectValue = this.calculateAvgProjectValue();
    const referralLossRate =
      this.inputs.disputesRate * CONSTANTS.REFERRAL_LOSS_RATE;
    const lostReferrals = this.inputs.projectsPerYear * (referralLossRate / 10);
    return lostReferrals * avgProjectValue * CONSTANTS.PROFIT_MARGIN;
  }

  /**
   * Calculate hidden stress cost
   * @returns {number} The cost of stress
   */
  calculateStressCost() {
    const paymentDelayCost = this.calculatePaymentDelayCost();
    const disputeResolutionCost = this.calculateDisputeResolutionCost();
    return (
      (paymentDelayCost + disputeResolutionCost) * CONSTANTS.STRESS_COST_FACTOR
    );
  }

  /**
   * Calculate total annual cost
   * @returns {number} The total cost of poor communication
   */
  calculateTotalCost() {
    const paymentDelayCost = this.calculatePaymentDelayCost();
    const disputeResolutionCost = this.calculateDisputeResolutionCost();
    const timeWasteCost = this.calculateTimeWasteCost();
    const lostOpportunityCost = this.calculateLostOpportunityCost();
    const stressCost = this.calculateStressCost();

    return (
      paymentDelayCost +
      disputeResolutionCost +
      timeWasteCost +
      lostOpportunityCost +
      stressCost
    );
  }

  /**
   * Calculate percentage of annual revenue
   * @returns {number} The percentage of annual revenue
   */
  calculatePercentageOfRevenue() {
    const totalCost = this.calculateTotalCost();
    return (totalCost / this.inputs.annualRevenue) * 100;
  }

  /**
   * Calculate daily cost
   * @returns {number} The daily cost
   */
  calculateDailyCost() {
    const totalCost = this.calculateTotalCost();
    return totalCost / CONSTANTS.WORKING_DAYS;
  }

  /**
   * Calculate cost per project
   * @returns {number} The cost per project
   */
  calculatePerProjectCost() {
    const totalCost = this.calculateTotalCost();
    return totalCost / this.inputs.projectsPerYear;
  }

  /**
   * Calculate 5-year projection
   * @returns {number} The 5-year cost projection
   */
  calculateFiveYearCost() {
    const totalCost = this.calculateTotalCost();
    return totalCost * 5;
  }

  /**
   * Calculate potential savings
   * @returns {number} The potential savings
   */
  calculatePotentialSavings() {
    const totalCost = this.calculateTotalCost();
    return totalCost * CONSTANTS.POTENTIAL_SAVINGS_RATE;
  }

  /**
   * Calculate reduced cost after implementing the solution
   * @returns {number} The reduced annual cost
   */
  calculateReducedCost() {
    const totalCost = this.calculateTotalCost();
    return totalCost * (1 - CONSTANTS.POTENTIAL_SAVINGS_RATE);
  }

  /**
   * Perform all calculations and return results
   * @returns {Object} Object containing all calculation results
   */
  calculate() {
    // Calculate all values
    const avgProjectValue = this.calculateAvgProjectValue();
    const paymentDelayCost = this.calculatePaymentDelayCost();
    const disputeResolutionCost = this.calculateDisputeResolutionCost();
    const timeWasteCost = this.calculateTimeWasteCost();
    const lostOpportunityCost = this.calculateLostOpportunityCost();
    const stressCost = this.calculateStressCost();
    const totalCost = this.calculateTotalCost();
    const percentageOfRevenue = this.calculatePercentageOfRevenue();
    const dailyCost = this.calculateDailyCost();
    const perProjectCost = this.calculatePerProjectCost();
    const fiveYearCost = this.calculateFiveYearCost();
    const potentialSavings = this.calculatePotentialSavings();
    const reducedCost = this.calculateReducedCost();

    // Store results
    this.results = {
      avgProjectValue,
      paymentDelayCost,
      disputeResolutionCost,
      timeWasteCost,
      lostOpportunityCost,
      stressCost,
      totalCost,
      percentageOfRevenue,
      dailyCost,
      perProjectCost,
      fiveYearCost,
      potentialSavings,
      reducedCost,

      // Include a breakdown for the chart
      costBreakdown: [
        { label: "Payment Delays", value: paymentDelayCost, color: "#ef4444" },
        {
          label: "Dispute Resolution",
          value: disputeResolutionCost,
          color: "#f97316",
        },
        { label: "Time Waste", value: timeWasteCost, color: "#eab308" },
        {
          label: "Lost Opportunities",
          value: lostOpportunityCost,
          color: "#8b5cf6",
        },
        { label: "Hidden Stress Cost", value: stressCost, color: "#ec4899" },
      ],
    };

    return this.results;
  }

  /**
   * Get cost breakdown percentages
   * @returns {Array} Array of cost breakdown items with percentages
   */
  getCostBreakdownPercentages() {
    if (!this.results.totalCost) {
      this.calculate();
    }

    return this.results.costBreakdown.map((item) => {
      return {
        ...item,
        percentage: (item.value / this.results.totalCost) * 100,
      };
    });
  }

  /**
   * Save calculations to local storage
   */
  saveResults() {
    try {
      localStorage.setItem("calculatorInputs", JSON.stringify(this.inputs));
      localStorage.setItem("calculatorResults", JSON.stringify(this.results));
      return true;
    } catch (error) {
      console.error("Error saving results:", error);
      return false;
    }
  }

  /**
   * Load calculations from local storage
   */
  loadResults() {
    try {
      const savedInputs = localStorage.getItem("calculatorInputs");
      const savedResults = localStorage.getItem("calculatorResults");

      if (savedInputs) {
        this.inputs = JSON.parse(savedInputs);
      }

      if (savedResults) {
        this.results = JSON.parse(savedResults);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error loading results:", error);
      return false;
    }
  }
}

// Export the calculator instance
const calculator = new CostCalculator();
