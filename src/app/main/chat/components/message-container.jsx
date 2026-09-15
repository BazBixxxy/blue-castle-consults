import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Phone, Video, MoreVertical, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import useConversation from "@/zustand/useConversation";
import { useEffect } from "react";
import Messages from "./messages";
import MessageInput from "./message-input";
import { useSocketContext } from "@/context/socket-context";

const MessageContainer = ({ onMenuClick }) => {
  const { selectedUser } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isOnline = selectedUser && onlineUsers?.includes(selectedUser._id);

  useEffect(() => {
    // Cleanup function can be uncommented if needed
    // return () => setSelectedUser(null);
  }, [selectedUser]);

  if (!selectedUser) {
    return (
      <section className="flex-1 flex flex-col">
        {/* Mobile header for no conversation state */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b bg-card">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="h-9 w-9"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold">Messages</h1>
          <div className="w-9" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted/20 p-8">
          <div className="text-center max-w-md mx-auto">
            <div className="relative mb-6">
              <MessageSquare className="h-20 w-20 text-primary/20 mx-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-primary/5 rounded-full blur-xl" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Welcome to Messages
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Select a conversation from the sidebar to start chatting with your
              contacts
            </p>
            <Button
              onClick={onMenuClick}
              className="lg:hidden shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Menu className="h-4 w-4 mr-2" />
              Browse Conversations
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const initials = `${selectedUser.firstName?.[0] || ""}${
    selectedUser.lastName?.[0] || ""
  }`.toUpperCase();

  return (
    <section className="flex-1 flex flex-col bg-background min-h-0 max-h-screen">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card/80 backdrop-blur-md shrink-0 shadow-sm">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="h-9 w-9 lg:hidden shrink-0"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="relative shrink-0">
            <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
              <AvatarImage
                src={selectedUser.profilePicture}
                alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            {isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5">
                <div className="h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-background shadow-sm" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-foreground truncate">
              {selectedUser.firstName} {selectedUser.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isOnline ? "Active now" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-accent"
          >
            <Phone className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-accent"
          >
            <Video className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-accent"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area - Explicitly sized */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <Messages />
      </div>

      {/* Message Input - Always visible */}
      <div className="shrink-0 p-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <MessageInput />
      </div>
    </section>
  );
};

export default MessageContainer;
