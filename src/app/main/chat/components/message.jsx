import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";
import useConversation from "@/zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedUser } = useConversation();
  const isMine = message?.senderId === authUser._id;

  const otherUserInitials = selectedUser
    ? `${selectedUser.firstName?.[0] || ""}${
        selectedUser.lastName?.[0] || ""
      }`.toUpperCase()
    : "";

  const messageDate = new Date(message?.createdAt);

  // Format timestamp based on when the message was sent
  const formatTimestamp = (date) => {
    if (isToday(date)) {
      return format(date, "HH:mm");
    } else if (isYesterday(date)) {
      return `Yesterday ${format(date, "HH:mm")}`;
    } else {
      return format(date, "MMM dd, HH:mm");
    }
  };

  return (
    <div
      className={cn(
        "flex gap-3 max-w-[85%] group",
        isMine ? "ml-auto flex-row-reverse" : "mr-auto",
        message?.shouldShake && "animate-pulse"
      )}
    >
      {!isMine && (
        <Avatar className="h-8 w-8 border border-border shrink-0 self-end shadow-sm">
          <AvatarImage
            src={selectedUser?.profilePicture}
            alt={`${selectedUser?.firstName} ${selectedUser?.lastName}`}
            className="object-cover"
          />
          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-xs font-semibold">
            {otherUserInitials}
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "flex flex-col max-w-full min-w-0",
          isMine ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm shadow-sm break-words max-w-full",
            "border transition-all duration-200",
            "word-wrap break-word overflow-wrap-anywhere",
            isMine
              ? "bg-primary text-primary-foreground rounded-br-md border-primary/20 hover:shadow-md"
              : "bg-card text-foreground rounded-bl-md border-border hover:bg-card/80 hover:shadow-sm"
          )}
        >
          <p className="whitespace-pre-wrap leading-relaxed">
            {message?.message}
          </p>
        </div>

        {/* Timestamp */}
        <span className="mt-1 text-xs text-muted-foreground/70 px-1">
          {formatDistanceToNow(new Date(message?.createdAt), {
            addSuffix: true,
          })}
        </span>
      </div>
    </div>
  );
};

export default Message;
