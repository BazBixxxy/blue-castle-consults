import ChatSidebar from "../components/chat-sidebar";
import MessageContainer from "../components/message-container";
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const ChatPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen max-h-screen bg-background overflow-hidden">
      <div className="flex h-full">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <ChatSidebar onConversationSelect={() => {}} />
        </div>

        {/* Mobile Sidebar using Sheet */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-80 lg:hidden">
            <ChatSidebar
              onConversationSelect={() => setSidebarOpen(false)}
              isMobile={true}
            />
          </SheetContent>
        </Sheet>

        {/* Message Container */}
        <MessageContainer onMenuClick={() => setSidebarOpen(true)} />
      </div>
    </div>
  );
};

export default ChatPage;
