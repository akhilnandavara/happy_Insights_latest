export const statsApiData = {
    "charts": [
        {
            "type": "bar",
            "title": "Most Liked Comments",
            "labels": ["Comment 1", "Comment 2", "Comment 3", "Comment 4", "Comment 5"],
            "datasets": [
                { "label": "Likes", "data": [110, 39, 32, 24, 6] }
            ]
        },
        {
            "type": "line",
            "title": "Most Liked Video",
            "labels": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "datasets": [
                { "label": "Video 1", "data": [100, 1200, 150, 200, 250, 300, 500] },
                { "label": "Video 2", "data": [50, 80, 100, 120, 180, 200, 250] },
                { "label": "Video 3", "data": [70, 90, 130, 160, 220, 270, 300] },
                { "label": "Video 4", "data": [30, 50, 90, 140, 200, 240, 260] },
                { "label": "Video 5", "data": [20, 40, 60, 100, 130, 170, 200] }
            ]
        },
        {
            "type": "pie",
            "title": "Overall Sentiment Analysis",
            "labels": ["Positive", "Neutral", "Negative"],
            "datasets": [
                { "data": [400, 300, 3000] }
            ]
        },
        {
            "type": "doughnut",
            "title": "Sentiment Categories",
            "labels": ["Positive", "Neutral", "Negative"],
            "datasets": [
                { "label": "Sentiment Analysis", "data": [65, 25, 10] }
            ]
        },
        {
            "type": "dottedLine",
            "title": "Total Comments",
            "labels": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "datasets": [
                { "label": "Last Week", "data": [40, 50, 60, 70, 80, 85, 90] },
                { "label": "This Week", "data": [30, 45, 70, 80, 95, 85, 100] }
            ]
        }
    ],
    "statsOverview": [
        {
            "id": 1,
            "title": "Total Comments This Week",
            "value": 1234,
            "change": 13,
            "changeType": "up"
        },
        {
            "id": 2,
            "title": "Total Views This Week",
            "value": 21052,
            "change": -41,
            "changeType": "down"
        },
        {
            "id": 3,
            "title": "Total Likes Average This Week",
            "value": 86.56,
            "change": 15,
            "changeType": "up"
        },
        {
            "id": 4,
            "title": "Total Dislike Average This Week",
            "value": 13.44,
            "change": -2,
            "changeType": "down"
        }
    ]
};
