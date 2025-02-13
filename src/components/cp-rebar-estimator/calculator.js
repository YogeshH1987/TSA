document.addEventListener("DOMContentLoaded", function () {
  // Your data
  const data = {
    "estimateBuildingCost": {
      "totalAmount": 6000000,
      "estimateBuildingCostItems": [
        {
          "title": "Material",
          "price": 1500000,
          "icon": "orange icon-exterior-construction"
        },
        {
          "title": "Labour",
          "price": 1050000,
          "icon": "blue icon-tool"
        },
        {
          "title": "Others",
          "price": 3000000,
          "icon": "green icon-home"
        }
      ],
      "estimatedDays": {
        "estimatedTimeTitle": "Estimated time",
        "estimatedTimeValue": "240 days",
        "link": {
          "text": "Plan my project",
          "url": "https://github.com/"
        }
      }
    },
    "costBreakup": {
      "costBreakdown": [
        {
          "economy": {
            "levels": [
              {
                "title": "eco Land preparation & approvals",
                "price": 220000,
                "items": [
                  {
                    "categoryTitle": "Land clearance & levelling",
                    "categoryDescription": "1848 cubic ft @ ₹12 per ft",
                    "categoryAmount": 220000,
                    "details": [
                      {
                        "productName": "Cement",
                        "productDescription": "400 bags @ ₹400 per bag",
                        "productAmount": 160000
                      },
                      {
                        "productName": "Cement2",
                        "productDescription": "400 bags @ ₹400 per bag",
                        "productAmount": 160000
                      }
                    ]
                  },

                  {
                    "categoryTitle": "Land clearance & levelling2",
                    "categoryDescription": "1848 cubic ft @ ₹12 per ft",
                    "categoryAmount": 220000,
                    "details": [
                      {
                        "productName": "Cement",
                        "productDescription": "400 bags @ ₹400 per bag",
                        "productAmount": 160000
                      },
                      {
                        "productName": "Cement2",
                        "productDescription": "400 bags @ ₹400 per bag",
                        "productAmount": 160000
                      }
                    ]
                  }
                ]
              },
              {
                "title": "eco Foundation Work",
                "price": 180000,
                "items": [
                  {
                    "categoryTitle": "Foundation Work",
                    "categoryDescription": "Concrete mix and reinforcement",
                    "categoryAmount": 180000,
                    "details": [
                      {
                        "productName": "Rebar",
                        "productDescription": "100 rods @ ₹500 per rod",
                        "productAmount": 50000
                      },
                      {
                        "productName": "Concrete Mix",
                        "productDescription": "50 bags @ ₹800 per bag",
                        "productAmount": 40000
                      }
                    ]
                  }
                ]
              }
            ]
          },
          "standard": {
            "levels": [
              {
                "title": "standard Land preparation & approvals",
                "price": 220000,
                "items": [
                  {
                    "categoryTitle": "Land preparation & approvals",
                    "categoryDescription": "1848 cubic ft @ ₹12 per ft",
                    "categoryAmount": 220000,
                    "details": [
                      {
                        "productName": "Cement",
                        "productDescription": "400 bags @ ₹400 per bag",
                        "productAmount": 160000
                      }
                    ]
                  }
                ]
              },
              {
                "title": "standard Foundation Work",
                "price": 180000,
                "items": [
                  {
                    "categoryTitle": "Foundation Work",
                    "categoryDescription": "Concrete mix and reinforcement",
                    "categoryAmount": 180000,
                    "details": [
                      {
                        "productName": "Rebar",
                        "productDescription": "100 rods @ ₹500 per rod",
                        "productAmount": 50000
                      },
                      {
                        "productName": "Concrete Mix",
                        "productDescription": "50 bags @ ₹800 per bag",
                        "productAmount": 40000
                      }
                    ]
                  }
                ]
              }
            ]
          },
          "premium": {
            "levels": [
              {
                "title": "premium Land preparation & approvals",
                "price": 220000,
                "items": [
                  {
                    "categoryTitle": "Land preparation & approvals",
                    "categoryDescription": "1848 cubic ft @ ₹12 per ft",
                    "categoryAmount": 220000,
                    "details": [
                      {
                        "productName": "Cement",
                        "productDescription": "400 bags @ ₹400 per bag",
                        "productAmount": 160000
                      }
                    ]
                  }
                ]
              },
              {
                "title": "premium Foundation Work",
                "price": 180000,
                "items": [
                  {
                    "categoryTitle": "Foundation Work",
                    "categoryDescription": "Concrete mix and reinforcement",
                    "categoryAmount": 180000,
                    "details": [
                      {
                        "productName": "Rebar",
                        "productDescription": "100 rods @ ₹500 per rod",
                        "productAmount": 50000
                      },
                      {
                        "productName": "Concrete Mix",
                        "productDescription": "50 bags @ ₹800 per bag",
                        "productAmount": 40000
                      }
                    ]
                  }
                ]
              }
            ]
          },
        }
      ]
    }
  }
  

  // Preprocess costItems data to split the icon into color and class
  data.estimateBuildingCost.estimateBuildingCostItems.forEach(item => {
      const [iconColor, iconClass] = item.icon.split(' ');
      item.iconColor = iconColor;
      item.iconClass = iconClass;
      item.formattedPrice = item.price.toLocaleString();
  });

  // Compile Handlebars template for cost list
  const costListTemplateEl = document.getElementById("cost-list-template");
  if (costListTemplateEl) {
      const costListTemplate = Handlebars.compile(costListTemplateEl.innerHTML);
      document.getElementById("costList").innerHTML = costListTemplate(data.estimateBuildingCost);
  } else {
      console.error("Cost list template missing!");
  }

  // Insert the totalAmount dynamically
  const totalAmountEl = document.querySelector('#totalAmount');
  if (totalAmountEl) {
      totalAmountEl.innerText = data.estimateBuildingCost.totalAmount.toLocaleString();
  }

  // Insert estimated time & project link
  const estimateTimeEl = document.querySelector('.estimate-time-wrap #estimateTime');
  if (estimateTimeEl) {
      estimateTimeEl.innerHTML = `<span class="typ-small">${data.estimateBuildingCost.estimatedDays.estimatedTimeTitle}</span> ${data.estimateBuildingCost.estimatedDays.estimatedTimeValue}`;
  }

  const projectLinkEl = document.querySelector('.estimate-time-wrap #projectLink');
  if (projectLinkEl) {
      projectLinkEl.innerText = data.estimateBuildingCost.estimatedDays.link.text;
      projectLinkEl.setAttribute('href', data.estimateBuildingCost.estimatedDays.link.url);
  }

  // Function to render cost breakup details
  function renderCostBreakup(category) {
      const templateElement = document.getElementById("cost-breakup-template");
      const targetElement = document.getElementById("tab2");

      // Check if template and target exist
      if (!templateElement || !targetElement) {
          console.error("Template or target element missing!");
          return;
      }

      const costBreakupTemplate = templateElement.innerHTML;
      const compiledTemplate = Handlebars.compile(costBreakupTemplate);

      // Ensure category exists in data
      const costBreakdown = data.costBreakup.costBreakdown[0];
      if (!costBreakdown[category]) {
          console.error(`Category "${category}" not found in costBreakup data!`);
          return;
      }

      const selectedBreakup = costBreakdown[category];
      const html = compiledTemplate(selectedBreakup);

      // Ensure wrapper exists before updating
      const wrapper = targetElement.querySelector(".wrapper");
      if (!wrapper) {
          console.error("Wrapper inside #tab2 is missing!");
          return;
      }

      wrapper.innerHTML = html;
  }

  // Initial load of cost breakup
  renderCostBreakup("economy");

  // Tab switching logic
  const tabItems = document.querySelectorAll(".tab-list .tab-item");
  tabItems.forEach(tab => {
      tab.addEventListener("click", function (event) {
          event.preventDefault();

          // Remove active class from all tabs
          tabItems.forEach(item => item.classList.remove("active"));
          this.classList.add("active");

          const category = this.textContent.trim().toLowerCase();
          renderCostBreakup(category);
      });
  });
});
