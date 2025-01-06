import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Heading, Img, Text } from "../../../components/ui";
import { FaThumbsUp } from "react-icons/fa";
import { MdOutlineReply } from "react-icons/md";
import { IoIosArrowDropdown } from "react-icons/io";
import { PiArrowBendDownRight } from "react-icons/pi";
import styles from "./../Insights.module.css";
import { formatRelativeTime } from "../utils";

const ActionButton = ({
  title,
  Icon,
  count = null,
  isDisabled = false,
  onClick = () => {},
  isReply = false,
}) => (
  <div
    className={`${styles.actionButton} ${
      isDisabled || (count < 1 && count !== null) ? styles.disabled : ""
    }`}
    onClick={onClick}
  >
    <Icon
      className={`${styles.icon} ${styles.actionIcon} ${
        isReply ? styles.rotateIcon : ""
      }`}
    />
    {count !== null && (
      <span
        className={`${styles.actionCount} ${
          title === "like" ? styles.like_count : styles.reply_count
        }`}
      >
        {count}
      </span>
    )}
  </div>
);

ActionButton.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  count: PropTypes.number,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  isReply: PropTypes.bool,
};

// Nested Replies
const ReplyList = ({
  replies,
  isExpanded,
  toggleReply,
  expandedReplies,
  toggleCommentSelection,
}) => {
  const [visibleRepliesCount, setVisibleRepliesCount] = useState(2);

  const visibleReplies = useMemo(
    () => replies.slice(0, visibleRepliesCount),
    [replies, visibleRepliesCount]
  );

  const handleToggleReplies = () => {
    setVisibleRepliesCount((prevCount) => (prevCount > 2 ? 2 : replies.length));
  };

  return (
    <div className={styles.nestedReplies}>
      {visibleReplies.map((reply, index) => (
        <Comment
          key={reply.id}
          comment={reply}
          isReply
          expandedReplies={expandedReplies}
          toggleReply={toggleReply}
          toggleCommentSelection={toggleCommentSelection}
          style={{ transitionDelay: `${index * 0.1}s` }} // Optional staggered effect
        />
      ))}

      {replies.length > 2 && (
        <button
          className={styles.repliesCountBtn}
          onClick={handleToggleReplies}
        >
          {visibleRepliesCount > 2 ? "<< View Less " : "View More >>"}{" "}
        </button>
      )}
    </div>
  );
};

ReplyList.propTypes = {
  replies: PropTypes.array.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  commentId: PropTypes.string.isRequired,
  toggleReply: PropTypes.func.isRequired,
  expandedReplies: PropTypes.array.isRequired,
  toggleCommentSelection: PropTypes.func.isRequired,
};

export default function Comment({
  label,
  labelbg,
  labelColor,
  comment,
  isReply = false,
  expandedReplies,
  toggleReply,
  selectedComments,
  toggleCommentSelection,
}) {
  const isExpanded = expandedReplies.includes(comment.comment_id);
  const handleToggleReply = () => toggleReply(comment.comment_id);
  const handleCommentReply = (e) => {
    e.stopPropagation();
    toggleCommentSelection(comment.comment_id);
  };

  return (
    <div
      className={`${styles.commentsContainer} ${
        isExpanded ? (isReply ? styles.noHover : styles.active) : ""
      }
      `}
    >
      <div
        className={`${styles.commentItem}   ${
          isExpanded ? styles.dottedBorder : ""
        }
        `}
      >
        <div className={styles.userInfo}>
          {isReply && (
            <>
              <div className={styles.replyItemGap}></div>
              <PiArrowBendDownRight
                className={`${styles.icon} ${styles.userInfoArrow}`}
              />
            </>
          )}
          <Img
            src={comment.posted_by_user_picture}
            className={styles.avatar}
            alt="User avatar"
          />
          <div className={styles.userDetails}>
            <Heading as="h3" className={styles.userName}>
              {comment.posted_by_name}
            </Heading>
            <time className={styles.timestamp}>
              {formatRelativeTime(comment.posted_time)}
            </time>
          </div>
        </div>
        <Text as="p" className={styles.message}>
          {isReply ? comment.reply_text : comment.comment_text}
        </Text>
        <Text
          as={"p"}
          style={{ color: labelColor, background: labelbg }}
          className={styles.videoTagLabel}
        >
          {label}
        </Text>
        <div className={styles.actions}>
          {comment.like_count > 0 && (
            <ActionButton
              title={"like"}
              Icon={FaThumbsUp}
              count={comment.like_count}
            />
          )}
          {comment.replies?.length > 0 && (
            <ActionButton
              title={"reply_count"}
              Icon={MdOutlineReply}
              count={comment.replies.length}
            />
          )}
          {!isReply && (
            <button
              onClick={handleCommentReply}
              className={`${styles.commentReplyButton} ${
                selectedComments.includes(comment.comment_id)
                  ? styles.selected
                  : ""
              }`}
            >
              Reply
            </button>
          )}
          {!isReply && (
            <ActionButton
              Icon={IoIosArrowDropdown}
              onClick={handleToggleReply}
              isReply={isExpanded}
            />
          )}
        </div>
      </div>
      {isExpanded && comment.replies?.length > 0 && (
        <ReplyList
          replies={comment.replies}
          isExpanded={isExpanded}
          commentId={comment.comment_id}
          toggleReply={toggleReply}
          expandedReplies={expandedReplies}
          toggleCommentSelection={toggleCommentSelection}
        />
      )}
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  isReply: PropTypes.bool,
  expandedReplies: PropTypes.array.isRequired,
  toggleReply: PropTypes.func.isRequired,
  toggleCommentSelection: PropTypes.func.isRequired,
};
