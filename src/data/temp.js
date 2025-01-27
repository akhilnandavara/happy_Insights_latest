
export const dashboardStaticData = {
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

export const FilterBarData = {
    filterMethods: {
        "All Channels": null,
        "YouTube": null,
        "Facebook": null,
        "Instagram": null,
        "LinkedIn": null,
        "TikTok": null,
    },

}

export const statsOverViewData = {
    platforms: [
        {
            name: "Total Comments",
            comments: 12635,
            change: "12",
            changeType: "up"
        },
        {
            name: "Facebook",
            comments: 2354,
            change: "5",
            changeType: "down"
        },
        {
            name: "YouTube",
            comments: 3276,
            change: "21",
            changeType: "up"
        },
        {
            name: "Instagram",
            comments: 1804,
            change: "3",
            changeType: "down"
        },
        {
            name: "LinkedIn",
            comments: 2719,
            change: "1",
            changeType: "down"
        },
        {
            name: "TikTok",
            comments: 2482,
            change: "8",
            changeType: "up"
        },
    ],
    averageComments: [
        {
            day: "Monday",
            thisWeek: 800,
            lastWeek: 800,
        },
        {
            day: "Tuesday",
            thisWeek: 1000,
            lastWeek: 1000,
        },
        {
            day: "Wednesday",
            thisWeek: 1600,
            lastWeek: 1600,
        },
        {
            day: "Thursday",
            thisWeek: 1800,
            lastWeek: 1800,
        },
        {
            day: "Friday",
            thisWeek: 1200,
            lastWeek: 1200,
        },
        {
            day: "Saturday",
            thisWeek: 1400,
            lastWeek: 1400,
        },
        {
            day: "Sunday",
            thisWeek: 2000,
            lastWeek: 2000,
        },
    ],
    sentimentAnalysis: {
        averageSentiment: "77%",
        sentiments: [
            { type: "happyWords", count: 2559 },
            { type: "sadWords", count: 1471 },
            { type: "greetWords", count: 865 },
            { type: "neutral", count: 865 },
            { type: "angry", count: 865 },
        ],
    },
    sourceBreakdown: [
        { platform: "Facebook", value: 768 },
        { platform: "YouTube", value: 640 },
        { platform: "Instagram", value: 512 },
        { platform: "LinkedIn", value: 384 },
        { platform: "TikTok", value: 256 },
    ],
};


export const dashboardBarChartData = {
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'This Week',
                data: [1500, 1800, 2000, 2300, 1900, 1700, 2100],
                backgroundColor: 'rgba(47, 128, 237, 1)', // Blue
                borderColor: 'rgba(47, 128, 237, 1)',
                borderWidth: 1,
                barThickness: 25,
            },
            {
                label: 'Last Week',
                data: [1300, 1600, 1800, 2100, 1600, 1400, 1900],
                backgroundColor: 'rgba(242, 153, 74, 1)', // Orange
                borderColor: 'rgba(242, 153, 74, 1)',
                borderWidth: 1,
                barThickness: 25,
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',

                labels: {
                    usePointStyle: true, // Use circular points instead of squares
                    pointStyle: 'circle', // Set the style explicitly to 'circle'
                    font: {
                        size: 10, // Adjust font size
                    },
                    boxWidth: 10, // Smaller circle size
                    boxHeight: 5, // Optional: Ensure proportional circle height (if needed)
                    padding: 20, // Adds space between the circle and the label
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.raw}+`,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Hides the horizontal line on the x-axis
                },
                ticks: {
                    font: {
                        family: 'Poppins',
                        size: 10,
                    },
                    color: '#9CA3AF',
                },
            },
            y: {
                border: {
                    dash: [2, 4],
                    display: false,
                },
                ticks: {
                    font: {
                        family: 'Poppins',
                        size: 10,
                    },
                    color: '#9CA3AF', // Slightly darker label color
                    stepSize: 500,
                    callback: (value) => `${value}`,
                },
            },
        },
    },
};


export const dashboardDoughnutChartData = {
    sentimentData: [
        {
            emoji: "😊",
            label: "Happy Words",
            count: 2559, // Total of all sources
            colors: ["#4caf50", "#66bb6a", "#81c784", "#a5d6a7", "#c8e6c9"], // Green shades
        },
        {
            emoji: "😢",
            label: "Sad Words",
            count: 1471,
            colors: ["#1E88E5", "#42A5F5", "#64B5F6", "#90CAF9", "#BBDEFB"], // Blue shades
        },
        {
            emoji: "🤝",
            label: "Greets Words",
            count: 865,
            colors: ["#FFC107", "#FFD54F", "#FFEB3B", "#FFF176", "#FFF59D"], // Yellow shades
        },
        {
            emoji: "😐",
            label: "Neutral",
            count: 865,
            colors: ["#9E9E9E", "#BDBDBD", "#E0E0E0", "#EEEEEE", "#F5F5F5"],// Grey shades
        },
        {
            emoji: "😡",
            label: "Angry Words",
            count: 865,
            colors: ["#E53935", "#EF5350", "#F44336", "#E57373", "#FFCDD2"], // Red shades
        },
    ],
    sourcesData: [
        {
            label: "Facebook",
            counts: {
                "Happy Words": 768,
                "Sad Words": 441,
                "Greets Words": 50,
                "Neutral": 168,
                "Angry Words": 82,
            },
        },
        {
            label: "YouTube",
            counts: {
                "Happy Words": 640,
                "Sad Words": 368,
                "Greets Words": 75,
                "Neutral": 40,
                "Angry Words": 185,
            },
        },
        {
            label: "Instagram",
            counts: {
                "Happy Words": 512,
                "Sad Words": 294,
                "Greets Words": 120,
                "Neutral": 40,
                "Angry Words": 105,
            },
        },
        {
            label: "LinkedIn",
            counts: {
                "Happy Words": 384,
                "Sad Words": 221,
                "Greets Words": 150,
                "Neutral": 40,
                "Angry Words": 90,
            },
        },
        {
            label: "TikTok",
            counts: {
                "Happy Words": 256,
                "Sad Words": 147,
                "Greets Words": 100,
                "Neutral": 40,
                "Angry Words": 125,
            },
        },
    ],
};


export const notificationsData = [
    {
        "id": 1,
        "title": "Company Announcement",
        "subText": "Replied to xyz in Company Announcements",
        "description": "New policies and code of conduct have been updated and published in Company Rules.",
        "time": "Today at 2:20 PM",
        "bodyImage": null,
        "mentioned": false,
        "archived": false
    },
    {
        "id": 2,
        "title": "Mark Jaycob",
        "subText": "Commented in Company Announcements",
        "description": "Replied to @Natashia Bunny: What?!",
        "time": "Today at 9:58 AM",
        "bodyImage": null,
        "mentioned": true,
        "archived": false
    },
    {
        "id": 3,
        "title": "Edward Curr",
        "subText": "",
        "description": "Thanks everyone! I am amazing of course. I miss having subordinates. I should make a mug that says 'Coworkers tears.' I won’t be taking any more questions.",
        "time": "Today at 9:41 AM",
        "bodyImage": "https://via.placeholder.com/300x150",
        "mentioned": false,
        "archived": false
    },
    {
        "id": 4,
        "title": "Terry Williams",
        "subText": "",
        "description": "Welcome @Natashia Bunny to the team! He came highly recommended from the person I fired a while back.",
        "time": "Today at 9:00 AM",
        "bodyImage": "https://via.placeholder.com/300x200",
        "mentioned": true,
        "archived": false
    }
]


export const notificationsMenuDropDownData = [
    {
        "id": 1,
        "title": "Archive",
        "icon": "archive",
        "action": "archive",
    },
    {
        "id": 2,
        "title": "Delete",
        "icon": "delete",
        "action": "delete",
    },
    {
        "id": 3,
        "title": "Mark as read",
        "icon": "mark as read",
        "action": "markAsRead",
    },
    {
        "id": 4,
        "title": "Mark as unread",
        "icon": "mark as unread",
        "action": "markAsUnread",
    },
]