import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetProductQuery } from '../features/products/api/productsApi';
import { Spinner } from '../shared/ui';
import { ROUTES } from '../shared/config/routes';

export default function ProductDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useGetProductQuery(Number(id));

  if (isLoading) return <Spinner />;

  if (isError || !product) {
    return (
      <div className="page">
        <div className="error-message">{t('products.error')}</div>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to={ROUTES.PRODUCTS} className="back-link">
        &larr; {t('products.backToList')}
      </Link>

      <div className="product-detail">
        <div className="product-detail__images">
          <img
            className="product-detail__main-image"
            src={product.images[0] || product.thumbnail}
            alt={product.title}
          />
          {product.images.length > 1 && (
            <div className="product-detail__gallery">
              {product.images.map((img, i) => (
                <img key={i} src={img} alt={`${product.title} ${i + 1}`} className="product-detail__thumb" />
              ))}
            </div>
          )}
        </div>

        <div className="product-detail__info">
          <span className="product-card__category">{product.category}</span>
          <h1 className="product-detail__title">{product.title}</h1>

          <div className="product-detail__price-row">
            <span className="product-detail__price">${product.price.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <span className="product-detail__discount">
                -{product.discountPercentage.toFixed(0)}%
              </span>
            )}
          </div>

          <div className="product-detail__meta">
            <div className="product-detail__meta-item">
              <span className="product-detail__meta-label">{t('products.rating')}:</span>
              <span>&#9733; {product.rating.toFixed(1)}</span>
            </div>
            <div className="product-detail__meta-item">
              <span className="product-detail__meta-label">{t('products.brand')}:</span>
              <span>{product.brand || '—'}</span>
            </div>
            <div className="product-detail__meta-item">
              <span className="product-detail__meta-label">{t('products.stock')}:</span>
              <span>{product.stock}</span>
            </div>
          </div>

          <div className="product-detail__description">
            <h3>{t('products.description')}</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
