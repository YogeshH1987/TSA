$(window).on("load", function() {
    let steps = $('#profilSlider').attr('data-steps');
    let completedSteps = $('#profilSlider').attr('data-completed-steps');
    console.log()
    $("#profilSlider").roundSlider({
        sliderType: "min-range",
        svgMode: true,
        startAngle: "90",
        lineCap: "round",
        pathColor: "#F3F4F6",
        radius: 16,
        width: 4,
        readOnly: true,
        borderWidth: 0,
        showTooltip: false,
        valueChange: function (e) {
            var color = e.isInvertedRange ? "#D2042D" : "#D2042D";
        
        $("#profilSlider").roundSlider({ "rangeColor": color, "tooltipColor": color });
        }
    });
    let sliderObj = $("#profilSlider").data("roundSlider");
    let progress = (100/steps) * completedSteps;
    sliderObj.setValue(progress);
});