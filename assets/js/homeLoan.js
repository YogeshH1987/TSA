var TSA = TSA || {};
TSA.HomeLoanCalculator = {
    formatCurrency: function (amount) {
        return amount.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR'
        });
    },

    init: function() {
        const loanAmountSlider = document.getElementById('loanAmountSlider');
        const interestRateSlider = document.getElementById('interestRateSlider');
        const loanTenureSlider = document.getElementById('loanTenureSlider');
        const pricingPlanSwitch = document.getElementById('pricing-plan-switch');

        // Initialize sliders
        noUiSlider.create(loanAmountSlider, {
            start: 500000,
            connect: [true, false],
            range: {
                'min': 100000,
                'max': 10000000
            },
            step: 10000,
            pips: {
                mode: 'positions',
                values: [0, 100], // Only show min and max
                density: 100,
                format: {
                    to: (value) => TSA.HomeLoanCalculator.formatCurrency(value) // Format values as currency
                }
            }
        });

        noUiSlider.create(interestRateSlider, {
            start: 5.0,
            connect: [true, false],
            range: {
                'min': 1,
                'max': 15
            },
            step: 0.1,
            pips: {
                mode: 'positions',
                values: [0, 100],
                density: 100,
                format: {
                    to: (value) => value.toFixed(1) + '% p.a' // Format values as percentage
                }
            }
        });

        noUiSlider.create(loanTenureSlider, {
            start: 10,
            connect: [true, false],
            range: {
                'min': 1,
                'max': 30
            },
            step: 1,
            pips: {
                mode: 'positions',
                values: [0, 100],
                density: 100,
                format: {
                    to: (value) => value + ' years'
                }
            }
        });

        // Handle pricing plan switch (monthly/yearly toggle)
        pricingPlanSwitch.addEventListener('change', () => {
            const isMonthly = pricingPlanSwitch.checked; // Assume checked = Monthly, unchecked = Yearly
            const loanTenureValue = $('#loanTenureValue');
            const currentValue = parseInt(loanTenureValue.val());

            if (isMonthly) {
                // Switch to monthly mode
                loanTenureSlider.noUiSlider.updateOptions({
                    range: {
                        'min': 12,  // Minimum tenure in months
                        'max': 360  // Maximum tenure in months
                    },
                    step: 1,
                    pips: {
                        mode: 'positions',
                        values: [0, 100],
                        density: 100,
                        format: {
                            to: (value) => value + ' months'
                        }
                    }
                });
                // Convert current value from years to months if applicable
                const newValue = currentValue * 12;
                loanTenureSlider.noUiSlider.set(newValue);
                loanTenureValue.val(newValue);
            } else {
                // Switch to yearly mode
                loanTenureSlider.noUiSlider.updateOptions({
                    range: {
                        'min': 1,  // Minimum tenure in years
                        'max': 30  // Maximum tenure in years
                    },
                    step: 1,
                    pips: {
                        mode: 'positions',
                        values: [0, 100],
                        density: 100,
                        format: {
                            to: (value) => value + ' years'
                        }
                    }
                });
                // Convert current value from months to years if applicable
                const newValue = Math.round(currentValue / 12);
                loanTenureSlider.noUiSlider.set(newValue);
                loanTenureValue.val(newValue);
            }

            // Recalculate and update results
            TSA.HomeLoanCalculator.calculateAndDisplayResults();
        });

        // Sliders event listeners
        loanAmountSlider.noUiSlider.on('update', (values) => {
            $('#loanAmountValue').val(TSA.HomeLoanCalculator.formatCurrency(parseInt(values[0])));
            this.calculateAndDisplayResults();
        });

        interestRateSlider.noUiSlider.on('update', (values) => {
            $('#interestRateValue').val(parseFloat(values[0]).toFixed(1));
            this.calculateAndDisplayResults();
        });

        loanTenureSlider.noUiSlider.on('update', (values) => {
            $('#loanTenureValue').val(parseInt(values[0]));
            this.calculateAndDisplayResults();
        });

        // Input event listeners to update sliders when the input fields change
        $('#loanAmountValue').on('input', (e) => {
            let value = e.target.value.trim(); // Trim the value to remove any extra spaces

            // Allow empty input (so you can clear the field)
            if (value === '') {
                loanAmountSlider.noUiSlider.set(null); // Reset the slider if the input is empty
                return;
            }

            value = value.replace(/[^\d]/g, ''); // Remove non-numeric characters for validation
            value = parseInt(value);
            const minValue = loanAmountSlider.noUiSlider.options.range.min;
            const maxValue = loanAmountSlider.noUiSlider.options.range.max;

            // Ensure the value is within the range
            if (value < minValue) {
                value = minValue;
            } else if (value > maxValue) {
                value = maxValue;
            }

            loanAmountSlider.noUiSlider.set(value);
            this.calculateAndDisplayResults();
        });

        $('#interestRateValue').on('input', (e) => {
            let value = e.target.value.trim();

            // Allow empty input (so you can clear the field)
            if (value === '') {
                interestRateSlider.noUiSlider.set(null); // Reset the slider if the input is empty
                return;
            }

            value = parseFloat(value);
            const minValue = interestRateSlider.noUiSlider.options.range.min;
            const maxValue = interestRateSlider.noUiSlider.options.range.max;

            // Ensure the value is within the range
            if (value < minValue) {
                value = minValue;
            } else if (value > maxValue) {
                value = maxValue;
            }

            interestRateSlider.noUiSlider.set(value);
            this.calculateAndDisplayResults();
        });

        $('#loanTenureValue').on('input', (e) => {
            let value = e.target.value.trim();

            // Allow empty input (so you can clear the field)
            if (value === '') {
                loanTenureSlider.noUiSlider.set(null); // Reset the slider if the input is empty
                return;
            }

            value = parseInt(value);
            const minValue = loanTenureSlider.noUiSlider.options.range.min;
            const maxValue = loanTenureSlider.noUiSlider.options.range.max;

            // Ensure the value is within the range
            if (value < minValue) {
                value = minValue;
            } else if (value > maxValue) {
                value = maxValue;
            }

            loanTenureSlider.noUiSlider.set(value);
            this.calculateAndDisplayResults();
        });

        this.calculateAndDisplayResults();
    },

    calculateAndDisplayResults: function() {
        const loanAmount = parseFloat($('#loanAmountValue').val().replace(/[^\d.-]/g, '')); // Remove non-numeric characters
        const annualInterestRate = parseFloat($('#interestRateValue').val());
        const loanTenure = parseInt($('#loanTenureValue').val());

        const monthlyInterestRate = annualInterestRate / 12 / 100;
        const numberOfMonths = loanTenure * 12;

        const emi = this.calculateEMI(loanAmount, monthlyInterestRate, numberOfMonths);
        const totalPayment = emi * numberOfMonths;
        const totalInterest = totalPayment - loanAmount;

        this.displayEMIOutput(emi, loanAmount, totalInterest, totalPayment);
        this.generateAmortizationSchedule(loanAmount, monthlyInterestRate, emi, loanTenure);
        this.updateDonutChart(totalPayment, totalInterest, loanAmount);
        this.updateLegends(totalPayment, totalInterest);
    },

    calculateEMI: function(loanAmount, monthlyInterestRate, numberOfMonths) {
        return (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
               (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);
    },

    displayEMIOutput: function(emi, loanAmount, totalInterest, totalPayment) {
        const emiFormatted = TSA.HomeLoanCalculator.formatCurrency(emi.toFixed(2));
        const loanAmountFormatted = TSA.HomeLoanCalculator.formatCurrency(loanAmount);
        const totalInterestFormatted = TSA.HomeLoanCalculator.formatCurrency(totalInterest);
        const totalPaymentFormatted = TSA.HomeLoanCalculator.formatCurrency(totalPayment);
    
        const emiOutputTemplate = Handlebars.compile($('#emi-output-template').html());
        const emiData = {
            emi: emiFormatted,
            principal: loanAmountFormatted,
            interest: totalInterestFormatted,
            totalPayment: totalPaymentFormatted
        };
    
        $('#emiOutput').html(emiOutputTemplate(emiData));
    },    

    generateAmortizationSchedule: function(loanAmount, monthlyInterestRate, emi, loanTenure) {
        let balance = loanAmount;
        const schedule = [];

        for (let year = 1; year <= loanTenure; year++) {
            let principalPaidYearly = 0;
            let interestPaidYearly = 0;

            for (let month = 1; month <= 12; month++) {
                const interestForMonth = balance * monthlyInterestRate;
                const principalForMonth = emi - interestForMonth;
                balance -= principalForMonth;

                principalPaidYearly += principalForMonth;
                interestPaidYearly += interestForMonth;

                if (balance < 0) balance = 0;
            }

            const totalPaymentYearly = principalPaidYearly + interestPaidYearly;

            schedule.push({
                year: year,
                principalPaid: TSA.HomeLoanCalculator.formatCurrency(principalPaidYearly),
                interestCharged: TSA.HomeLoanCalculator.formatCurrency(interestPaidYearly),
                totalPayment: TSA.HomeLoanCalculator.formatCurrency(totalPaymentYearly),
                balance: TSA.HomeLoanCalculator.formatCurrency(balance)
            });

            if (balance === 0) break;
        }

        const amortizationTemplate = Handlebars.compile($('#amortization-template').html());
        const html = amortizationTemplate({ schedule });
        $('#amortizationSchedule').replaceWith(html);
    },

    updateDonutChart: function(totalPayment, totalInterest, loanAmount) {
        d3.select('#donutChart svg').remove();
    
        const svg = d3.select('#donutChart').append('svg')
            .style('width', '100%')
            .style('height', 'auto')
            .attr('viewBox', '0 0 240 240')
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .append('g')
            .attr('transform', 'translate(120,120)');
    
        const radius = 120;
        const arc = d3.arc().outerRadius(radius).innerRadius(radius - 30);
        const pie = d3.pie().value(d => d.value);
    
        const data = [
            { label: 'Total Principal', value: loanAmount },
            { label: 'Total Interest', value: totalInterest }
        ];
    
        const color = d3.scaleOrdinal().range(['#FFD466', '#8BB2E9']);
    
        svg.selectAll('path')
            .data(pie(data))
            .enter().append('path')
            .attr('d', arc)
            .style('fill', d => color(d.data.label));
    
        // Update the label in the center with formatted currency
        const totalFormatted = TSA.HomeLoanCalculator.formatCurrency(totalPayment);
    
        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .attr('font-size', '18px')
            .attr('class', 'donut-chart-label')
            .text(totalFormatted);
    },
   
    updateLegends: function(totalPayment, totalInterest) {
        // Update legend labels with formatted currency values
        $('#principalLegend').text('₹' + TSA.HomeLoanCalculator.formatCurrency(totalPayment));
        $('#interestLegend').text('₹' + TSA.HomeLoanCalculator.formatCurrency(totalInterest));
    }
};

$(document).ready(function() {
    TSA.HomeLoanCalculator.init();
    $('#wrapper').hide();
    $('#toggleTableBtn').click(function() {
        $('#wrapper').toggle();
    });
});
