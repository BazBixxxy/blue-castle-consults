import useSendMessage from "@/components/chat/hooks/useSendMessage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useConversation from "@/zustand/useConversation";
import { Send, Smile, Paperclip, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage, loading } = useSendMessage();
  const { selectedUser } = useConversation();
  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedUser || loading) return;

    const messageToSend = message.trim();
    setMessage(""); // Clear immediately for better UX

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "48px"; // Reset to default height
    }

    try {
      await sendMessage({ receiver: selectedUser, message: messageToSend });
    } catch (error) {
      // Restore message if sending fails
      setMessage(messageToSend);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);

    // Auto-resize textarea with better constraints
    if (textareaRef.current) {
      textareaRef.current.style.height = "48px"; // Reset height first
      const newHeight = Math.min(
        Math.max(textareaRef.current.scrollHeight, 48), // Minimum height
        144 // Maximum height (3 lines approx)
      );
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  const isDisabled = !selectedUser || loading;

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        {/* Action buttons */}
        <div className="flex items-center gap-1 pb-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0 hover:bg-accent"
            disabled={isDisabled}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0 hover:bg-accent"
            disabled={isDisabled}
          >
            <Smile className="h-4 w-4" />
          </Button>
        </div>

        {/* Input area */}
        <div className="relative flex-1 min-w-0">
          <Textarea
            ref={textareaRef}
            disabled={isDisabled}
            placeholder={
              selectedUser
                ? "Type a message..."
                : "Select a conversation to start messaging"
            }
            className={cn(
              "min-h-[48px] max-h-[144px] resize-none pr-12 py-3 px-4",
              "rounded-3xl border-2 focus:border-primary/50 transition-all duration-200",
              "placeholder:text-muted-foreground/60 text-sm leading-relaxed",
              "bg-card shadow-sm hover:shadow-md focus:shadow-md",
              "overflow-hidden" // Ensure no scroll bars appear
            )}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
            style={{ height: "48px" }} // Set explicit initial height
          />

          <Button
            type="submit"
            disabled={!message.trim() || isDisabled}
            size="icon"
            className={cn(
              "absolute right-2 bottom-2 h-8 w-8 rounded-full transition-all duration-200 shadow-md",
              message.trim() && !isDisabled
                ? "bg-primary hover:bg-primary/90 scale-100 hover:shadow-lg"
                : "bg-muted-foreground/20 scale-75 cursor-not-allowed shadow-none"
            )}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
