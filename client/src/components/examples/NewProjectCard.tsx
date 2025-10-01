import { NewProjectCard } from '../NewProjectCard';

export default function NewProjectCardExample() {
  return (
    <div className="max-w-sm">
      <NewProjectCard onClick={() => console.log('Create new project')} />
    </div>
  );
}
