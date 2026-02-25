import { memo } from 'react';
import './Spinner.css';

export const Spinner = memo(function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner" />
    </div>
  );
});
