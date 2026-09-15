import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { MessageSquare, Loader2 } from "lucide-react";
import { useCallback } from "react";
import useGetConversations from "../hooks/useGetConversations";
import Conversation from "./conversation";

const Conversations = ({ onConversationSelect }) => {
  const { loading, conversations, error, hasMore, loadMore, loadingMore } =
    useGetConversations();

  const handleLoadMore = useCallback(async () => {
    if (hasMore && !loadingMore) {
      await loadMore();
    }
  }, [hasMore, loadingMore, loadMore]);

  if (loading && conversations.length === 0) {
    return (
      <div className="space-y-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-3 rounded-lg"
          >
            <Skeleton className="h-12 w-12 rounded-full shrink-0" />
            <div className="space-y-2 flex-1 min-w-0">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-2">
        <AlertDescription>
          Failed to load conversations. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!loading && conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">
          No conversations yet
        </h3>
        <p className="text-sm text-muted-foreground">
          Start a new conversation to get chatting
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {conversations.map((conversation) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          onSelect={onConversationSelect}
        />
      ))}

      {hasMore && (
        <div className="p-3">
          <Button
            onClick={handleLoadMore}
            disabled={loadingMore}
            variant="outline"
            className="w-full"
          >
            {loadingMore ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Loading more...
              </>
            ) : (
              "Load more conversations"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Conversations;
