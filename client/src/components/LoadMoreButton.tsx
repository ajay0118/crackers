import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface LoadMoreButtonProps {
  onClick: () => void;
  hasMore: boolean;
  loading?: boolean;
}

export function LoadMoreButton({ onClick, hasMore, loading }: LoadMoreButtonProps) {
  if (!hasMore) {
    return null;
  }

  return (
    <div className="flex justify-center mt-8">
      <Button
        variant="outline"
        size="lg"
        onClick={onClick}
        disabled={loading}
        data-testid="button-load-more"
      >
        {loading ? 'Loading...' : 'Load More'}
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
