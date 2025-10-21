import React, { useRef, useCallback, useState } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imagePreview: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imagePreview }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div>
      <label className="text-xl font-bold text-slate-800 mb-3 block">1. Tải ảnh của bạn lên</label>
      <div
        className={`relative border-2 border-slate-200 rounded-xl p-4 text-center cursor-pointer bg-gray-50 aspect-square flex flex-col items-center justify-center group transition-all duration-300 ${isDragging ? 'border-blue-500 bg-blue-50 scale-105' : 'hover:border-blue-400'}`}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        {imagePreview ? (
          <img src={imagePreview} alt="Xem trước" className="max-h-full max-w-full object-contain rounded-lg" />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-500 space-y-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="font-semibold text-slate-600">Nhấn để tải lên hoặc kéo thả</p>
            <p className="text-sm text-slate-400">Hỗ trợ: PNG, JPG, WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;