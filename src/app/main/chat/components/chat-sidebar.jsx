import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Conversations from "./conversations";
import SearchBar from "@/components/navbar/search-component";
import { Badge } from "@/components/ui/badge";

const ChatSidebar = ({ onConversationSelect, className, isMobile = false }) => {
  return (
    <aside
      className={cn(
        "w-full h-full bg-card border-r border-border flex flex-col",
        isMobile ? "lg:w-80" : "w-80 xl:w-96",
        className
      )}
    >
      <div className="p-4 border-b border-border shrink-0">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Messages{" "}
          <Badge variant="outline" className="bg-green-600 text-white h-4">
            Beta
          </Badge>
        </h2>
        <SearchBar />
      </div>

      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="p-2">
            <Conversations onConversationSelect={onConversationSelect} />
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
};

export default ChatSidebar;
