import React from 'react';
import Logo from './Logo';
import SimpleLogo from './SimpleLogo';

const SimpleLogoTest = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Logo Test</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Simple Logo (32px)</h2>
          <SimpleLogo size={32} />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Simple Logo (64px)</h2>
          <SimpleLogo size={64} />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Simple Logo (128px)</h2>
          <SimpleLogo size={128} />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Minimal Logo (32px)</h2>
          <Logo size={32} variant="minimal" animated={true} id="test-minimal" />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Default Logo (64px)</h2>
          <Logo size={64} showText={true} animated={true} id="test-default" />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Text Only</h2>
          <Logo variant="text-only" id="test-text" />
        </div>
      </div>
    </div>
  );
};

export default SimpleLogoTest; 