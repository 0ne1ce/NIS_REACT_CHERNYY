import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './Pagination.css';

interface PaginationProps {
  total: number;
  limit: number;
  skip: number;
  onPageChange: (skip: number) => void;
}

export const Pagination = memo(function Pagination({
  total,
  limit,
  skip,
  onPageChange,
}: PaginationProps) {
  const { t } = useTranslation();

  const { currentPage, totalPages } = useMemo(
    () => ({
      currentPage: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(total / limit),
    }),
    [skip, limit, total]
  );

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        className="pagination__btn"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(skip - limit)}
      >
        &larr;
      </button>
      <span className="pagination__info">
        {t('common.page')} {currentPage} {t('common.of')} {totalPages}
      </span>
      <button
        className="pagination__btn"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(skip + limit)}
      >
        &rarr;
      </button>
    </div>
  );
});
