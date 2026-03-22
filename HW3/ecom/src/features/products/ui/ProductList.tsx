import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Product } from '../../../entities/product/model/types';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
}

export const ProductList = memo(function ProductList({ products }: ProductListProps) {
  const { t } = useTranslation();

  if (products.length === 0) {
    return <p className="empty-state">{t('products.noProducts')}</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});
