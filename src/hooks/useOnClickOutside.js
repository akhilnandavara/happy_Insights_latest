import { useEffect } from "react";

/**
 * Hook to detect clicks outside of the referenced element
 * @param {Object} ref - React ref object to bind the event listener
 * @param {Function} handler - Function to call when a click outside is detected
 */
export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // If the click is inside the ref element, do nothing
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // Otherwise, call the handler function

      handler(event);
    };

    // Add mouse and touch listeners
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      // Clean up event listeners
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
