import React from 'react';
import Logo from './Logo';

const LogoDemo = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">QuillCache Logo Showcase</h1>
      
      {/* Default Logo */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Default Animated Logo</h2>
        <div className="flex items-center justify-center">
          <Logo size={200} showText={true} animated={true} id="demo-default" />
        </div>
      </div>
      
      {/* Minimal Logo */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Minimal Logo (Various Sizes)</h2>
        <div className="flex items-center justify-center space-x-8">
          <Logo size={32} variant="minimal" animated={true} id="demo-minimal-32" />
          <Logo size={48} variant="minimal" animated={true} id="demo-minimal-48" />
          <Logo size={64} variant="minimal" animated={true} id="demo-minimal-64" />
          <Logo size={96} variant="minimal" animated={true} id="demo-minimal-96" />
        </div>
      </div>
      
      {/* Text Only */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Text Only Variant</h2>
        <div className="flex items-center justify-center">
          <Logo variant="text-only" />
        </div>
      </div>
      
      {/* Non-animated versions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Non-animated Versions</h2>
        <div className="flex items-center justify-center space-x-8">
          <Logo size={64} variant="minimal" animated={false} id="demo-static-minimal" />
          <Logo size={120} showText={true} animated={false} id="demo-static-default" />
        </div>
      </div>
      
      {/* Logo without text */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Logo without Text</h2>
        <div className="flex items-center justify-center space-x-8">
          <Logo size={80} showText={false} animated={true} id="demo-no-text-80" />
          <Logo size={120} showText={false} animated={true} id="demo-no-text-120" />
        </div>
      </div>
    </div>
  );
};

export default LogoDemo; 