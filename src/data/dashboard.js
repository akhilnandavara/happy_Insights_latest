
const dashboardStaticData =
{
    "welcome_message": {
        "title": "Hi Welcome! 👋",
        "description": "Explore Happy Insights to effortlessly manage your channels using AI. It helps you analyze comments, likes, and feedback (positive or negative) while automating short replies for better engagement. Gain valuable insights to refine your content strategy and boost audience interaction."
    },
    "card": [{
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
        labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'This Week',
                data: [1500, 1800, 2000, 2300, 1900, 1700, 2100],
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                barThickness: 15,
            },
            {
                label: 'Last Week',
                data: [1300, 1600, 1800, 2100, 1600, 1400, 1900],
                backgroundColor: 'rgba(255, 159, 64, 0.7)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
                barThickness: 15,
            },
        ],
    },

    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 400,
                },
            },
        },
    },
}