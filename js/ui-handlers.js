/**
 * UI handlers for the Contractor Communication Cost Calculator
 * Manages user interactions, form navigation, and updating the DOM
 */

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Step navigation
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");
  const progressIndicator = document.querySelector(".progress-indicator");
  const stepIndicators = document.querySelectorAll(".step");

  // Input elements
  const annualRevenueInput = document.getElementById("annualRevenue");
  const annualRevenueValue = document.getElementById("annualRevenueValue");
  const projectsPerYearSelect = document.getElementById("projectsPerYear");
  const avgProjectValueElement = document.getElementById("avgProjectValue");
  const paymentDelayInput = document.getElementById("paymentDelay");
  const paymentDelayValue = document.getElementById("paymentDelayValue");
  const disputesRateSelect = document.getElementById("disputesRate");
  const weeklyHoursInput = document.getElementById("weeklyHours");
  const weeklyHoursValue = document.getElementById("weeklyHoursValue");

  // Navigation buttons
  const step1NextButton = document.getElementById("step1Next");
  const step2BackButton = document.getElementById("step2Back");
  const calculateButton = document.getElementById("calculateButton");
  const step3BackButton = document.getElementById("step3Back");
  const recalculateButton = document.getElementById("recalculateButton");

  // Results elements
  const resultsContainer = document.querySelector(".results-container");
  const calculationAnimation = document.querySelector(".calculation-animation");
  const totalCostValue = document.getElementById("totalCostValue");
  const percentageValue = document.getElementById("percentageValue");
  const paymentDelayCost = document.getElementById("paymentDelayCost");
  const disputeCost = document.getElementById("disputeCost");
  const timeCost = document.getElementById("timeCost");
  const opportunityCost = document.getElementById("opportunityCost");
  const stressCost = document.getElementById("stressCost");
  const dailyCost = document.getElementById("dailyCost");
  const projectCost = document.getElementById("projectCost");
  const fiveYearCost = document.getElementById("fiveYearCost");
  const potentialSavings = document.getElementById("potentialSavings");
  const currentCostDisplay = document.getElementById("currentCostDisplay");
  const reducedCostDisplay = document.getElementById("reducedCostDisplay");
  const ctaCost = document.getElementById("ctaCost");

  // Initialize tooltips
  initTooltips();

  // Initialize input event listeners
  initInputListeners();

  // Initialize navigation button listeners
  initNavigationListeners();

  // Update average project value initially
  updateAvgProjectValue();

  /**
   * Initialize tooltip functionality
   */
  function initTooltips() {
    const tooltips = document.querySelectorAll(".tooltip");

    tooltips.forEach((tooltip) => {
      const icon = tooltip.querySelector("i");
      const text = tooltip.querySelector(".tooltiptext");

      // Show tooltip on hover or focus (for accessibility)
      icon.addEventListener("mouseover", () => {
        text.style.visibility = "visible";
        text.style.opacity = "1";
      });

      icon.addEventListener("mouseout", () => {
        text.style.visibility = "hidden";
        text.style.opacity = "0";
      });

      icon.addEventListener("focus", () => {
        text.style.visibility = "visible";
        text.style.opacity = "1";
      });

      icon.addEventListener("blur", () => {
        text.style.visibility = "hidden";
        text.style.opacity = "0";
      });
    });
  }

  /**
   * Initialize input listeners
   */
  function initInputListeners() {
    // Annual Revenue slider
    annualRevenueInput.addEventListener("input", function () {
      annualRevenueValue.textContent = Number(this.value).toLocaleString();
      updateAvgProjectValue();
    });

    // Projects Per Year select
    projectsPerYearSelect.addEventListener("change", function () {
      updateAvgProjectValue();
    });

    // Payment Delay slider
    paymentDelayInput.addEventListener("input", function () {
      paymentDelayValue.textContent = this.value;
    });

    // Weekly Hours slider
    weeklyHoursInput.addEventListener("input", function () {
      weeklyHoursValue.textContent = this.value;
    });
  }

  /**
   * Initialize navigation button listeners
   */
  function initNavigationListeners() {
    // Step 1 Next button
    step1NextButton.addEventListener("click", function () {
      goToStep(2);
    });

    // Step 2 Back button
    step2BackButton.addEventListener("click", function () {
      goToStep(1);
    });

    // Calculate button
    calculateButton.addEventListener("click", function () {
      goToStep(3);
      startCalculation();
    });

    // Step 3 Back button
    step3BackButton.addEventListener("click", function () {
      goToStep(2);
    });

    // Recalculate button
    recalculateButton.addEventListener("click", function () {
      goToStep(1);
    });
  }

  /**
   * Navigate to a specific step
   * @param {number} stepNumber - The step number to navigate to
   */
  function goToStep(stepNumber) {
    // Hide all steps
    step1.classList.remove("active");
    step2.classList.remove("active");
    step3.classList.remove("active");

    // Show the selected step
    if (stepNumber === 1) {
      step1.classList.add("active");
      progressIndicator.style.width = "33.33%";
    } else if (stepNumber === 2) {
      step2.classList.add("active");
      progressIndicator.style.width = "66.66%";
    } else if (stepNumber === 3) {
      step3.classList.add("active");
      progressIndicator.style.width = "100%";
    }

    // Update step indicators
    stepIndicators.forEach((indicator) => {
      const step = parseInt(indicator.getAttribute("data-step"));

      if (step < stepNumber) {
        indicator.classList.add("completed");
        indicator.classList.remove("active");
      } else if (step === stepNumber) {
        indicator.classList.add("active");
        indicator.classList.remove("completed");
      } else {
        indicator.classList.remove("active");
        indicator.classList.remove("completed");
      }
    });
  }

  /**
   * Update the average project value based on annual revenue and projects per year
   */
  function updateAvgProjectValue() {
    const annualRevenue = parseInt(annualRevenueInput.value);
    const projectsPerYear = parseInt(projectsPerYearSelect.value);
    const avgProjectValue = annualRevenue / projectsPerYear;

    avgProjectValueElement.textContent =
      Math.round(avgProjectValue).toLocaleString();

    // Add change highlight effect
    avgProjectValueElement.parentElement.classList.add("value-change");

    // Remove the highlight effect after animation completes
    setTimeout(() => {
      avgProjectValueElement.parentElement.classList.remove("value-change");
    }, 1000);
  }

  /**
   * Start the calculation process
   */
  function startCalculation() {
    // Show calculation animation
    calculationAnimation.style.display = "flex";
    resultsContainer.style.display = "none";

    // Collect input values
    const inputValues = {
      annualRevenue: parseInt(annualRevenueInput.value),
      projectsPerYear: parseInt(projectsPerYearSelect.value),
      paymentDelay: parseInt(paymentDelayInput.value),
      disputesRate: parseInt(disputesRateSelect.value),
      weeklyHours: parseInt(weeklyHoursInput.value),
    };

    // Set input values and calculate results
    calculator.setInputs(inputValues);
    const results = calculator.calculate();

    // Save results to local storage
    calculator.saveResults();

    // Simulate calculation time for better UX (3 seconds)
    setTimeout(() => {
      // Hide calculation animation and show results
      calculationAnimation.style.display = "none";
      resultsContainer.style.display = "block";

      // Update results in the UI with animations
      updateResultsUI(results);
    }, 3000);
  }

  /**
   * Update the results UI with calculated values
   * @param {Object} results - The calculation results
   */
  function updateResultsUI(results) {
    // Format numbers for display
    const formatNumber = (num) => Math.round(num).toLocaleString();
    const formatDecimal = (num) => num.toFixed(1);

    // Update total cost with animation
    const totalCostElement = document.querySelector(".total-cost");
    totalCostElement.classList.add("animate");

    // Update cost values with sequential animations
    totalCostValue.textContent = formatNumber(results.totalCost);
    percentageValue.textContent = formatDecimal(results.percentageOfRevenue);

    // Update cost breakdown items with sequential animations
    setTimeout(() => {
      paymentDelayCost.textContent = formatNumber(results.paymentDelayCost);
      paymentDelayCost.parentElement.classList.add("burning");

      document.querySelectorAll(".cost-item")[0].classList.add("animate");
    }, 200);

    setTimeout(() => {
      disputeCost.textContent = formatNumber(results.disputeResolutionCost);
      disputeCost.parentElement.classList.add("burning");

      document.querySelectorAll(".cost-item")[1].classList.add("animate");
    }, 400);

    setTimeout(() => {
      timeCost.textContent = formatNumber(results.timeWasteCost);
      timeCost.parentElement.classList.add("burning");

      document.querySelectorAll(".cost-item")[2].classList.add("animate");
    }, 600);

    setTimeout(() => {
      opportunityCost.textContent = formatNumber(results.lostOpportunityCost);
      opportunityCost.parentElement.classList.add("burning");

      document.querySelectorAll(".cost-item")[3].classList.add("animate");
    }, 800);

    setTimeout(() => {
      stressCost.textContent = formatNumber(results.stressCost);
      stressCost.parentElement.classList.add("burning");

      document.querySelectorAll(".cost-item")[4].classList.add("animate");
    }, 1000);

    // Update comparison metrics
    setTimeout(() => {
      dailyCost.textContent = formatNumber(results.dailyCost);
      document.querySelectorAll(".metric-card")[0].classList.add("animate");
    }, 1200);

    setTimeout(() => {
      projectCost.textContent = formatNumber(results.perProjectCost);
      document.querySelectorAll(".metric-card")[1].classList.add("animate");
    }, 1400);

    setTimeout(() => {
      fiveYearCost.textContent = formatNumber(results.fiveYearCost);
      document.querySelectorAll(".metric-card")[2].classList.add("animate");
    }, 1600);

    // Update savings projection
    setTimeout(() => {
      potentialSavings.textContent = formatNumber(results.potentialSavings);
      currentCostDisplay.textContent = formatNumber(results.totalCost);
      reducedCostDisplay.textContent = formatNumber(results.reducedCost);

      // Add a null check before updating the CTA button text
      if (ctaCost) {
        ctaCost.textContent = formatNumber(results.totalCost);
      }
    }, 1800);

    // Initialize the chart
    setTimeout(() => {
      initChart(results.costBreakdown);
    }, 500);
  }

  /**
   * Initialize the cost breakdown chart
   * @param {Array} costBreakdown - Array of cost breakdown items
   */
  function initChart(costBreakdown) {
    // If there's an existing chart, destroy it first
    if (window.costChart) {
      window.costChart.destroy();
    }

    // Get the canvas context
    const ctx = document.getElementById("costBreakdownChart").getContext("2d");

    // Prepare data for the chart
    const labels = costBreakdown.map((item) => item.label);
    const data = costBreakdown.map((item) => item.value);
    const colors = costBreakdown.map((item) => item.color);

    // Create the chart
    window.costChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors,
            borderColor: "white",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              font: {
                size: 12,
              },
              color: "#475569",
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.raw;
                const percentage = (
                  (value / context.dataset.data.reduce((a, b) => a + b, 0)) *
                  100
                ).toFixed(1);
                return `${label}: ${Math.round(
                  value
                ).toLocaleString()} (${percentage}%)`;
              },
            },
          },
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 2000,
          easing: "easeOutQuart",
        },
        cutout: "60%",
      },
    });
  }

  // Add notification when user clicks the Apply button
  document.querySelector(".cta-button").addEventListener("click", function (e) {
    e.preventDefault();

    // Create notification element
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML =
      '<i class="fas fa-check-circle"></i> Thank you for your interest! We\'ll be in touch soon.';

    // Add notification to the page
    document.body.appendChild(notification);

    // Show notification with animation
    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    // Remove notification after a delay
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 3000);
  });

  // Check if there are saved results to restore
  if (calculator.loadResults()) {
    // If there are saved results, offer to restore them
    const restorePrompt = document.createElement("div");
    restorePrompt.className = "restore-prompt";
    restorePrompt.innerHTML = `
            <div class="restore-message">
                <i class="fas fa-history"></i>
                <p>We found your previous calculation. Would you like to restore it?</p>
                <div class="restore-buttons">
                    <button class="restore-yes">Yes, restore</button>
                    <button class="restore-no">No, start fresh</button>
                </div>
            </div>
        `;

    // Add restore prompt to the page
    document.body.appendChild(restorePrompt);

    // Show restore prompt with animation
    setTimeout(() => {
      restorePrompt.classList.add("show");
    }, 500);

    // Handle restore prompt buttons
    restorePrompt
      .querySelector(".restore-yes")
      .addEventListener("click", function () {
        // Restore the saved values
        const inputs = calculator.inputs;

        // Update UI with saved values
        annualRevenueInput.value = inputs.annualRevenue;
        annualRevenueValue.textContent = Number(
          inputs.annualRevenue
        ).toLocaleString();

        projectsPerYearSelect.value = inputs.projectsPerYear;

        paymentDelayInput.value = inputs.paymentDelay;
        paymentDelayValue.textContent = inputs.paymentDelay;

        disputesRateSelect.value = inputs.disputesRate;

        weeklyHoursInput.value = inputs.weeklyHours;
        weeklyHoursValue.textContent = inputs.weeklyHours;

        // Update average project value
        updateAvgProjectValue();

        // Go to the results page and show the results
        goToStep(3);

        // Show calculation animation briefly
        calculationAnimation.style.display = "flex";
        resultsContainer.style.display = "none";

        // Short delay to simulate recalculation
        setTimeout(() => {
          calculationAnimation.style.display = "none";
          resultsContainer.style.display = "block";

          // Update results in the UI
          updateResultsUI(calculator.results);
        }, 1000);

        // Remove restore prompt
        restorePrompt.classList.remove("show");
        setTimeout(() => {
          document.body.removeChild(restorePrompt);
        }, 500);
      });

    restorePrompt
      .querySelector(".restore-no")
      .addEventListener("click", function () {
        // Remove saved data
        localStorage.removeItem("calculatorInputs");
        localStorage.removeItem("calculatorResults");

        // Remove restore prompt
        restorePrompt.classList.remove("show");
        setTimeout(() => {
          document.body.removeChild(restorePrompt);
        }, 500);
      });
  }
});
