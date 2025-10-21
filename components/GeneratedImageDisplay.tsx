import React from 'react';

interface GeneratedImageDisplayProps {
  imageSrc: string;
}

const GeneratedImageDisplay: React.FC<GeneratedImageDisplayProps> = ({ imageSrc }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
      <div className="w-full h-full max-h-[400px] flex items-center justify-center">
         <img 
          src={imageSrc} 
          alt="Ảnh thẻ đã tạo" 
          className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
        />
      </div>
      <a
        href={imageSrc}
        download="anh_the_AI.png"
        className="bg-green-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-green-600/50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span>Tải xuống</span>
      </a>
    </div>
  );
};

export default GeneratedImageDisplay;