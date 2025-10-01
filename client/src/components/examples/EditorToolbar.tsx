import { EditorToolbar } from '../EditorToolbar';
import { useState } from 'react';

export default function EditorToolbarExample() {
  const [projectName, setProjectName] = useState('Shell Helix Campaign');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <div className="border rounded-lg overflow-hidden">
      <EditorToolbar
        projectName={projectName}
        onProjectNameChange={setProjectName}
        onPreview={() => console.log('Preview')}
        onExport={() => console.log('Export')}
        onSave={() => console.log('Save')}
        deviceMode={deviceMode}
        onDeviceModeChange={setDeviceMode}
      />
    </div>
  );
}
