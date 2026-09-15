import conversationsApi from "@/services/api/conversationsApi";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("searchTerm") || "";
  const ITEMS_PER_PAGE = 10;

  const fetchConversations = useCallback(
    async (page = 0, isLoadMore = false) => {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const res = await conversationsApi.fetchConversations({
          page,
          limit: ITEMS_PER_PAGE,
          search: searchTerm,
        });

        // Handle the actual API response structure
        const response = res.data.data || [];
        const total = res.data.total || 0;
        const apiHasMore =
          res.data.hasMore !== undefined ? res.data.hasMore : false;

        // Filter conversations based on search term (client-side filtering as backup)
        const filteredConversations = searchTerm
          ? response.filter((conversation) =>
              `${conversation.firstName} ${conversation.lastName}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
          : response;

        if (isLoadMore) {
          setConversations((prev) => [...prev, ...filteredConversations]);
        } else {
          setConversations(filteredConversations);
        }

        // Determine if there are more items to load
        // Use API hasMore if available, otherwise calculate based on total
        if (res.data.hasMore !== undefined) {
          setHasMore(apiHasMore);
        } else {
          const totalLoaded = isLoadMore
            ? conversations.length + filteredConversations.length
            : filteredConversations.length;
          setHasMore(totalLoaded < total);
        }
      } catch (error) {
        console.error("Error fetching conversations: ", error);
        setError(error.message || "Failed to fetch conversations");
        setHasMore(false);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [searchTerm]
  );

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore || loading) return;

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await fetchConversations(nextPage, true);
  }, [currentPage, hasMore, loadingMore, loading, fetchConversations]);

  // Reset pagination when search term changes
  useEffect(() => {
    setCurrentPage(0);
    setConversations([]);
    setHasMore(true);
    fetchConversations(0, false);
  }, [searchTerm]);

  return {
    loading,
    loadingMore,
    conversations,
    error,
    hasMore,
    loadMore,
  };
};

export default useGetConversations;
