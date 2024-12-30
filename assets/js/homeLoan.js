var TSA = TSA || {};
TSA.HomeLoanCalculator = {
    init: function() {
        const loanAmountSlider = document.getElementById('loanAmountSlider');
        const interestRateSlider = document.getElementById('interestRateSlider');
        const loanTenureSlider = document.getElementById('loanTenureSlider');

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
                density: 100, // This ensures only the start and end values are displayed
                format: {
                    to: (value) => '₹' + value.toLocaleString() // Format values as currency
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
                values: [0, 100], // Only show min and max
                density: 100, // This ensures only the start and end values are displayed
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
                values: [0, 100], // Only show min and max
                density: 100, // This ensures only the start and end values are displayed
                format: {
                    to: (value) => value + ' years' // Format values as years
                }
            }
        });

        loanAmountSlider.noUiSlider.on('update', (values) => {
            $('#loanAmountValue').val(parseInt(values[0]));
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

        this.calculateAndDisplayResults();
    },

    calculateAndDisplayResults: function() {
        const loanAmount = parseFloat($('#loanAmountValue').val());
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
        const emiOutputTemplate = Handlebars.compile($('#emi-output-template').html());
        const emiData = {
            emi: emi.toFixed(2),
            principal: loanAmount.toFixed(2),
            interest: totalInterest.toFixed(2),
            totalPayment: totalPayment.toFixed(2)
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
                principalPaid: principalPaidYearly.toFixed(2),
                interestCharged: interestPaidYearly.toFixed(2),
                totalPayment: totalPaymentYearly.toFixed(2),
                balance: balance.toFixed(2)
            });

            if (balance === 0) break;
        }

        const amortizationTemplate = Handlebars.compile($('#amortization-template').html());
        const html = amortizationTemplate({ schedule });
        $('#amortizationSchedule').replaceWith(html);
    },

    updateDonutChart: function(totalPayment, totalInterest, loanAmount) {
        const svg = d3.select('#donutChart').html('').append('svg')
            .attr('width', 300)
            .attr('height', 300)
            .append('g')
            .attr('transform', 'translate(150,150)');

        const radius = 120;
        const arc = d3.arc().outerRadius(radius).innerRadius(radius - 30);
        const pie = d3.pie().value(d => d.value);

        const data = [
            { label: 'Total Principal', value: loanAmount },
            { label: 'Total Interest', value: totalInterest }
        ];

        const color = d3.scaleOrdinal().range(['#FFD466','#8BB2E9']);

        const path = svg.selectAll('path')
            .data(pie(data))
            .enter().append('path')
            .attr('d', arc)
            .attr('fill', d => color(d.data.label));

        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '18px')
            .attr('dy', '.35em')
            .text(`₹${totalPayment.toFixed(2)}`);
    },

    updateLegends: function(totalPayment, totalInterest) {
        const legendTemplate = Handlebars.compile($('#legend-template').html());
        const legendHtml = legendTemplate({
            totalPrincipal: (totalPayment-totalInterest).toFixed(2),
            totalInterest: totalInterest.toFixed(2)
        });
        $('.legend').html(legendHtml);
    }
};

$(document).ready(function() {
    TSA.HomeLoanCalculator.init();
    $('#wrapper').hide();
    $('#toggleTableBtn').click(function() {
        $('#wrapper').toggle();
    });
});
