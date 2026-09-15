import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import ChatInput from "./chat-input";
import useMessages from "../hooks/useMessages";
import useConversation from "@/zustand/useConversation";
import { Loader2 } from "lucide-react";
import { useAuthContext } from "@/context/auth-context";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import useListenMessages from "../hooks/useListenMessages";
import { useSocketContext } from "@/context/socket-context";
import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const ChatDialog = ({ receiver }) => {
  const { pathname } = useLocation();
  const { authUser } = useAuthContext();
  const { onlineUsers } = useSocketContext();
  const [open, setOpen] = useState(false);
  const lastMessageRef = useRef(null);
  const isOnline = onlineUsers.includes(receiver._id);

  const { messages, loading, fetchMessages } = useMessages();
  const { setSelectedUser } = useConversation();
  useListenMessages();

  useEffect(() => {
    if (open && receiver) {
      // Set the receiver as selected user when dialog opens
      setSelectedUser(receiver);
      fetchMessages(receiver._id);
    } else if (!open) {
      // Clear selected user when dialog closes
      setSelectedUser(null);
    }
  }, [open, receiver?._id]); // Remove fetchMessages and setSelectedUser from deps

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size={pathname.startsWith("/products/owner") ? "" : "sm"}
          className="border"
        >
          Chat
          <MessageCircle className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex h-[85vh] max-h-[600px] min-h-[400px] w-full flex-col overflow-hidden p-0 sm:h-[80vh] sm:max-h-[700px] sm:min-h-[500px]">
        {/* Header */}
        <DialogHeader className="flex-shrink-0 border-b px-6 py-4">
          <DialogTitle className="sr-only">Chat</DialogTitle>
          <DialogDescription className="sr-only">
            Chat and connect with sellers.
          </DialogDescription>
          {receiver && (
            <div className="flex items-center gap-3">
              <div className="mt-2 flex items-start gap-3">
                <div className="relative">
                  <Avatar className="border">
                    <AvatarImage
                      src={receiver.profilePicture}
                      alt={receiver.firstName + " picture"}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {receiver.firstName?.[0]}
                      {receiver.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  {isOnline && (
                    <span
                      title="online"
                      className="border-background absolute end-0 -top-0.5 size-3 animate-pulse rounded-full border-2 bg-emerald-500 z-50"
                    >
                      <span className="sr-only">Online</span>
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {receiver.firstName} {receiver.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {receiver.email}
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="bg-green-600 text-white h-4 ml-auto"
              >
                Beta
              </Badge>
            </div>
          )}
        </DialogHeader>

        {/* Messages */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 min-h-0">
          {!authUser ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Please{" "}
                <Link
                  to={"/login"}
                  className="font-medium text-primary hover:text-muted-foreground"
                >
                  login
                </Link>{" "}
                to chat.
              </p>
            </div>
          ) : loading ? (
            <div className="flex flex-1 items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Loading...</span>
            </div>
          ) : receiver ? (
            messages?.length > 0 ? (
              messages?.map((message, idx) => {
                const isMine = message?.senderId === authUser._id;
                const isLast = idx === messages?.length - 1;
                return (
                  <div
                    key={message?._id}
                    ref={isLast ? lastMessageRef : null}
                    className={cn(
                      "flex flex-col max-w-[85%] sm:max-w-[70%]",
                      isMine ? "ml-auto items-end" : "mr-auto items-start",
                      message?.shouldShake && "shake"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2 text-sm shadow-sm break-words word-wrap",
                        isMine
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted text-foreground rounded-bl-sm"
                      )}
                    >
                      {message?.message}
                    </div>
                    <span className="mt-1 text-[11px] text-muted-foreground">
                      {formatDistanceToNow(new Date(message?.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground text-center px-4">
                  No messages yet. Start the conversation!
                </p>
              </div>
            )
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-sm text-muted-foreground">
                No conversation selected.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {authUser && receiver && (
          <DialogFooter className="flex-shrink-0 border-t p-4">
            <ChatInput receiver={receiver} />
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
