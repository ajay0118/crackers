import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';
import { LoadMoreButton } from '@/components/LoadMoreButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { Product } from '@shared/schema';

const ITEMS_PER_PAGE = 12;

export default function Products() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [itemsToShow, setItemsToShow] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    import('@/data/products.json').then((data) => {
      setAllProducts(data.default);
    });
  }, []);

  useEffect(() => {
    let filtered = allProducts;

    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    setDisplayedProducts(filtered);
    setItemsToShow(ITEMS_PER_PAGE);
  }, [search, selectedCategories, allProducts]);

  const categories = Array.from(new Set(allProducts.map((p) => p.category)));
  const visibleProducts = displayedProducts.slice(0, itemsToShow);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold mb-4" data-testid="text-page-title">
          Our Products
        </h1>
        <p className="text-muted-foreground text-lg mb-6">
          Browse our complete collection of premium fireworks and crackers
        </p>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-4">Categories</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center gap-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryToggle(category)}
                          data-testid={`checkbox-${category.toLowerCase().replace(/\s+/g, '-')}`}
                        />
                        <Label
                          htmlFor={category}
                          className="text-sm cursor-pointer"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedCategories.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCategories([])}
                    className="w-full"
                    data-testid="button-clear-filters"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </aside>

        <div className="lg:col-span-3">
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {visibleProducts.length} of {displayedProducts.length} products
          </div>

          {displayedProducts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">
                  No products found. Try adjusting your search or filters.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <LoadMoreButton
                onClick={handleLoadMore}
                hasMore={visibleProducts.length < displayedProducts.length}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
