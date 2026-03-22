import { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const ProductSearch = memo(function ProductSearch({ value, onChange }: ProductSearchProps) {
  const { t } = useTranslation();
  const [input, setInput] = useState(value);

  useEffect(() => {
    setInput(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input !== value) {
        onChange(input);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [input, value, onChange]);

  return (
    <div className="product-search">
      <input
        type="text"
        className="product-search__input"
        placeholder={t('products.search')}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
});
