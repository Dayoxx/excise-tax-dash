const chartTooltipTitleCallback = {
    plugins: {
        tooltip: {
            callbacks: {
                title: function(tooltipItems) {
                    const item = tooltipItems[0];
                    let label = item.chart.data.labels[item.dataIndex];
                    if (Array.isArray(label)) {
                        return label.join(' ');
                    }
                    return label;
                }
            }
        }
    }
};

const brilliantBlues = ['#0079FF', '#52A5FF', '#004AAD', '#BDEFFF'];
const brilliantBluesBg = ['rgba(0, 121, 255, 0.7)', 'rgba(82, 165, 255, 0.7)', 'rgba(0, 74, 173, 0.7)', 'rgba(189, 239, 255, 0.7)'];

function wrapLabel(str, maxWidth) {
    if (str.length <= maxWidth) return str;
    const words = str.split(' ');
    let lines = [];
    let currentLine = '';
    for (const word of words) {
        if ((currentLine + word).length > maxWidth) {
            lines.push(currentLine.trim());
            currentLine = '';
        }
        currentLine += word + ' ';
    }
    lines.push(currentLine.trim());
    return lines.filter(line => line.length > 0);
}

// === CHARTS ===

new Chart(document.getElementById('tobaccoBurdenChart'), {
    type: 'doughnut',
    data: {
        labels: ['Nigeria\'s Tax Burden (44%)', 'Gap to WHO Rec. (31%)'],
        datasets: [{
            label: 'Tax Burden',
            data: [44, 31],
            backgroundColor: [brilliantBlues[0], brilliantBlues[3]],
            borderColor: '#ffffff',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            ...chartTooltipTitleCallback.plugins,
            legend: { position: 'bottom' },
            title: { display: false }
        }
    }
});

new Chart(document.getElementById('tobaccoRateChart'), {
    type: 'line',
    data: {
        labels: ['2018', '2019', '2020', '2022', '2024'],
        datasets: [{
            label: 'Specific Tax per Pack (NGN)',
            data: [20, 40, 58, 84, 84],
            fill: true,
            borderColor: brilliantBlues[0],
            backgroundColor: brilliantBluesBg[1],
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        ...chartTooltipTitleCallback,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false } }
    }
});

new Chart(document.getElementById('alcoholRateChart'), {
    type: 'bar',
    data: {
        labels: ['Beer', 'Wines', 'Spirits'],
        datasets: [
            {
                label: '2018 Rate (NGN/Litre)',
                data: [30, 125, 150],
                backgroundColor: brilliantBluesBg[1],
                borderColor: brilliantBlues[1],
                borderWidth: 1
            },
            {
                label: '2024 Rate (NGN/Litre)',
                data: [100, 100, 150],
                backgroundColor: brilliantBluesBg[0],
                borderColor: brilliantBlues[0],
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        ...chartTooltipTitleCallback,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { position: 'top' } }
    }
});

new Chart(document.getElementById('ssbImpactChart'), {
    type: 'bar',
    data: {
        labels: ['Actual Price Impact', 'WHO Recommended Impact'],
        datasets: [{
            label: 'Price Increase %',
            data: [5, 20],
            backgroundColor: [brilliantBluesBg[1], brilliantBluesBg[0]],
            borderColor: [brilliantBlues[1], brilliantBlues[0]],
            borderWidth: 1
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        ...chartTooltipTitleCallback,
        scales: { x: { beginAtZero: true } },
        plugins: { legend: { display: false } }
    }
});

new Chart(document.getElementById('ssbRevenueChart'), {
    type: 'bar',
    data: {
        labels: [wrapLabel('Current Tax (N10/Litre)', 16), wrapLabel('Proposed Tax (N130/Litre)', 16)],
        datasets: [{
            label: 'Annual Revenue Potential (NGN Billions)',
            data: [20, 729],
            backgroundColor: [brilliantBluesBg[1], brilliantBluesBg[0]],
            borderColor: [brilliantBlues[1], brilliantBlues[0]],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        ...chartTooltipTitleCallback,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false } }
    }
});
