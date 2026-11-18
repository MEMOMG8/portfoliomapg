'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { featuredProjects, showcaseProjects, projectRepository, type ShowcaseProject } from '@/lib/showcase';
import LaptopMedia, { type LaptopHandle } from './LaptopMedia';
import ProjectArtwork from './ProjectArtwork';
import './project-showcase.css';
const AREAS=['All','AI & ML','Web & backend','Cloud','Desktop','Data'];
const technologies=Array.from(new Set(showcaseProjects.flatMap(p=>p.tech))).sort();
const featureTechnologies=Array.from(new Set(featuredProjects.flatMap(p=>p.tech))).sort();
function ProjectLinks({project}:{project:ShowcaseProject}) {
  const repo=projectRepository(project);
  return <div className="mp-actions">{project.demo&&<a href={project.demo} target="_blank" rel="noopener noreferrer">Visit ↗</a>}{repo&&<a href={repo} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}{project.id==='scivis'&&<a href="/scivis-paper.docx" download>Download paper ↓</a>}</div>;
}
export default function Projects() {
  const [platform,setPlatform]=useState(''),[featureTech,setFeatureTech]=useState('');
  const featured=useMemo(()=>featuredProjects.filter(p=>(!platform||p.platform===platform)&&(!featureTech||p.tech.includes(featureTech))),[platform,featureTech]);
  const [index,setIndex]=useState(0),[playing,setPlaying]=useState(true),[reduced,setReduced]=useState(false);
  const [visible,setVisible]=useState(false),[documentVisible,setDocumentVisible]=useState(true);
  const [area,setArea]=useState('All'),[technology,setTechnology]=useState(''),[expanded,setExpanded]=useState(false);
  const matches=showcaseProjects.filter(p=>(area==='All'||p.area.includes(area))&&(!technology||p.tech.includes(technology)));
  const project=featured[index]||featured[0];
  const stage=useRef<HTMLElement>(null),laptop=useRef<LaptopHandle>(null),progress=useRef<HTMLDivElement>(null);
  const elapsed=useRef(0),transition=useRef<{manual:boolean}|null>(null),beginRef=useRef<(next:number,manual?:boolean)=>void>(()=>{});
  const paint=()=>progress.current?.querySelectorAll<HTMLElement>('[data-progress]').forEach((bar,i)=>bar.style.setProperty('--mp-progress',String(i<index?1:i===index?Math.min(elapsed.current/8000,1):0)));
  const choose=(next:number,manual=true)=>{
    if(!featured.length)return;const target=(next+featured.length)%featured.length;laptop.current?.reset();elapsed.current=manual?0:8000;
    if(reduced||target===index){transition.current=null;setIndex(target);paint();return;}
    transition.current={manual};laptop.current?.start(()=>{setIndex(target);elapsed.current=0;},()=>{transition.current=null;elapsed.current=0;});
  };
  beginRef.current=choose;
  const changeFilter=(which:'platform'|'technology',value:string)=>{laptop.current?.reset();transition.current=null;elapsed.current=0;setIndex(0);if(which==='platform')setPlatform(value);else setFeatureTech(value);};
  useEffect(()=>{
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    const change=()=>{setReduced(media.matches);if(media.matches){setPlaying(false);laptop.current?.reset();transition.current=null;elapsed.current=0;}};
    change();media.addEventListener('change',change);
    const visibility=()=>setDocumentVisible(!document.hidden);visibility();document.addEventListener('visibilitychange',visibility);
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.15});if(stage.current)observer.observe(stage.current);
    return()=>{media.removeEventListener('change',change);document.removeEventListener('visibilitychange',visibility);observer.disconnect();};
  },[]);
  useEffect(()=>{
    const active=visible&&documentVisible;if(active&&(playing||transition.current?.manual))laptop.current?.resume();else laptop.current?.pause();
    if(!active||!playing||reduced||featured.length<2)return;
    let frame=0,last:number|null=null;
    const tick=(now:number)=>{if(last!==null&&!transition.current){elapsed.current+=Math.min(now-last,100);if(elapsed.current>=8000){elapsed.current=8000;beginRef.current(index+1,false);}}last=now;paint();frame=requestAnimationFrame(tick);};
    frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame);
  // Mutable elapsed and transition refs avoid rendering React on every animation frame.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[playing,visible,documentVisible,reduced,featured,index]);
  useEffect(()=>{paint();},[index,featured]); // eslint-disable-line react-hooks/exhaustive-deps
  const togglePlay=()=>{if(playing&&transition.current)transition.current.manual=false;setPlaying(!playing);};
  return <section id="projects" className="mp-showcase-section" aria-label="Projects and contributions"><div id="mp-project-preview">
    <section className="mp-featured" ref={stage} data-section-tone="dark" aria-labelledby="mp-projects-title" onFocusCapture={event=>{if(event.target.id!=='mp-play'&&event.target.matches(':focus-visible'))setPlaying(false);}}>
      <div className="mp-feature-top"><div className="mp-feature-filters">
        <div className="mp-stepper" role="group" aria-label="Browse featured projects"><button type="button" aria-label="Previous featured project" disabled={featured.length<2} onClick={()=>choose(index-1)}>▲</button><button type="button" aria-label="Next featured project" disabled={featured.length<2} onClick={()=>choose(index+1)}>▼</button></div>
        <select aria-label="Filter featured projects by platform" value={platform} onChange={e=>changeFilter('platform',e.target.value)}><option value="">Platform</option>{['Web app','Desktop','Data app'].map(value=><option key={value}>{value}</option>)}</select>
        <select aria-label="Filter featured projects by technology" value={featureTech} onChange={e=>changeFilter('technology',e.target.value)}><option value="">Technology</option>{featureTechnologies.map(value=><option key={value}>{value}</option>)}</select>
      </div><div className="mp-title-group"><h2 id="mp-projects-title">Projects</h2><span className="mp-counter">{featured.length?index+1:0}/{featured.length}</span></div></div>
      {project?<div className="mp-feature-grid"><div className="mp-feature-copy" aria-live={playing?'off':'polite'}>
        <h3>{project.name}</h3><div className="mp-tags">{project.tech.slice(0,3).map(tag=><span key={tag}>{tag}</span>)}</div><p>{project.featureDescription}</p>
        <div className="mp-actions"><a className="mp-primary" href={project.demo||projectRepository(project)} target="_blank" rel="noopener noreferrer">{project.demo?'Visit':'View project'}</a></div>
      </div><div className="mp-feature-media"><LaptopMedia ref={laptop} project={project}/><p className="mp-caption">{project.name} · {project.image?'Project screenshot':'Voice workflow concept'}</p></div></div>:<div className="mp-empty"><p>No featured projects match these filters.</p><button type="button" className="mp-primary" onClick={()=>{changeFilter('platform','');setFeatureTech('');}}>Clear filters</button></div>}
      <div className="mp-carousel-footer"><div className="mp-slide-picks" ref={progress} aria-label="Choose a featured project">{featured.map((p,i)=><button type="button" key={p.id} className="mp-pick" data-progress aria-label={`Show ${p.name}`} aria-current={i===index?'true':undefined} onClick={()=>choose(i)}/>)}</div><button id="mp-play" type="button" className="mp-play" disabled={featured.length<2||reduced} aria-label={playing?'Pause automatic slideshow':'Play automatic slideshow'} onClick={togglePlay}>{playing&&!reduced?'Pause':'Play'}</button></div>
    </section>
    <section className="mp-explore" data-section-tone="light" aria-labelledby="mp-explore-title">
      <div className="mp-heading"><h2 id="mp-explore-title">Explore the work.</h2><span className="mp-count" aria-live="polite">{matches.length} projects</span></div>
      <div className="mp-filterbar"><div className="mp-filters" aria-label="Filter projects by area">{AREAS.map(value=><button type="button" key={value} className="mp-filter" aria-pressed={area===value} onClick={()=>{setArea(value);setExpanded(false);}}>{value}</button>)}</div><label className="mp-techlabel">Technology<select value={technology} onChange={e=>{setTechnology(e.target.value);setExpanded(false);}}><option value="">All technologies</option>{technologies.map(value=><option key={value}>{value}</option>)}</select></label></div>
      <div className="mp-grid">{(expanded?matches:matches.slice(0,6)).map(p=><article className="mp-project" key={p.id}><div className="mp-thumbnail"><ProjectArtwork project={p}/></div><h3>{p.name}</h3><p>{p.desc}</p><div className="mp-tags">{p.tech.slice(0,3).map(tag=><span key={tag}>{tag}</span>)}</div><details><summary>Project details</summary><div className="mp-details"><p>{p.detail}</p><ProjectLinks project={p}/></div></details></article>)}{matches.length===0&&<p className="mp-empty">No projects match these filters. Choose another area or technology.</p>}</div>
      {matches.length>6&&<div className="mp-more-row"><button type="button" className="mp-more" aria-expanded={expanded} onClick={()=>setExpanded(!expanded)}>{expanded?'Show fewer projects ↑':`View all ${matches.length} projects ↓`}</button></div>}
    </section>
    <section className="mp-contributions" data-section-tone="dark" aria-labelledby="mp-contributions-title">
      <div className="mp-heading"><h2 id="mp-contributions-title">Contributions.</h2><p>Features, fixes and tests<br/>in existing codebases.</p></div><div className="mp-contribution-grid">
        <article className="mp-contribution"><h3>CineLog</h3><p>A watchlist feature with duplicate protection, visibility settings and tests.</p><a href="https://github.com/MEMOMG8/ai201-project6-cinelog-starter/tree/feature/watchlist" target="_blank" rel="noopener noreferrer">View contribution ↗</a></article>
        <article className="mp-contribution"><h3>Mixtape</h3><p>Fixes for missing playlist tracks, rating notifications and listening streaks.</p><a href="https://github.com/MEMOMG8/ai201-project5-mixtape-starter/tree/bugfix/mixtape" target="_blank" rel="noopener noreferrer">View contribution ↗</a></article>
        <article className="mp-contribution"><h3>PathReview</h3><p>Async mock corrections with documented reproduction and review-service tests.</p><a href="https://github.com/MEMOMG8/pathreview/tree/fix/158-review-service-async-mocks" target="_blank" rel="noopener noreferrer">View contribution ↗</a></article>
      </div>
    </section>
  </div></section>;
}
