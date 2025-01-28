import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  Fragment,
} from "react";
import { getCommentsList } from "../../../services/operations/Youtube";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/commentsSection.module.css";
import { Text } from "../../../components/ui";
import useDebounce from "../../../hooks/useDebounce";
import Comment from "./Comment";
import { useCommentSection } from "../hooks/useCommentSection";
import { FaArrowLeft } from "react-icons/fa";
import PaginationComponent from "../../../components/Pagination";
import Icon from "../../../components/Icon";
import ReplyInputBox from "./ReplyInputBox";
import { IoCloseCircle } from "react-icons/io5";
import CompareSectionHeaderSwiper from "./CompareSectionHeaderSwiper";
import SearchBar from "../../../components/SearchBar";

export default function CompareCommentsSection({
  selectedVideos,
  setSelectedVideo,
  compareComments,
  handleCompareComments,
}) {
  const dispatch = useDispatch();
  const commentsList = useSelector((state) => state.youtube.commentsList);

  const [searchTerm, setSearchTerm] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [currentCategory, setCurrentCategory] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (selectedVideos.length > 0 && selectedVideos[0]?.video_id) {
      dispatch(getCommentsList(selectedVideos[0]?.video_id));
    }
  }, [selectedVideos[0]?.video_id, dispatch]);

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

  const hashToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash); // Hash function
    }

    // Extract RGB values from hash
    const r = (hash >> 16) & 0xff;
    const g = (hash >> 8) & 0xff;
    const b = hash & 0xff;

    return {
      hex: `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`,
      rgba: (opacity = 1) => `rgba(${r}, ${g}, ${b}, ${opacity})`,
    };
  };

  const videoColors = useMemo(() => {
    return selectedVideos.reduce((acc, video) => {
      acc[video.video_id] = hashToColor(video.video_id); // Store hex and rgba generator
      return acc;
    }, {});
  }, [selectedVideos]);

  // Map video IDs to labels (v1, v2, ...)
  const videoLabels = useMemo(() => {
    return selectedVideos.reduce((acc, video, index) => {
      acc[video.video_id] = `v${index + 1}`;
      return acc;
    }, {});
  }, [selectedVideos]);

  const onCategorySelect = useCallback((category) => {
    setCurrentCategory(category);
    setSelectedCategory(category);
  }, []);
  const onSearchChange = useCallback((e) => setSearchTerm(e.target.value), []);

  const smartReplyArr = useMemo(
    () => [
      { id: 1, icon: "smart-icon-1", className: "strokeIcon" },
      { id: 2, icon: "smart-icon-2", className: "" },
      { id: 3, icon: "smart-icon-3", className: "" },
      { id: 4, icon: "smart-icon-4", className: "" },
    ],
    []
  );

  return (
    <>
      <div className={`${styles.navBarContainer} fadeIn `}>
        <button
          onClick={() => handleCompareComments(false)}
          className={styles.compareBackBtn}
        >
          <FaArrowLeft
            className={`${styles.icon} ${styles.compareBackBtnIcon}`}
          />
        </button>
        <Text as={"p"} className={styles.backBtnText}>
          Compare Videos
        </Text>
      </div>
      <div className={`${styles.container} fadeIn  `}>
        <CompareSectionHeaderSwiper
          selectedVideo={selectedVideos}
          setSelectedVideo={setSelectedVideo}
          videoLabels={videoLabels}
          videoColors={videoColors}
        />
        <CommentsHeader
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          visibleCategories={visibleCategories}
          currentCategory={currentCategory}
          onCategorySelect={onCategorySelect}
          compareComments={compareComments}
          handleCompareComments={handleCompareComments}
        />
        {/* Comments */}
        <div className={styles.commentsWrapper}>
          {filteredComments.length > 0 ? (
            filteredComments.map((comment) => (
              <Comment
                label={videoLabels[comment.video_id]}
                labelbg={videoColors[comment.video_id]?.rgba(0.1)}
                labelColor={videoColors[comment.video_id]?.hex}
                key={comment.id}
                comment={comment}
                expandedReplies={expandedReplies}
                toggleReply={toggleReply}
                selectedComments={selectedComments}
                compareMode={true}
                toggleCommentSelection={toggleCommentSelection}
              />
            ))
          ) : (
            <Text className={styles.noComments}>No comments available</Text>
          )}
        </div>
        <PaginationComponent pageCount={5} onPageChange={() => {}} />
        {/* Display selected comments */}
        {selectedComments?.length > 0 && (
          <div className={styles.replyWrapper}>
            <div className={styles.selectedCommentsContainer}>
              {filteredComments
                .filter(({ comment_id }) =>
                  selectedComments.includes(comment_id)
                ) // Match selected comment IDs
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
      </div>
    </>
  );
}

const CommentsHeader = ({
  searchTerm,
  onSearchChange,
  visibleCategories,
  currentCategory,
  onCategorySelect,
}) => (
  <div className={styles.commentsHeaderWrapper}>
    {/* Catgories btns headers Section 1 */}
    <div className={`${styles.commentsCategoryBtnContainer}`}>
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
    <div className={styles.commentsHeaderSection2Wrapper}>
      <SearchBar
        placeholder="Search the comments by username or title "
        className={styles.commentSearchBox}
        customIconClasss={styles.commentSearchIcon}
      />

      <div className={styles.actionBtnsWrapper}>
        <button className={styles.filterBtnContainer}>
          <Icon sprite="youtube" name={"filter"} className={styles.icon} />
          <Text className={styles.filterBtnText}>Filter</Text>
        </button>
      </div>
    </div>
  </div>
);
