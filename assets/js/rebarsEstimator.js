var TSA = TSA || {};
TSA.RebarsCalculator = {
    init: function() {
        // const loanAmountSlider = document.getElementById('loanAmountSlider');
        // const interestRateSlider = document.getElementById('interestRateSlider');
        // const loanTenureSlider = document.getElementById('loanTenureSlider');
        // const pricingPlanSwitch = document.getElementById('pricing-plan-switch');

        // // Initialize sliders
        // noUiSlider.create(loanAmountSlider, {
        //     start: 500000,
        //     connect: [true, false],
        //     range: {
        //         'min': 100000,
        //         'max': 10000000
        //     },
        //     step: 10000,
        //     pips: {
        //         mode: 'positions',
        //         values: [0, 100], // Only show min and max
        //         density: 100,
        //         format: {
        //             to: (value) => '₹' + value.toLocaleString() // Format values as currency
        //         }
        //     }
        // });

        // noUiSlider.create(interestRateSlider, {
        //     start: 5.0,
        //     connect: [true, false],
        //     range: {
        //         'min': 1,
        //         'max': 15
        //     },
        //     step: 0.1,
        //     pips: {
        //         mode: 'positions',
        //         values: [0, 100],
        //         density: 100,
        //         format: {
        //             to: (value) => value.toFixed(1) + '% p.a' // Format values as percentage
        //         }
        //     }
        // });

        // noUiSlider.create(loanTenureSlider, {
        //     start: 10,
        //     connect: [true, false],
        //     range: {
        //         'min': 1,
        //         'max': 30
        //     },
        //     step: 1,
        //     pips: {
        //         mode: 'positions',
        //         values: [0, 100],
        //         density: 100,
        //         format: {
        //             to: (value) => value + ' years'
        //         }
        //     }
        // });    

    }
};

$(document).ready(function() {
    TSA.RebarsCalculator.init();
});
