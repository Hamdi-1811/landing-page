import { PreviewFrame, SamplePreview } from '../PreviewFrame';

export default function PreviewFrameExample() {
  return (
    <div className="h-[600px]">
      <PreviewFrame deviceMode="desktop">
        <SamplePreview />
      </PreviewFrame>
    </div>
  );
}
