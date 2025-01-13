import styles from "../styles/aiInsightsRightSideBar.module.css";
import { Heading, Text } from "../../../components/ui";
import { FaArrowLeft } from "react-icons/fa";
import { useState, useMemo } from "react";
import ReplyInputBox from "./ReplyInputBox";
import Icon from "../../../components/Icon";

// Suggestion data and other constants
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

const smartReplyArr = [
  { id: 2, icon: "smart-icon-2", className: "" },
  { id: 3, icon: "smart-icon-3", className: "" },
  { id: 4, icon: "smart-icon-4", className: "" },
];

// Header Component
function Header({ title, onBack, onSettings, icon }) {
  return (
    <div className={styles.suggestionSectionHeader}>
      <div className={styles.navHeader}>
        {onBack && <FaArrowLeft onClick={onBack} className={styles.icon} />}
        {icon}
        <Heading as="h1" className={styles.navHeaderTitle}>
          {title}
        </Heading>
      </div>
      {onSettings && (
        <div className={styles.navHeaderSettings} onClick={onSettings}>
          <Icon name={"settings"} className={styles.icon} />
        </div>
      )}
    </div>
  );
}

// Suggestion List Component
function SuggestionList({
  title,
  items,
  onAdd,
  showAddButton = false,
  isConfig = false,
  showAllSuggestions = true,
  handleShowAllSuggestions = () => {},
}) {
  const toggleButtonLabel = useMemo(
    () => (showAllSuggestions ? "<<" : `+${suggestionData.slice(2).length}`),
    [showAllSuggestions]
  );
  return (
    <>
      {showAllSuggestions && (
        <Text as="h2" className={styles.suggestionSectionTitle}>
          {title}
        </Text>
      )}
      <div className={styles.suggestionSectionWrapper}>
        {items.map((item, index) => (
          <div key={index} className={styles.suggestionItem}>
            {item}
          </div>
        ))}
        {showAddButton && (
          <button className={styles.suggestionItem} onClick={onAdd}>
            Add New
          </button>
        )}
        {!isConfig && title.toLowerCase() !== "user inputs" && (
          <button
            className={styles.suggestionItem}
            onClick={handleShowAllSuggestions}
          >
            {toggleButtonLabel}
          </button>
        )}
      </div>
    </>
  );
}

// Suggestion History Component
function SuggestionHistory({ history }) {
  return (
    <>
      {history.map((item) => (
        <div key={item.id} className={styles.suggestionBotItemContainer}>
          {/* User Input Text */}
          <div className={styles.suggestionBotItem}>
            <Text as="p" className={styles.suggestionBotItemText}>
              {item.text}
            </Text>
            <Text className={styles.timeTag}>
              {item.date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Text>
          </div>
          {/* AI Response Text */}
          <div className={styles.suggestionBotItemAIResItem}>
            <Text as="p" className={styles.aiResText}>
              {item.aiRes}
            </Text>
            <Text className={`${styles.timeTag} ${styles.aiResDate}`}>
              {item.date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Text>
          </div>
        </div>
      ))}
    </>
  );
}

// Main Suggestion Section Component
export default function SuggestionSection() {
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
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
  const [replyContent, setReplyContent] = useState("");
  const [isInputBoxVisible, setIsInputBoxVisible] = useState(false);

  const handleAddNewInput = (input) => {
    setUserInputs((prev) => [...prev, input]);
    setReplyContent("");
    setIsInputBoxVisible(false);
  };
  const handleShowAllSuggestions = () => {
    setShowAllSuggestions(!showAllSuggestions);
  };

  return (
    <>
      {isConfig ? (
        <div className={styles.suggestionContentWrapper}>
          <div>
            <Header title="Configuration" onBack={() => setIsConfig(false)} />
            <SuggestionList
              isConfig={isConfig}
              title="AI Suggestions"
              items={suggestionData}
            />
            <SuggestionList
              title="User Inputs"
              items={userInputs}
              isConfig={true}
              showAddButton={true}
              onAdd={() => setIsInputBoxVisible(true)}
            />
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
          <Header
            title="AI Insights"
            onSettings={() => setIsConfig(true)}
            icon={
              <Icon
                sprite="youtube"
                name={"ai-star"}
                className={styles.aiStarIcon}
              />
            }
          />
          <div className={styles.suggestionContentWrapper}>
            {/* BOT CHAT  */}
            <div
              className={`${styles.suggestionBotContainer} ${
                showAllSuggestions ? styles.expanded : ""
              }`}
            >
              <SuggestionHistory history={history} />
            </div>

            {/* Input Suggestion */}
            <SuggestionList
              title="AI Suggestions"
              showAllSuggestions={showAllSuggestions}
              handleShowAllSuggestions={handleShowAllSuggestions}
              items={
                showAllSuggestions ? suggestionData : suggestionData.slice(0, 2)
              }
            />

            {showAllSuggestions && (
              <SuggestionList
                showAllSuggestions={showAllSuggestions}
                handleShowAllSuggestions={handleShowAllSuggestions}
                title="User Inputs"
                items={userInputs}
              />
            )}
            {/* User Input Box */}
            <div className={styles.suggestionInputContainer}>
              <ReplyInputBox isAiChatBot smartReplyArr={smartReplyArr} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
