import { ProjectCard } from '../ProjectCard';

export default function ProjectCardExample() {
  return (
    <div className="max-w-sm">
      <ProjectCard
        id="1"
        name="Shell Helix Campaign"
        lastEdited="2 hours ago"
        onOpen={() => console.log('Open project')}
        onDelete={() => console.log('Delete project')}
        onDuplicate={() => console.log('Duplicate project')}
        onExport={() => console.log('Export project')}
      />
    </div>
  );
}
