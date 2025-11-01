import { useQuery } from '@tanstack/react-query';
import { fetchBlogPosts, fetchBlogPostsCount } from 'api/blogApi';
import { BlogQueryParameters } from 'types/blog';

export const useBlogPosts = (params: BlogQueryParameters) => {
  // Destructure all parameters
  const { page, limit, search, category_id, sort } = params;

  // Query for the paginated list of posts
  const postsQuery = useQuery({
    // Add all parameters to the queryKey so it refetches when any param changes
    queryKey: ['blogPosts', { page, limit, search, category_id, sort }],
    queryFn: () => fetchBlogPosts(params),
    placeholderData: [], // Prevents flicker during pagination
  });

  // Separate query for the total count
  // This depends only on filters (search, category), not pagination (page, limit) or sort
  const countQuery = useQuery({
    queryKey: ['blogPostsCount', { search, category_id }],
    queryFn: () => fetchBlogPostsCount({ search, category_id }),
  });

  return {
    data: {
      posts: postsQuery.data ?? [],
      totalCount: countQuery.data ?? 0,
    },
    isLoading: postsQuery.isLoading || countQuery.isLoading,
    isError: postsQuery.isError || countQuery.isError,
    error: postsQuery.error as Error | null || countQuery.error as Error | null,
  };
};