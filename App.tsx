import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import SizeSelector from './components/SizeSelector';
import GeneratedImageDisplay from './components/GeneratedImageDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { generatePassportPhoto } from './services/geminiService';
import { PhotoSize } from './types';
import { PHOTO_SIZES } from './constants';

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<{ file: File; preview: string } | null>(null);
  const [selectedSize, setSelectedSize] = useState<PhotoSize>(PHOTO_SIZES[0]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setUploadedImage({ file, preview: URL.createObjectURL(file) });
    setGeneratedImage(null);
    setError(null);
  };
  
  const handleSizeSelect = (size: PhotoSize) => {
    setSelectedSize(size);
  };

  const handleSubmit = useCallback(async () => {
    if (!uploadedImage) {
      setError("Vui lòng tải ảnh lên trước khi tạo.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generatePassportPhoto(uploadedImage.file, selectedSize.label);
      setGeneratedImage(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Đã xảy ra lỗi khi tạo ảnh. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  }, [uploadedImage, selectedSize]);


  return (
    <div className="bg-gradient-to-br from-cyan-50 to-blue-200 min-h-screen text-slate-800">
      <Header />
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 border border-slate-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left Column: Uploader and Controls */}
            <div className="flex flex-col space-y-8">
              <ImageUploader onImageUpload={handleImageUpload} imagePreview={uploadedImage?.preview ?? null} />
              
              <SizeSelector 
                sizes={PHOTO_SIZES}
                selectedSize={selectedSize}
                onSelectSize={handleSizeSelect} 
              />
              
              <button
                onClick={handleSubmit}
                disabled={!uploadedImage || isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 px-4 rounded-xl hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed flex items-center justify-center text-lg shadow-lg hover:shadow-blue-500/50"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                  </>
                ) : (
                  '✨ Tạo ảnh thẻ ngay'
                )}
              </button>
            </div>

            {/* Right Column: Result Display */}
            <div className="bg-gray-50/70 rounded-xl p-4 h-[500px] flex items-center justify-center border border-slate-200">
              {isLoading && <LoadingSpinner />}
              {error && !isLoading && <ErrorMessage message={error} />}
              {generatedImage && !isLoading && <GeneratedImageDisplay imageSrc={generatedImage} />}
              {!isLoading && !error && !generatedImage && (
                <div className="text-center text-slate-500 p-8">
                   <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-20 w-20 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M20.4 14.5L16 10 4 20"/>
                  </svg>
                  <h3 className="mt-4 text-lg font-semibold text-slate-600">Kết quả của bạn</h3>
                  <p className="mt-1 text-sm">Ảnh thẻ được AI tạo ra sẽ xuất hiện ở đây.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <footer className="text-center mt-8 text-slate-600 font-medium text-sm">
          <p>Cung cấp bởi AI. Chất lượng ảnh có thể thay đổi.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;