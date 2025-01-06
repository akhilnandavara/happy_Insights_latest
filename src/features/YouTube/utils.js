import { MdOutlineDateRange, MdOutlineFavoriteBorder, MdBookmarkBorder } from "react-icons/md";

export const formatRelativeTime = (dateString) => {

  const now = new Date();
  const date = new Date(dateString);

  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} weeks ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} years ago`;
};


export const formatViewCount = (count) => {
  if (count >= 1000000) {
    // Format as millions
    return (count / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (count >= 1000) {
    // Format as thousands
    return (count / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    // Format as is
    return count.toString();
  }
}


export const filterOptions = [
  { id: 1, name: "Today", icon: MdOutlineDateRange },
  { id: 2, name: "Favorites", icon: MdOutlineFavoriteBorder },
  { id: 3, name: "Top 10", icon: MdBookmarkBorder },
];
