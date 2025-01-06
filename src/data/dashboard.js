
export const dashboardStaticData =
{
    welcome_message: {
        "title": "Hi Welcome! 👋",
        "desc": "Explore Happy Insights to effortlessly manage your channels using AI. It helps you analyze comments, likes, and feedback (positive or negative) while automating short replies for better engagement. Gain valuable insights to refine your content strategy and boost audience interaction."
    },
    card: [{
        "title": "Channel Management",
        "description": "Effortlessly manage video comments across your channels, including all positive and negative feedback.",
        "button_text": "Configure Now"
    }, {
        "title": "Comment Control Hub",
        "description": "Upgrade to effortlessly manage video comments, gain insights, and handle both positive and negative feedback.",
        "button_text": "Upgrade To Pro"
    },
    {
        "title": "AI Insghts: Video Enagement Analysis",
        "description": "Effortlessly manage video comments across your channels, including all positive and negative feedback.",
        "button_text": "Explore Now"
    },
    ]
}

const dashboardData = {
    "totalComments": 12635,
    "totalCommentsChange": "12%",
    "platforms": {
        "Facebook": {
            "comments": 2354,
            "change": "5%"
        },
        "YouTube": {
            "comments": 3276,
            "change": "21%"
        },
        "Instagram": {
            "comments": 1804,
            "change": "-3%"
        },
        "LinkedIn": {
            "comments": 2719,
            "change": "-1%"
        },
        "TikTok": {
            "comments": 2482,
            "change": "8%"
        }
    },
    "averageComments": {
        "days": [
            { "day": "Monday", "thisWeek": 800, "lastWeek": 800 },
            { "day": "Tuesday", "thisWeek": 1000, "lastWeek": 1000 },
            { "day": "Wednesday", "thisWeek": 1600, "lastWeek": 1600 },
            { "day": "Thursday", "thisWeek": 1800, "lastWeek": 1800 },
            { "day": "Friday", "thisWeek": 1200, "lastWeek": 1200 },
            { "day": "Saturday", "thisWeek": 1400, "lastWeek": 1400 },
            { "day": "Sunday", "thisWeek": 2000, "lastWeek": 2000 }
        ]
    },
    "sentimentAnalysis": {
        "averageSentiment": "77%",
        "sentiments": {
            "happyWords": 2559,
            "sadWords": 1471,
            "greetWords": 865,
            "neutral": 865,
            "angry": 865
        }
    },
    "sourceBreakdown": {
        "Facebook": 768,
        "YouTube": 640,
        "Instagram": 512,
        "LinkedIn": 384,
        "TikTok": 256
    }
}


export const dashboardBarChartData = {

    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'This Week',
                data: [1500, 1800, 2000, 2300, 1900, 1700, 2100],
                backgroundColor: 'rgba(54, 162, 235, 0.8)', // Adjust transparency for a cleaner look
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                barThickness: 25, // Wider bars
            },
            {
                label: 'Last Week',
                data: [1300, 1600, 1800, 2100, 1600, 1400, 1900],
                backgroundColor: 'rgba(255, 159, 64, 0.8)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
                barThickness: 25,
            },
        ],
    },

    options: {
        responsive: true,
        maintainAspectRatio: false, // Allows better resizing
        plugins: {
            legend: {
                display: true,
                position: 'bottom', // Position below the chart
                labels: {
                    boxWidth: 12, // Smaller legend boxes
                    font: {
                        size: 14,
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.raw}+`, // Add '+' to values
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Remove gridlines for x-axis
                },
                ticks: {
                    font: {
                        size: 14,
                    },
                    color: '#888', // Adjust label color
                },
            },
            y: {
                grid: {
                    borderDash: [8, 4], // Dashed gridlines
                },
                ticks: {
                    font: {
                        size: 14,
                    },
                    stepSize: 500, // Adjust steps
                    callback: (value) => `${value}+`, // Add '+' to axis values
                },
            },
        },
    },

}

export const dashboardDoughnutChartData = {
    "sentimentData": [
        {
            "emoji": "😊",
            "label": "Happy Words",
            "count": 1500 // 500 + 400 + 200 + 100 + 300
        },
        {
            "emoji": "😢",
            "label": "Sad Words",
            "count": 1500 // 100 + 200 + 400 + 500 + 300
        },
        {
            "emoji": "😊",
            "label": "Greets Words",
            "count": 495 // 50 + 75 + 120 + 150 + 100
        },
        {
            "emoji": "😐",
            "label": "Neutral",
            "count": 328 // 168 + 40 + 40 + 40 + 40
        },
        {
            "emoji": "😡",
            "label": "Angry",
            "count": 587 // 82 + 185 + 105 + 90 + 125
        }
    ],
    "sourcesData": [
        {
            "label": "Facebook",
            "counts": {
                "Happy Words": 500,
                "Sad Words": 100,
                "Greets Words": 50,
                "Neutral": 168,
                "Angry": 82
            },
            "color": "#4caf50"
        },
        {
            "label": "YouTube",
            "counts": {
                "Happy Words": 400,
                "Sad Words": 200,
                "Greets Words": 75,
                "Neutral": 40,
                "Angry": 185
            },
            "color": "#357a3a"
        },
        {
            "label": "Instagram",
            "counts": {
                "Happy Words": 200,
                "Sad Words": 400,
                "Greets Words": 120,
                "Neutral": 40,
                "Angry": 105
            },
            "color": "#82af4c"
        },
        {
            "label": "LinkedIn",
            "counts": {
                "Happy Words": 100,
                "Sad Words": 500,
                "Greets Words": 150,
                "Neutral": 40,
                "Angry": 90
            },
            "color": "#5a8723"
        },
        {
            "label": "TikTok",
            "counts": {
                "Happy Words": 300,
                "Sad Words": 300,
                "Greets Words": 100,
                "Neutral": 40,
                "Angry": 125
            },
            "color": "#47691f"
        }
    ]
};
