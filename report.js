function generateReport() {
    const reportContent = document.getElementById('report-content');
    const passPercentageElement = document.getElementById('pass-percentage');

    let totalChecks = 0;  // Total checks attempted
    let totalPassed = 0;  // Total checks passed (answered "yes")

    // Define all categories you want to track (ensure these match your localStorage keys)
    const categories = {
        "EXTERIOR": [
            'windscreen', 'mirrors', 'car-body-condition', 'exhaust', 
            'underbody', 'trim-mouldings', 'number-plates'
        ],
        "TYRES": [
            'flat-tyres', 'fog-lights', 'foreign-objects', 'headlights', 
            'indicator-lights', 'license-plate-lights', 'power-steering-fluid-level', 
            'reverse-lights', 'side-marker-lights', 'tail-lights', 'tread-depth', 
            'tyre-age', 'tyre-pressure', 'tyre-valve-condition', 'tyre-wear-pattern'
        ],
        "INTERIOR": [
            'visible-damage', 'washer-fluid-level', 'window-operation', 'steering-tilt-adjustment',
            'mirror-adjustment', 'air-conditioning-heating', 'door-locks', 'interior-lights', 
            'seatbelt', 'horn', 'wipers', 'dashboard-warning-lights'
        ],
        "FLUIDS": [
            'engine-oil-level', 'coolant-level', 'brake-fluid-level', 
            'washer-fluid-level', 'power-steering-fluid-level'
        ],
        "LIGHTS": [
            'brake-lights', 'drl', 'headlights', 'indicator-lights', 'license-plate-lights', 
            'reverse-lights', 'side-marker-lights', 'tail-lights'
        ]
    };
    

    // Store failed checks for each category
    const failedChecks = {};

    // Loop through each category and check localStorage for answers
    for (let category in categories) {
        categories[category].forEach(item => {
            const answer = localStorage.getItem(`${item}_answer`);  // Fetch the correct localStorage key

            if (answer) {
                totalChecks++; // Increment total checks
                if (answer === 'no') {
                    // If failed (No), add it to the failed checks list for the category
                    if (!failedChecks[category]) {
                        failedChecks[category] = [];
                    }
                    failedChecks[category].push(`${item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' ')}`); // Add failed check name
                } else if (answer === 'yes') {
                    totalPassed++; // Increment passed count for 'yes' answers
                }
            }
        });
    }

    // Display failed categories and checks in a structured way
    let reportHTML = '';
    let hasFailedCategories = false;

    // Loop through failed checks and display them
    for (let category in failedChecks) {
        if (failedChecks[category].length > 0) {
            hasFailedCategories = true;
            reportHTML += `<div class="category-failed">FAILED CATEGORY: ${category}</div>`;
            reportHTML += `<ul class="failed-checks">`;

            failedChecks[category].forEach(check => {
                reportHTML += `<li>Check Failed: ${check}</li>`;
            });

            reportHTML += `</ul>`;
        }
    }

    // If there are no failed categories, display a success message
    if (!hasFailedCategories) {
        reportHTML += '<h3>All checks passed successfully!</h3>';
    }

    // Calculate pass percentage correctly
    const passPercentage = totalChecks ? ((totalPassed / totalChecks) * 100).toFixed(2) : 100;
    passPercentageElement.textContent = `Pass Percentage: ${passPercentage}%`;

    // Set the report content in the HTML
    reportContent.innerHTML = reportHTML;
}

// Call the function to generate the report when the page is loaded
window.addEventListener('DOMContentLoaded', generateReport);
