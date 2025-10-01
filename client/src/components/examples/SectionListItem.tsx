import { SectionListItem } from '../SectionListItem';
import { useState } from 'react';

export default function SectionListItemExample() {
  const [isVisible, setIsVisible] = useState(true);
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="max-w-md bg-sidebar p-4 rounded-lg">
      <SectionListItem
        id="hero-1"
        type="hero"
        label="Hero Section"
        isVisible={isVisible}
        isActive={isActive}
        onToggleVisibility={() => setIsVisible(!isVisible)}
        onDuplicate={() => console.log('Duplicate')}
        onDelete={() => console.log('Delete')}
        onClick={() => setIsActive(!isActive)}
      />
    </div>
  );
}
