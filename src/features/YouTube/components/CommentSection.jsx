import React, { useEffect, useState, useCallback, useMemo } from "react";
import { getCommentsList } from "../../../services/operations/Youtube";
import { useDispatch, useSelector } from "react-redux";
import { FaListUl } from "react-icons/fa6";
import styles from "../styles/commentsSection.module.css";
import { Text } from "../../../components/ui";
import useDebounce from "../../../hooks/useDebounce";
import Icon from "../../../components/Icon";
import ReplyInputBox from "./ReplyInputBox";
import { IoCloseCircle } from "react-icons/io5";
import { setShowStats } from "../../../store/slices/youTubeSlice";
import { useCommentSection } from "../hooks/useCommentSection";
import SearchBar from "../../../components/SearchBar";
import PaginationComponent from "../../../components/Pagination";
import Comment from "./Comment";

export default function CommentSection({
  selectedVideo,
  compareComments,
  handleCompareComments,
}) {
  const dispatch = useDispatch();
  const { commentsList, showStats } = useSelector((state) => state.youtube);
  const [searchTerm, setSearchTerm] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [currentCategory, setCurrentCategory] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  useEffect(() => {
    dispatch(getCommentsList(selectedVideo[0]?.video_id));
  }, [selectedVideo, dispatch]);

  // Compute visible categories
  const visibleCategories = useMemo(() => {
    if (!commentsList || !Array.isArray(commentsList)) return [];
    return Object.entries(
      commentsList.reduce((acc, comment) => {
        const category = comment.comment_category || "Others";
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {})
    );
  }, [commentsList]);

  const {
    expandedReplies,
    toggleReply,
    filteredComments,
    selectedComments,
    toggleCommentSelection,
  } = useCommentSection(commentsList, selectedCategory, debouncedSearchTerm);
  const handleCategorySelection = (category) => {
    setCurrentCategory(category);
    setSelectedCategory(category);
  };

  const smartReplyArr = [
    { id: 1, title: "Emojis", icon: "smart-icon-1", className: "strokeIcon" },
    { id: 2, title: "Ai Suggestion", icon: "smart-icon-2", className: "" },
    { id: 3, title: "AutoCorrect", icon: "smart-icon-3", className: "" },
    { id: 4, title: "Recomend", icon: "smart-icon-4", className: "" },
    { id: 5, title: "Translate", icon: "smart-icon-5", className: "" },
  ];

  const handleRemoveReply = (comment_id) => {
    setReplyContent("");
    toggleCommentSelection(comment_id);
  };

  return (
    <>
      <div className={styles.commentsSectionWrapper}>
        <CommentsHeader
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          visibleCategories={visibleCategories}
          currentCategory={currentCategory}
          onCategorySelect={handleCategorySelection}
          compareComments={compareComments}
          handleCompareComments={handleCompareComments}
          dispatch={dispatch}
          showStats={showStats}
        />
        {/* Comments */}
        {!showStats ? (
          <div className={styles.commentsWrapper}>
            {filteredComments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                expandedReplies={expandedReplies}
                toggleReply={toggleReply}
                selectedComments={selectedComments}
                toggleCommentSelection={toggleCommentSelection}
              />
            ))}
          </div>
        ) : (
          // <InsightsSection />
          <div></div>
        )}
        <PaginationComponent pageCount={5} onPageChange={() => {}} />
      </div>

      {/* Display selected comments */}

      {selectedComments?.length > 0 && (
        <div className={styles.replyWrapper}>
          <div className={styles.selectedCommentsContainer}>
            {filteredComments
              .filter(({ comment_id }) => selectedComments.includes(comment_id)) // Match selected comment IDs
              .map(({ comment_id, posted_by_name, comment_text }) => (
                <div key={comment_id} className={styles.replyContent}>
                  <Text as={"p"} className={styles.postUserName}>
                    {posted_by_name}
                  </Text>
                  <Text as="p" className={styles.replyText}>
                    {comment_text || "No comment text available."}
                  </Text>
                  <div className={styles.selectedCommentsIconContainer}>
                    <IoCloseCircle
                      onClick={() => handleRemoveReply(comment_id)}
                      className={`${styles.icon} ${styles.selectedCommentsIcon}`}
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className={styles.userInputContainer}>
            <ReplyInputBox
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              smartReplyArr={smartReplyArr}
            />
          </div>
        </div>
      )}
    </>
  );
}

const CommentsHeader = ({
  searchTerm,
  onSearchChange,
  visibleCategories,
  currentCategory,
  onCategorySelect,
  compareComments,
  handleCompareComments,
  showStats,
  dispatch,
}) => (
  <div
    className={`${styles.commentsHeaderWrapper} ${
      showStats && styles.statsHeaderWrapper
    }`}
  >
    {/* Catgories btns headers Section 1 */}
    <div
      className={`${styles.commentsCategoryBtnContainer} ${
        showStats && styles.statsCategoryBtns
      }`}
    >
      <button
        className={`${styles.commentsCategoryBtn} ${
          currentCategory === "All" ? styles.active : ""
        }`}
        onClick={() => onCategorySelect("All")}
      >
        All
      </button>

      {visibleCategories.map(([category, count]) => (
        <button
          key={category}
          className={`${styles.commentsCategoryBtn} ${
            currentCategory === category ? styles.active : ""
          }`}
          onClick={() => onCategorySelect(category)}
        >
          {category} ({count})
        </button>
      ))}
    </div>

    {/* Comments Header section 2 */}
    <div
      className={`${styles.commentsHeader} ${showStats && styles.statsHeader}`}
    >
      {!showStats && (
        <SearchBar
          placeholder="Search the comments by username or title "
          className={styles.commentSearchBox}
          customIconClasss={styles.commentSearchIcon}
        />
      )}
      <div className={styles.commentsHeaderActionBts}>
        {!showStats && (
          <button
            onClick={() => handleCompareComments(true)}
            className={styles.compareBtnContainer}
          >
            <Icon
              sprite="youtube"
              name={"compare-icon"}
              className={`${styles.icon} ${styles.compareBtnActive}`}
            />
            <Text className={styles.compareBtnText}>Compare</Text>
          </button>
        )}
        <button className={styles.filterBtnContainer}>
          <Icon sprite="youtube" name={"filter"} className={styles.icon} />
          <Text className={styles.filterBtnText}>Filter</Text>
        </button>

        <div className={styles.statsToggleBtnContainer}>
          <ToggleOption
            showStats={!showStats}
            onClick={() => dispatch(setShowStats(false))}
            icon={<FaListUl className={styles.icon} />}
          />
          <ToggleOption
            showStats={showStats}
            onClick={() => dispatch(setShowStats(true))}
            icon={
              <Icon
                sprite="youtube"
                name={"stats-icon"}
                className={styles.icon}
              />
            }
          />
        </div>
      </div>
    </div>
  </div>
);

const ToggleOption = ({ showStats, onClick, icon }) => (
  <div
    className={`${styles.toggleOption} ${showStats ? styles.active : ""}`}
    onClick={onClick}
  >
    {React.cloneElement(icon, {
      style: { color: showStats && "#fff" }, // Dynamic color
    })}
  </div>
);
