import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import useListenMessages from "@/components/chat/hooks/useListenMessages";
import useMessages from "../hooks/useMessages";
import { useRef, useEffect } from "react";
import Message from "./message";
import { MessageSquare } from "lucide-react";

const Messages = () => {
  const { messages, loading } = useMessages();
  useListenMessages();
  const scrollAreaRef = useRef();
  const messagesEndRef = useRef();

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    if (messages?.length > 0) {
      // Small delay to ensure DOM is updated
      const timeoutId = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [messages]);

  if (loading) {
    return (
      <div className="h-full p-4">
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`flex ${
                index % 2 === 0 ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-[70%] space-y-2">
                <Skeleton className="h-12 w-48 rounded-2xl" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <ScrollArea ref={scrollAreaRef} className="h-full">
      <div className="p-4 space-y-4 min-h-full flex flex-col">
        {messages?.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">
                Send a message to start the conversation
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 flex-1">
            {messages?.map((message) => (
              <Message key={message?._id} message={message} />
            ))}
            <div ref={messagesEndRef} className="h-0" />
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default Messages;
