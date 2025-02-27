interface ILoadMore {
  isLoading: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export const handleLoadMore = ({
  isLoading,
  hasNextPage,
  fetchNextPage,
}: ILoadMore) => {
  if (!isLoading && hasNextPage) {
    fetchNextPage();
  }
};
