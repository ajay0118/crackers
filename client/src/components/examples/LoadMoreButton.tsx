import { LoadMoreButton } from '../LoadMoreButton';
import { useState } from 'react';

export default function LoadMoreButtonExample() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
    console.log('Load more clicked');
  };

  return (
    <div className="p-8">
      <LoadMoreButton onClick={handleClick} hasMore={true} loading={loading} />
    </div>
  );
}
