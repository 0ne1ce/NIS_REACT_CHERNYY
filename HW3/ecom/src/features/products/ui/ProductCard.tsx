import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../../entities/product/model/types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <img
        className="product-card__image"
        src={product.thumbnail}
        alt={product.title}
        loading="lazy"
      />
      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__title">{product.title}</h3>
        <div className="product-card__footer">
          <span className="product-card__price">
            ${product.price.toFixed(2)}
          </span>
          <span className="product-card__rating">
            {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
});
