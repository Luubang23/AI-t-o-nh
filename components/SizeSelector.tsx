import React from 'react';
import { PhotoSize } from '../types';

interface SizeSelectorProps {
  sizes: PhotoSize[];
  selectedSize: PhotoSize;
  onSelectSize: (size: PhotoSize) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, selectedSize, onSelectSize }) => {
  return (
    <div>
      <label className="text-xl font-bold text-slate-800 mb-3 block">2. Chọn kích thước</label>
      <div className="flex w-full bg-gray-100 p-1 rounded-xl border border-slate-200">
        {sizes.map((size) => (
          <button
            key={size.label}
            onClick={() => onSelectSize(size)}
            className={`w-full p-3 rounded-lg text-center font-bold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${
              selectedSize.label === size.label
                ? 'bg-white text-blue-600 shadow'
                : 'text-slate-600 hover:bg-gray-200'
            }`}
          >
            {size.label} cm
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;