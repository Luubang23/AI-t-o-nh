import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/70 backdrop-blur-lg sticky top-0 z-10 border-b border-slate-200/50">
      <div className="container mx-auto px-4 py-4 flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle>
        </svg>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">
            AI TẠO ẢNH THẺ CHUYÊN NGHIỆP
          </h1>
          <p className="text-slate-500 text-sm">
            Tạo ảnh thẻ hoàn hảo trong vài giây.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;