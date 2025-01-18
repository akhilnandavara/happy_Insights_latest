import React, { useState, useEffect } from "react";
import Icon from "../../../components/Icon";
import { Text } from "../../../components/ui";
import { RiArrowRightSLine } from "react-icons/ri";
import styles from "../Insights.module.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import nspell from "nspell";

export default function ReplyInputBox({
  isAiChatBot = false,
  setReplyContent,
  smartReplyArr = [],
  replyContent = "",
  handleAddNewInput,
}) {
  const [smartBtnClick, setSmartBtnClick] = useState(null);
  const [spellChecker, setSpellChecker] = useState(null);
  const [language, setLanguage] = useState("hi");

  useEffect(() => {
    // Fetch the .aff and .dic files from the public folder
    const loadDictionary = async () => {
      const affFile = await fetch("/dictionary-en/index.aff");
      const dicFile = await fetch("/dictionary-en/index.dic");

      // Ensure the files are loaded correctly
      const affText = await affFile.text();
      const dicText = await dicFile.text();

      // Initialize nspell with the dictionary
      const spellCheckerInstance = nspell(affText, dicText);
      setSpellChecker(spellCheckerInstance);
    };

    loadDictionary();
  }, []);

  const autocorrectText = () => {
    if (!spellChecker) {
      console.error("Spell checker not initialized!");
      return;
    }

    const correctedText = replyContent
      .split(" ")
      .map((word) => {
        if (spellChecker.correct(word)) {
          return word;
        }

        const suggestions = spellChecker.suggest(word);
        return suggestions.length > 0 ? suggestions[0] : word;
      })
      .join(" ");
    setReplyContent(correctedText);
  };

  // Trigger autocorrect when smartBtnClick === 'autoCorrect'
  useEffect(() => {
    if (smartBtnClick === "AutoCorrect") {
      autocorrectText();
      setSmartBtnClick(null); // Reset button state after autocorrect
    }
    if (smartBtnClick === "Translate") {
      handleTranslate();
      setSmartBtnClick(null);
    }
  }, [smartBtnClick]);

  const handleTranslate = async () => {
    try {
      const resonse = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
          q: "hi",
          source: "auto",
          target: "hi",
          format: "text",
          alternatives: 3,
          api_key: "",
        }),
        headers: { "Content-Type": "application/json" },
      });
      const res = await resonse.json();

      console.log("Translation response:", res);
      setReplyContent(res.data.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && replyContent.trim()) {
      handleAddNewInput(replyContent);
      e.preventDefault(); // Prevent default form submission
    }
  };

  const handleSendClick = () => {
    if (replyContent.trim()) {
      handleAddNewInput(replyContent);
    }
  };
  const addEmoji = (emoji) => {
    setReplyContent(replyContent + emoji.native);
    setSmartBtnClick(null); // Close emoji picker after adding emoji
  };

  return (
    <div className={styles.userReplyContainer}>
      {/* Input Box */}
      <textarea
        spellCheck="true"
        type="text"
        placeholder="Start Typing..."
        className={`${styles.inputBox} ${isAiChatBot && styles.aiBotInputBox}`}
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        onKeyDown={handleKeyPress} // Handle Enter key
      />

      {/* Actions Btn*/}
      <div className={styles.inputActions}>
        {/* Smart Replies */}
        <div className={styles.smartReplyWrapper}>
          {smartReplyArr.map((reply) => (
            <button
              data-tooltip-id={reply.title}
              onClick={() => setSmartBtnClick(reply.title)}
              key={reply.id}
              className={styles.smartReplyBtn}
            >
              <Icon
                sprite="youtube"
                name={reply.icon}
                className={`${styles.smartReplyIcon} ${
                  isAiChatBot && styles.aiBotActionBtn
                } ${styles[reply.className]}`}
              />
              <ReactTooltip
                id={reply.title}
                place="top"
                effect="solid"
                content={reply.title}
                className={styles.tooltip}
              />
            </button>
          ))}
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendClick}
          className={`${styles.replyButton} ${
            isAiChatBot && styles.aiBotSendBtn
          }`}
        >
          <Text as="p" className={styles.replyButtonText}>
            Send
          </Text>
          {!isAiChatBot && (
            <RiArrowRightSLine
              className={`${styles.icon} ${styles.replyButtonIcon}`}
            />
          )}
        </button>
      </div>

      {/* Emoji Picker */}
      {smartBtnClick === "Emojis" && (
        <div className={styles.emojiPickerContainer}>
          <Picker data={data} onEmojiSelect={addEmoji} />
        </div>
      )}
    </div>
  );
}
