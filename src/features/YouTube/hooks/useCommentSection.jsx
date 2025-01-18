import { useState, useCallback, useMemo } from "react";

export const useCommentSection = (
  commentsList,
  selectedCategory,
  debouncedSearchTerm
) => {
  // const [expandAllReplies, setExpandAllReplies] = useState(false); // Tracks the state of "Expand All Replies"
  const [expandedReplies, setExpandedReplies] = useState([]); // Tracks replies expanded for specific comments
  const [selectedComments, setSelectedComments] = useState([]); // Tracks selected comments


  // Toggle replies for a specific comment
  const toggleReply = useCallback((commentId) => {
    setExpandedReplies((prevExpandedReplies) => {
      // If all replies are currently expanded, maintain all-expansion behavior

      return prevExpandedReplies.includes(commentId)
        ? prevExpandedReplies.filter((id) => id !== commentId) // Collapse specific reply
        : [...prevExpandedReplies, commentId]; // Expand specific reply
    });
  }, []);

  
  // Filter comments based on category and search term
  const filteredComments = useMemo(() => {
    return commentsList?.filter((comment) => {
      const isInCategory =
        selectedCategory.toLowerCase() === "all" ||
        comment.comment_category.toLowerCase() ===
          selectedCategory.toLowerCase();
      const matchesSearchTerm = debouncedSearchTerm
        ? comment.comment_text
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase()) ||
          comment.posted_by_name
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase())
        : true;
      return isInCategory && matchesSearchTerm;
    });
  }, [commentsList, selectedCategory, debouncedSearchTerm]);

  // Toggle comment selection
  const toggleCommentSelection = useCallback((commentId) => {
    // setSelectedComments((prevSelectedComments) =>
    //   prevSelectedComments.includes(commentId)
    //     ? prevSelectedComments.filter((id) => id !== commentId) // Deselect comment
    //     : [...prevSelectedComments, commentId] // Select comment
    // );

    setSelectedComments(
      (prevSelectedComments) =>
        prevSelectedComments.includes(commentId)
          ? prevSelectedComments.filter((id) => id !== commentId) // Deselect comment
          : [commentId] // Select comment
    );
  }, []);

  return {
    expandedReplies, // Tracks expanded replies for specific comments
    toggleReply, // Toggles replies for a specific comment
    filteredComments, // Filtered comments list
    selectedComments, // Tracks selected comments
    toggleCommentSelection, // Toggles selection of comments
  };
};
