import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useSocketContext } from "@/context/socket-context";
import { cn } from "@/lib/utils";
import useConversation from "@/zustand/useConversation";

const Conversation = ({ conversation, onSelect }) => {
  const { selectedUser, setSelectedUser } = useConversation();
  const isSelected = selectedUser?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers?.includes(conversation._id);

  const initials = `${conversation.firstName?.[0] || ""}${
    conversation.lastName?.[0] || ""
  }`.toUpperCase();

  const handleClick = () => {
    setSelectedUser(conversation);
    onSelect?.();
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg cursor-pointer",
        "transition-all duration-200 hover:bg-accent/50 active:scale-[0.98]",
        "group touch-manipulation",
        isSelected && "bg-accent border border-accent-foreground/10 shadow-sm"
      )}
      onClick={handleClick}
    >
      <div className="relative shrink-0">
        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-background">
          <AvatarImage
            src={conversation.profilePicture}
            alt={`${conversation.firstName} ${conversation.lastName}`}
            className="object-cover object-center"
          />
          <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs sm:text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        {isOnline && (
          <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1">
            <Badge
              variant="secondary"
              className="h-3 w-3 sm:h-4 sm:w-4 p-0 bg-green-500 hover:bg-green-500 border-2 border-background rounded-full"
            />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p
            className={cn(
              "font-medium text-sm sm:text-base truncate transition-colors",
              isSelected
                ? "text-accent-foreground"
                : "text-foreground group-hover:text-accent-foreground"
            )}
          >
            {conversation.firstName} {conversation.lastName}
          </p>
          {isOnline && (
            <Badge
              variant="outline"
              className="text-xs px-1.5 py-0.5 bg-green-50 text-green-700 border-green-200 shrink-0"
            >
              Online
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground truncate mt-0.5 sm:mt-1">
          {conversation.email}
        </p>
      </div>
    </div>
  );
};

export default Conversation;
