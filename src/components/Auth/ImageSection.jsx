import React from "react";
import styles from "../../styles/components/Auth.module.css";
import { Img } from "../ui";

import {
  userAvatar,
  ThumbUpPng,
  ThumbDownPng,
  hismallLogo,
  circleLogo,
  thumbUpPng1,
  faceTouchpng,
  commentPng,
  AvatarBine,
  sidePotPng,
} from "../../assets/images"; // Import all images

// Interaction Button Component
const InteractionButton = ({ src, alt, count, className }) => (
  <div className={styles.likeSection}>
    <Img src={src} className={className} alt={alt} />
    {count !== undefined && <span>{count}</span>}
  </div>
);

const ImageSection = () => {
  return (
    <section className={styles.commentSection}>
      <div className={styles.mainColumn}>
        <div className={styles.commentContent}>
          <header className={styles.commentHeader}>
            <div className={styles.userInfo}>
              {/* User Avatar */}
              <Img
                src={userAvatar}
                className={styles.userAvatar}
                alt="User avatar"
              />
              <div className={styles.userDetails}>
                <div className={styles.userNameContainer}>
                  <h2 className={styles.userName}>@ Franceo753</h2>
                  <time className={styles.commentTime}>3 mins ago</time>
                </div>
                <p className={styles.commentText}>
                  Very nice and informative video
                </p>

                {/* Interaction Buttons */}
                <div className={styles.interactionBar}>
                  <InteractionButton
                    className={styles.thumbIcon}
                    src={ThumbUpPng}
                    alt="Like icon"
                    count={152}
                  />
                  <InteractionButton
                    className={styles.thumbIcon}
                    src={ThumbDownPng}
                    alt="Dislike icon"
                    count={62}
                  />
                  <Img
                    src={hismallLogo}
                    className={styles.shareIcon}
                    alt="Share icon"
                  />
                </div>

                {/* Media Section */}
                <div className={styles.mediaContainer}>
                  <Img
                    src={circleLogo}
                    className={styles.playButton}
                    alt="Circle logo"
                  />
                  <div className={styles.videoContainer}>
                    <p className={styles.replyText}>Thanks for the comment</p>
                    <div className={styles.mediaWrapper}>
                      {[thumbUpPng1, commentPng, faceTouchpng].map(
                        (src, index) => (
                          <Img
                            key={index}
                            loading="lazy"
                            src={src}
                            className={styles.interactionbtn}
                            alt="Media icon"
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* Video Thumbnail */}
      <Img
        src={AvatarBine}
        className={styles.videoThumbnail}
        alt="Video thumbnail"
      />

      {/* Side Background Image */}
      <aside className={styles.sideColumn}>
        <Img src={sidePotPng} className={styles.sideImage} alt="Side content" />
      </aside>
    </section>
  );
};

export default ImageSection;
