/**
 * Report Generator for Contractor Communication Cost Calculator
 * Creates a downloadable PDF report with calculation results
 */

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize PDF generation when the page loads
  initReportGenerator();

  /**
   * Initialize the report generator
   */
  function initReportGenerator() {
    // Get the download report button
    const downloadReportButton = document.querySelector(".cta-secondary");

    // Add click event listener
    if (downloadReportButton) {
      downloadReportButton.addEventListener("click", function (e) {
        e.preventDefault();

        // Generate and download the PDF report
        generatePDFReport();

        // Create notification element (same as in ui-handlers.js)
        const notification = document.createElement("div");
        notification.className = "notification";
        notification.innerHTML =
          '<i class="fas fa-check-circle"></i> Your custom report has been downloaded!';

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
    }
  }

  /**
   * Generate a PDF report with the calculation results
   */
  function generatePDFReport() {
    // Make sure jsPDF is loaded
    if (typeof window.jspdf === "undefined") {
      console.error("jsPDF library not loaded");
      return;
    }

    // Get the current date for the report
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString();

    // Create a new PDF document
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Check if calculator has results
    if (!calculator.results || !calculator.results.totalCost) {
      console.error("No calculation results to generate report");
      return;
    }

    // Format numbers for display
    const formatNumber = (num) => Math.round(num).toLocaleString();
    const formatDecimal = (num) => num.toFixed(1);

    // Get results
    const results = calculator.results;
    const inputs = calculator.inputs;

    // Set up document properties
    doc.setProperties({
      title: "Communication Cost Report",
      subject: "Contractor Communication Cost Analysis",
      author: "Contractor Trust Building System",
      keywords: "contractor, communication, cost, analysis",
      creator: "Contractor Trust Building System Calculator",
    });

    // Add header
    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235); // Primary color
    doc.text("Contractor Communication Cost Report", 105, 20, {
      align: "center",
    });

    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // Medium color
    doc.text(`Generated on ${dateString}`, 105, 27, { align: "center" });

    // Add company logo or branding
    // You can add an image here if needed

    // Add divider line
    doc.setDrawColor(226, 232, 240); // Light color
    doc.setLineWidth(0.5);
    doc.line(20, 32, 190, 32);

    // Add summary section
    doc.setFontSize(14);
    doc.setTextColor(30, 41, 59); // Dark color
    doc.text("Executive Summary", 20, 42);

    doc.setFontSize(12);
    doc.setTextColor(71, 85, 105); // Medium-dark color
    doc.text(
      "Based on your inputs, poor communication is costing your business:",
      20,
      50
    );

    // Add total cost highlight
    doc.setFillColor(37, 99, 235); // Primary color
    doc.setDrawColor(29, 78, 216); // Primary dark
    doc.roundedRect(20, 55, 170, 20, 3, 3, "FD");

    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255); // White
    doc.text("TOTAL ANNUAL COST:", 30, 66);

    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text(`$${formatNumber(results.totalCost)}`, 160, 66, {
      align: "right",
    });
    doc.setFont(undefined, "normal");

    // Add revenue percentage
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59); // Dark color
    doc.text(
      `This represents ${formatDecimal(
        results.percentageOfRevenue
      )}% of your annual revenue`,
      20,
      85
    );

    // Add inputs section
    doc.setFontSize(14);
    doc.setTextColor(30, 41, 59); // Dark color
    doc.text("Your Business Inputs", 20, 100);

    // Create a table for inputs
    const inputsTableBody = [
      ["Annual Revenue:", `$${formatNumber(inputs.annualRevenue)}`],
      ["Projects Per Year:", inputs.projectsPerYear],
      ["Average Project Value:", `$${formatNumber(results.avgProjectValue)}`],
      ["Payment Delay (days):", inputs.paymentDelay],
      ["Disputes per 10 Projects:", inputs.disputesRate],
      ["Weekly Documentation Hours:", inputs.weeklyHours],
    ];

    doc.autoTable({
      startY: 105,
      body: inputsTableBody,
      theme: "plain",
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 80, fontStyle: "bold" },
        1: { cellWidth: 80, halign: "right" },
      },
    });

    // Add cost breakdown section
    const finalY = doc.previousAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.setTextColor(30, 41, 59); // Dark color
    doc.text("Cost Breakdown", 20, finalY);

    // Create a table for cost breakdown
    const breakdownTableBody = [
      ["Payment Delays:", `$${formatNumber(results.paymentDelayCost)}`],
      [
        "Dispute Resolution:",
        `$${formatNumber(results.disputeResolutionCost)}`,
      ],
      ["Time Waste:", `$${formatNumber(results.timeWasteCost)}`],
      ["Lost Opportunities:", `$${formatNumber(results.lostOpportunityCost)}`],
      ["Hidden Stress Cost:", `$${formatNumber(results.stressCost)}`],
    ];

    doc.autoTable({
      startY: finalY + 5,
      body: breakdownTableBody,
      theme: "plain",
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 80, fontStyle: "bold" },
        1: { cellWidth: 80, halign: "right" },
      },
    });

    // Add comparison metrics
    const finalY2 = doc.previousAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.setTextColor(30, 41, 59); // Dark color
    doc.text("What This Means For Your Business", 20, finalY2);

    // Create a table for comparison metrics
    const comparisonTableBody = [
      ["Daily Cost:", `$${formatNumber(results.dailyCost)}`],
      ["Per-Project Cost:", `$${formatNumber(results.perProjectCost)}`],
      ["5-Year Projection:", `$${formatNumber(results.fiveYearCost)}`],
    ];

    doc.autoTable({
      startY: finalY2 + 5,
      body: comparisonTableBody,
      theme: "plain",
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 80, fontStyle: "bold" },
        1: { cellWidth: 80, halign: "right" },
      },
    });

    // Add potential savings section
    const finalY3 = doc.previousAutoTable.finalY + 10;

    // Add a new page if needed
    if (finalY3 > 250) {
      doc.addPage();
      doc.setFontSize(14);
      doc.setTextColor(30, 41, 59); // Dark color
      doc.text("Potential Savings", 20, 20);

      // Create savings highlight box
      doc.setFillColor(22, 163, 74); // Secondary color (green)
      doc.setDrawColor(21, 128, 61); // Secondary dark
      doc.roundedRect(20, 25, 170, 35, 3, 3, "FD");

      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255); // White
      doc.text(
        "With the Contractor Trust Building System, clients typically reduce these costs by 82%",
        105,
        38,
        { align: "center" }
      );

      doc.setFontSize(16);
      doc.setFont(undefined, "bold");
      doc.text(
        `Potential Annual Savings: $${formatNumber(results.potentialSavings)}`,
        105,
        50,
        { align: "center" }
      );
      doc.setFont(undefined, "normal");

      // Add call to action
      doc.setFontSize(12);
      doc.setTextColor(30, 41, 59); // Dark color
      doc.text("Next Steps", 20, 75);

      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105); // Medium-dark color
      doc.text(
        "To learn how Contractor Trust Building System can help you reduce communication costs and improve",
        20,
        85
      );
      doc.text(
        "project outcomes, apply for one of our exclusive implementation spots today.",
        20,
        92
      );

      doc.setFillColor(22, 163, 74); // Secondary color (green)
      doc.setDrawColor(21, 128, 61); // Secondary dark
      doc.roundedRect(60, 105, 90, 15, 3, 3, "FD");

      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255); // White
      doc.setFont(undefined, "bold");
      doc.text("www.ByContractorsForContractors.com", 105, 114, {
        align: "center",
      });
      doc.setFont(undefined, "normal");

      // Add footer
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139); // Medium color
      doc.text(
        "This report is based on industry research and your specific inputs. Individual results may vary.",
        105,
        280,
        { align: "center" }
      );
      doc.text(
        "© 2025 Contractor Trust Building System. All rights reserved.",
        105,
        285,
        {
          align: "center",
        }
      );
    } else {
      // Create savings highlight box
      doc.setFillColor(22, 163, 74); // Secondary color (green)
      doc.setDrawColor(21, 128, 61); // Secondary dark
      doc.roundedRect(20, finalY3, 170, 35, 3, 3, "FD");

      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255); // White
      doc.text(
        "With the Contractor Trust Building System, clients typically reduce these costs by 82%",
        105,
        finalY3 + 13,
        { align: "center" }
      );

      doc.setFontSize(16);
      doc.setFont(undefined, "bold");
      doc.text(
        `Potential Annual Savings: $${formatNumber(results.potentialSavings)}`,
        105,
        finalY3 + 25,
        { align: "center" }
      );
      doc.setFont(undefined, "normal");

      // Add call to action
      const finalY4 = finalY3 + 45;
      doc.setFontSize(12);
      doc.setTextColor(30, 41, 59); // Dark color
      doc.text("Next Steps", 20, finalY4);

      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105); // Medium-dark color
      doc.text(
        "To learn how Contractor Trust Building System can help you reduce communication costs and improve",
        20,
        finalY4 + 10
      );
      doc.text(
        "project outcomes, apply for one of our exclusive implementation spots today.",
        20,
        finalY4 + 17
      );

      // Add apply button
      if (finalY4 + 30 < 270) {
        doc.setFillColor(22, 163, 74); // Secondary color (green)
        doc.setDrawColor(21, 128, 61); // Secondary dark
        doc.roundedRect(60, finalY4 + 25, 90, 15, 3, 3, "FD");

        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255); // White
        doc.setFont(undefined, "bold");
        doc.text("www.ByContractorsForContractors.com", 105, finalY4 + 34, {
          align: "center",
        });
        doc.setFont(undefined, "normal");
      }

      // Add footer
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139); // Medium color
      doc.text(
        "This report is based on industry research and your specific inputs. Individual results may vary.",
        105,
        280,
        { align: "center" }
      );
      doc.text(
        "© 2025 Contractor Trust Building System. All rights reserved.",
        105,
        285,
        {
          align: "center",
        }
      );
    }

    // Save the PDF
    const fileName = `Communication_Cost_Report_${dateString.replace(
      /\//g,
      "-"
    )}.pdf`;
    doc.save(fileName);
  }
});
