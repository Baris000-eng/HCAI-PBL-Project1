document.addEventListener("DOMContentLoaded", function () {
    
    // Grab data cleanly from the HTML hidden script blocks
    const gridLabels = JSON.parse(document.getElementById('pdp-labels').textContent);
    const pdpData = JSON.parse(document.getElementById('pdp-data').textContent);
    const binCenters = JSON.parse(document.getElementById('ale-labels').textContent);
    const aleData = JSON.parse(document.getElementById('ale-data').textContent);

    // Dynamically retrieve the selected feature name from the dropdown to use as the X-axis label
    const featureSelect = document.querySelector('select[name="features"]');
    const activeFeatureLabel = featureSelect.value;

    // Color palette map for Palmer Penguins species
    const colors = { 
        'Adelie': '#04f7a6', 
        'Chinstrap': '#0a62ef', 
        'Gentoo': '#ca9130' 
    };

    // --- 1. Generate PDP Graph ---
    new Chart(document.getElementById('pdpChart'), {
        type: 'line',
        data: {
            labels: gridLabels,
            datasets: Object.keys(pdpData).map(species => ({
                label: species,
                data: pdpData[species],
                borderColor: colors[species] || '#cbd5e0',
                backgroundColor: colors[species] || '#cbd5e0',
                tension: 0.1,
                fill: false
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, 
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: `${activeFeatureLabel} (Grid Values)`,
                        font: { size: 13, weight: 'bold' },
                        color: '#4a5568'
                    },
                    grid: { color: '#edf2f7' }
                },
                y: { 
                    title: { 
                        display: true, 
                        text: 'Marginal Output Probability',
                        font: { size: 13, weight: 'bold' },
                        color: '#4a5568'
                    },
                    grid: { color: '#edf2f7' }
                }
            }
        }
    });

    // --- 2. Generate ALE Graph ---
    new Chart(document.getElementById('aleChart'), {
        type: 'line',
        data: {
            labels: binCenters,
            datasets: Object.keys(aleData).map(species => ({
                label: species,
                data: aleData[species],
                borderColor: colors[species] || '#cbd5e0',
                backgroundColor: colors[species] || '#cbd5e0',
                tension: 0.1,
                fill: false
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, 
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: `${activeFeatureLabel} (Bin Quantile Centers)`,
                        font: { size: 13, weight: 'bold' },
                        color: '#4a5568'
                    },
                    grid: { color: '#edf2f7' }
                },
                y: { 
                    title: { 
                        display: true, 
                        text: 'Centered Local Differences in Model Output',
                        font: { size: 13, weight: 'bold' },
                        color: '#4a5568'
                    },
                    grid: { color: '#edf2f7' }
                }
            }
        }
    });
});


function toggleLrOptions() {
    const modelType = document.getElementById('model_type').value;
    const penaltySelect = document.getElementById('penalty');
    const solverSelect = document.getElementById('solver');
    const lrContainer = document.getElementById('lr-options');
    
    if (modelType === 'dtrc') {
        // Make the dropdowns unclickable 
        penaltySelect.disabled = true;
        solverSelect.disabled = true;
        
        lrContainer.style.opacity = '0.4';
    } else {
        penaltySelect.disabled = false;
        solverSelect.disabled = false;
        lrContainer.style.opacity = '1';
    }
}

function toggleSolverOptions() {
    const penaltySelect = document.getElementById('penalty');
    const solverSelect = document.getElementById('solver');

    const lbfgsOption = document.getElementById('lbfgs');
    const l1Option = document.querySelector('#penalty option[value="l1"]');

    if (penaltySelect.value === 'l1') {
        lbfgsOption.disabled = true;
    } else {
        lbfgsOption.disabled = false;
    }

    if (solverSelect.value === 'lbfgs') {
        l1Option.disabled = true;
    } else {
        l1Option.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', toggleLrOptions);
document.addEventListener('DOMContentLoaded', toggleSolverOptions);

