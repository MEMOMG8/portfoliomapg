import Image from 'next/image';
import type { ShowcaseProject } from '@/lib/showcase';
export default function ProjectArtwork({ project, screen = false }: { project: ShowcaseProject; screen?: boolean }) {
  if (project.image) return <Image src={project.image} alt={`${project.name} screenshot`} width={1000} height={673}
    sizes={screen ? '(max-width: 600px) 75vw, 40vw' : '(max-width: 600px) 90vw, (max-width: 900px) 45vw, 30vw'} className={screen ? 'mp-screen-image' : undefined} />;
  return <div className={`mp-art${screen ? ' mp-screen-art' : ''}`} aria-label={`${project.name}: concept illustration`}>
    {project.id === 'deskpilot' && <div className="mp-wave" aria-hidden="true">{[20,35,60,90,48,74,100,62,38,82,53,26].map((height,i) => <span key={i} style={{height:`${height}%`}} />)}</div>}
    <strong>{project.art || project.name}</strong><span className="mp-path">{project.path}</span><small>Concept illustration</small>
  </div>;
}
