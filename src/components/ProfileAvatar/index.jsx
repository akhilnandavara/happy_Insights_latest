import React from "react";
import PropTypes from "prop-types";
import styles from "./ProfileAvatar.module.css";
import { Img } from "../ui";

const ProfileAvatar = ({ name, profilePhotoUrl, size = 50,className }) => {
  // Generate initials if no profile photo is available
  const getInitials = (name) => {
    if (!name) return "?";
    const words = name.trim().split(" "); // Split the name into words
    if (words.length === 1) {
      return words[0][0].toUpperCase(); // Single word: First letter only
    }
    console.log("words", words)
    return (
      words[0][0].toUpperCase() + words[1][0].toUpperCase() // Two letters for multi-word names
    );
  }

  const getRandomColor = (name) => {
    if (!name) return "#ccc"; // Default color if no name
    const hash = name
      .split("")
      .reduce((acc, char) => char.charCodeAt(0) + acc, 0); // Generate hash from name
    const colors = [
      "#F94144", // Red
      "#F3722C", // Orange
      "#F9C74F", // Yellow
      "#90BE6D", // Green
      "#43AA8B", // Teal
      "#577590", // Blue
      "#277DA1", // Dark Blue
    ];
    return colors[hash % colors.length]; // Select a color from the array
  };


  // Determine if profile photo or fallback should be displayed
  const isImageAvailable = Boolean(profilePhotoUrl);

  return (
    <div
      className={`${styles.avatar} ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size / 2.5, // Adjust font size based on avatar size,
        backgroundColor: !isImageAvailable ? getRandomColor(name) : "transparent",
      }}
    >
      {isImageAvailable ? (
        <Img
          src={profilePhotoUrl}
          alt={name || "Avatar"}
          className={styles.avatarImg}
          style={{
            width: size,
            height: size,
          }}
        />
      ) : (
        <span className={styles.avatarText}>{getInitials(name)}</span>
      )}
    </div>
  );
};

ProfileAvatar.propTypes = {
  name: PropTypes.string, // User's full name
  profilePhotoUrl: PropTypes.string, // URL of the profile photo
  size: PropTypes.number, // Size of the avatar (default is 50px)
};

export default ProfileAvatar;
