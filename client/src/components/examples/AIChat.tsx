import { AIChat } from '../AIChat';

export default function AIChatExample() {
  return (
    <div className="h-[500px] max-w-md border rounded-lg overflow-hidden">
      <AIChat
        onSendMessage={(msg) => console.log('Send:', msg)}
        onFileUpload={(file) => console.log('Upload:', file.name)}
      />
    </div>
  );
}
