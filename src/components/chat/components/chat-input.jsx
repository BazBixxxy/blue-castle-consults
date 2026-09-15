import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import useSendMessage from "../hooks/useSendMessage";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const ChatInput = ({ receiver }) => {
  const [message, setMessage] = useState("");
  const { sendMessage, loading } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage({ receiver, message });
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-full items-center gap-2"
    >
      <Input
        disabled={!receiver}
        id="message"
        placeholder="Type your message..."
        className="flex-1 pr-10 py-5"
        autoComplete="off"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        // disabled={messageLength === 0}
        disabled={!message || !receiver || loading}
        type="submit"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full size-8"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin size-4" />
            <span className="sr-only">loading</span>
          </>
        ) : (
          <>
            <Send className="size-4" />
            <span className="sr-only">Send</span>
          </>
        )}
      </Button>
    </form>
  );
};

export default ChatInput;
