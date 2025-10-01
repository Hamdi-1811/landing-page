import { BrandKit } from '../BrandKit';
import { useState } from 'react';

export default function BrandKitExample() {
  const [primaryColor, setPrimaryColor] = useState('#8b5cf6');
  const [secondaryColor, setSecondaryColor] = useState('#10b981');

  return (
    <div className="max-w-md bg-sidebar rounded-lg">
      <BrandKit
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        onLogoUpload={(file) => console.log('Upload logo:', file.name)}
        onLogoRemove={() => console.log('Remove logo')}
        onPrimaryColorChange={setPrimaryColor}
        onSecondaryColorChange={setSecondaryColor}
      />
    </div>
  );
}
