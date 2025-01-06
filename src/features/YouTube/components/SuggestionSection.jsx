import styles from "../Insights.module.css";
import { Heading, Text } from "../../../components/ui";
import { BsStars } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { useState } from "react";
import ReplyInputBox from "./ReplyInputBox";
import { FaArrowLeft } from "react-icons/fa";

// Suggestion Data
const suggestionData = [
  "Top 10 Comments Summary",
  "Summary of All Comments",
  "All Happy Comments Summary",
  "All Sad Comments Summary",
  "Top 5 Positive Comments Summary",
  "Commonly Mentioned Keywords Summary",
  "Feedback Sentiment Overview",
  "Engagement Highlights Summary",
  "Sentiment-Based Comparison Summary",
  "Recurring Suggestions Summary",
];

export default function SuggestionSection() {
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [isInputBoxVisible, setIsInputBoxVisible] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isConfig, setIsConfig] = useState(false);
  const [history, setHistory] = useState([
    {
      id: 1,
      text: "Top 10 Comments Summary",
      date: new Date(),
      aiRes: "Here are the top 10 comments summary",
    },
    {
      id: 2,
      text: "Summary of All Comments",
      date: new Date(),
      aiRes: "Here is the summary of all comments",
    },
  ]);

  const [userInputs, setUserInputs] = useState([
    "Top 5 Positive Comments Summary",
    "Feedback Sentiment Overview",
  ]);

  // Toggle button label
  const toggleButtonLabel = showAllSuggestions
    ? "<<"
    : `+${suggestionData.slice(2).length}`;

  const smartReplyArr = [
    { id: 2, icon: "smart-icon-2", className: "" },
    { id: 3, icon: "smart-icon-3", className: "" },
    { id: 4, icon: "smart-icon-4", className: "" },
  ];

  const handleAddNewInput = (input) => {
    setUserInputs((prev) => [...prev, input]);
    setIsInputBoxVisible(false);
  };

  const renderSuggestions = (suggestions) =>
    suggestions.map((item, index) => (
      <div key={index} className={styles.suggestionItem}>
        {item}
      </div>
    ));

  const renderHistory = () =>
    history.map((item) => (
      <div key={item.id} className={styles.suggestionBotItem}>
        <div className={styles.suggestionBotItemText}>
          <Text as="p" className={styles.suggestionBotTitle}>
            {item.text}
          </Text>
          <Text className={styles.botDate}>
            {item.date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </Text>
        </div>
        <div className={styles.suggestionBotItemAIRes}>
          <Text as="p" className={styles.aiResText}>
            {item.aiRes}
          </Text>
        </div>
      </div>
    ));

  return (
    <>
      {isConfig ? (
        <div className={styles.smartSuggestionContainer}>
          {/* Header  */}
          <div className={styles.suggestionSectionHeader}>
            <div className={styles.suggestionHeaderContainer}>
              <FaArrowLeft
                onClick={() => setIsConfig(false)}
                className={styles.icon}
              />
              <Heading as="h1" className={styles.suggestionSectionTitle}>
                Configuration
              </Heading>
            </div>
          </div>

          {/* AI Suggestions Section */}
          <Text as="h2" className={styles.suggestionSectionTitle}>
            AI Suggestions
          </Text>
          <div className={styles.suggestionSectionWrapper}>
            {renderSuggestions(suggestionData)}
          </div>

          {/* User Choice Options */}
          <Text as="h2" className={styles.suggestionSectionTitle}>
            User Inputs
          </Text>
          <div className={styles.suggestionSectionWrapper}>
            {renderSuggestions(userInputs)}
            <button
              className={styles.suggestionItem}
              onClick={() => setIsInputBoxVisible(true)}
            >
              Add New
            </button>
          </div>

          {isInputBoxVisible && (
            <div className={styles.suggestionInputContainer}>
              <ReplyInputBox
                handleAddNewInput={handleAddNewInput}
                setReplyContent={setReplyContent}
                replyContent={replyContent}
                isAiChatBot={true}
                smartReplyArr={smartReplyArr}
              />
            </div>
          )}
        </div>
      ) : (
        <>
          <div className={styles.suggestionSectionHeader}>
            <div className={styles.suggestionHeaderContainer}>
              <BsStars className={`${styles.icon} ${styles.aiStarIcon}`} />
              <Heading as="h1" className={styles.suggestionSectionTitle}>
                AI Insights
              </Heading>
            </div>
            <IoMdSettings
              className={styles.icon}
              onClick={() => setIsConfig(true)}
            />
          </div>

          {/* Content Section */}
          <div className={styles.suggestionContentWrapper}>
            <div
              className={`${styles.suggestionBotContainer} ${
                showAllSuggestions ? styles.expanded : ""
              }`}
            >
              {renderHistory()}
            </div>

            {/* Titles and Suggestions */}
            <div className={styles.smartSuggestionContainer}>
              {/* AI Suggestions Section */}
              <Text as="h2" className={styles.suggestionSectionTitle}>
                AI Suggestions
              </Text>
              <div className={styles.suggestionSectionWrapper}>
                {renderSuggestions(
                  showAllSuggestions
                    ? suggestionData
                    : suggestionData.slice(0, 2)
                )}
                <button
                  className={styles.suggestionItem}
                  onClick={() => setShowAllSuggestions(!showAllSuggestions)}
                >
                  {toggleButtonLabel}
                </button>
              </div>
              {showAllSuggestions && (
                <>
                  <Text as="h2" className={styles.suggestionSectionTitle}>
                    User Inputs
                  </Text>
                  <div className={styles.suggestionSectionWrapper}>
                    {renderSuggestions(userInputs)}
                  </div>
                </>
              )}
            </div>

            {/* Input Section */}
            <div className={styles.suggestionInputContainer}>
              <ReplyInputBox isAiChatBot smartReplyArr={smartReplyArr} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
