import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../shared/lib/hooks';
import { selectPageSize } from '../features/settings/model/selectors';
import { useGetProductsQuery } from '../features/products/api/productsApi';
import { ProductList } from '../features/products/ui/ProductList';
import { ProductSearch } from '../features/products/ui/ProductSearch';
import { Pagination } from '../features/products/ui/Pagination';
import { Spinner } from '../shared/ui';

export default function ProductsPage() {
  const { t } = useTranslation();
  const pageSize = useAppSelector(selectPageSize);
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('q') || '';
  const skip = Number(searchParams.get('skip')) || 0;

  const { data, isLoading, isError } = useGetProductsQuery({
    limit: pageSize,
    skip,
    q: q || undefined,
  });

  const handleSearchChange = useCallback(
    (value: string) => {
      const params: Record<string, string> = {};
      if (value) params.q = value;
      setSearchParams(params);
    },
    [setSearchParams]
  );

  const handlePageChange = useCallback(
    (newSkip: number) => {
      const params: Record<string, string> = { skip: String(newSkip) };
      if (q) params.q = q;
      setSearchParams(params);
    },
    [q, setSearchParams]
  );

  return (
    <div className="page">
      <h1 className="page__title">{t('products.title')}</h1>

      <ProductSearch value={q} onChange={handleSearchChange} />

      {isLoading && <Spinner />}

      {isError && (
        <div className="error-message">{t('products.error')}</div>
      )}

      {data && (
        <>
          <ProductList products={data.products} />
          <Pagination
            total={data.total}
            limit={pageSize}
            skip={skip}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
