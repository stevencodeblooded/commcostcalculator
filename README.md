# Contractor Communication Cost Calculator

A professional, interactive calculator that helps contractors estimate how much poor communication is costing their business annually.

## Features

- **Multi-step form** with smooth navigation
- **Interactive inputs** with sliders and dropdowns
- **Real-time calculations** with animated results display
- **Visual cost breakdown** with interactive charts
- **Responsive design** for all device sizes
- **Professional animations** for enhanced user experience
- **Data persistence** with local storage
- **Clear call-to-action** for the Contractor Trust Building System

## Project Structure

```
contractor-calculator/
├── css/
│   ├── styles.css          # Main styles
│   └── animations.css      # Animation styles
├── js/
│   ├── calculator.js       # Core calculation logic
│   ├── ui-handlers.js      # UI interaction handlers
│   └── chart.js            # Chart visualization logic
├── index.html              # Main HTML file
└── README.md               # This documentation
```

## Implementation Details

### Core Calculation Logic

The calculator uses the following formulas to estimate costs:

1. **Payment Delay Cost**
   - `(Average project value × (Payment delay days ÷ 365) × 0.07) × Number of projects`

2. **Dispute Resolution Cost**
   - `(Disputes per 10 projects ÷ 10) × Number of projects × $3,400`

3. **Time Waste Cost**
   - `Weekly hours spent × 50 weeks × $85 per hour`

4. **Lost Opportunity Cost**
   - `Number of projects × (Disputes per 10 projects × 0.3 ÷ 10) × Average project value × 0.15`

5. **Hidden Stress Cost**
   - `(Payment delay cost + Dispute resolution cost) × 0.25`

### User Experience Enhancements

- **Progressive disclosure** - Step-by-step form with clear navigation
- **Visual feedback** - Animations, color coding, and interactive elements
- **Data validation** - Input constraints to ensure realistic calculations
- **Responsive design** - Optimized for all screen sizes
- **Performance optimizations** - Efficient code with minimal dependencies

## Usage

1. Open `index.html` in a web browser
2. Enter your business information in Step 1
3. Enter your current process details in Step 2
4. Click "Calculate My Costs" to see your results
5. Explore the breakdown and potential savings
6. Click the call-to-action button to apply for the Contractor Trust Building System

## Customization

The calculator can be easily customized:

- **Color scheme** - Edit the CSS variables in `styles.css`
- **Default values** - Modify constants in `calculator.js`
- **Text content** - Update the copy in `index.html`
- **Chart appearance** - Adjust settings in `chart.js`

## Dependencies

- [Chart.js](https://www.chartjs.org/) (3.9.1) - For chart visualizations
- [Font Awesome](https://fontawesome.com/) (6.4.0) - For icons

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+
- Opera 67+

## License

© 2025 Contractor Trust Building System. All rights reserved.

---

Created by otieno_develops.