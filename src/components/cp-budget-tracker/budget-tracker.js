$(window).on("load", function() {
    $("#budget-slider").roundSlider({
        sliderType: "min-range",
        svgMode: true,
        startAngle: "90",
        lineCap: "round",
        pathColor: "#FCDACC",
        radius: 60,
        width: 11,
        readOnly: true,
        borderWidth: 0,
        tooltipFormat: function (args) {
            return `<div style="text-align: center;">
                        <span class="perc-value">${args.value}%</span>
                        <small class="perc-label">spend</small>
                    </div>`;
        },
        valueChange: function (e) {
            var color = e.isInvertedRange ? "#F16933" : "#F16933";
        
        $("#budget-slider").roundSlider({ "rangeColor": color, "tooltipColor": color });
        }
    });
    var sliderObj = $("#budget-slider").data("roundSlider");
    sliderObj.setValue(75);
});