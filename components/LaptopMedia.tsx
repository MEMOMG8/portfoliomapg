'use client';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import type { ShowcaseProject } from '@/lib/showcase';
import track from '@/lib/laptop-screen-track.json';
import { screenTransform } from '@/lib/screen-transform';
import ProjectArtwork from './ProjectArtwork';
export type LaptopHandle = {start:(midpoint:()=>void,complete:()=>void)=>void;pause:()=>void;resume:()=>void;reset:()=>void;};
const LaptopMedia = forwardRef<LaptopHandle, { project: ShowcaseProject }>(function LaptopMedia({project}, ref) {
  const container=useRef<HTMLDivElement>(null),video=useRef<HTMLVideoElement>(null),screen=useRef<HTMLDivElement>(null);
  const callbacks=useRef<{midpoint:()=>void;complete:()=>void;swapped:boolean}|null>(null);
  const timeout=useRef<ReturnType<typeof setTimeout>>(),serial=useRef(0);
  const draw=useCallback((time:number) => {
    const mount=container.current,plane=screen.current;if(!mount||!plane)return;
    const index=Math.max(0,Math.min(track.frames.length-1,Math.floor(time*track.fps+.001)));
    plane.style.transform=screenTransform(track.frames[index],mount.clientWidth,mount.clientWidth*track.height/track.width);
    plane.style.visibility='visible';mount.dataset.frame=String(index);
    if(callbacks.current&&time>=1.25&&!callbacks.current.swapped){callbacks.current.swapped=true;callbacks.current.midpoint();}
  },[]);
  const finish=useCallback(() => {
    const pending=callbacks.current;callbacks.current=null;clearTimeout(timeout.current);
    if(pending){if(!pending.swapped)pending.midpoint();pending.complete();}
    if(video.current){video.current.pause();video.current.currentTime=0;}draw(0);
  },[draw]);
  const reset=useCallback(() => {serial.current++;callbacks.current=null;clearTimeout(timeout.current);if(video.current){video.current.pause();video.current.currentTime=0;}draw(0);},[draw]);
  useImperativeHandle(ref,() => ({
    start(midpoint,complete){
      reset();const request=serial.current;callbacks.current={midpoint,complete,swapped:false};const player=video.current;
      if(!player){finish();return;}if(!player.getAttribute('src'))player.src='/projects/laptop/motion.mp4';
      timeout.current=setTimeout(()=>{if(serial.current===request)finish();},12000);
      player.play().catch(()=>{if(serial.current===request)finish();});
    },
    pause(){video.current?.pause();clearTimeout(timeout.current);},
    resume(){if(callbacks.current){clearTimeout(timeout.current);timeout.current=setTimeout(finish,12000);video.current?.play().catch(finish);}},reset,
  }),[reset,finish]);
  useEffect(() => {
    const mount=container.current,player=video.current;if(!mount||!player)return;
    const resize=new ResizeObserver(()=>draw(player.currentTime));resize.observe(mount);draw(0);let disposed=false,frame=0;
    const hasVideoFrames='requestVideoFrameCallback' in player;
    const videoFrame=(_now:number,metadata:VideoFrameCallbackMetadata)=>{if(disposed)return;draw(metadata.mediaTime);frame=player.requestVideoFrameCallback(videoFrame);};
    const animationFrame=()=>{if(disposed)return;draw(player.currentTime);frame=requestAnimationFrame(animationFrame);};
    if(hasVideoFrames)frame=player.requestVideoFrameCallback(videoFrame);else frame=requestAnimationFrame(animationFrame);
    return()=>{disposed=true;resize.disconnect();clearTimeout(timeout.current);callbacks.current=null;if(hasVideoFrames)player.cancelVideoFrameCallback(frame);else cancelAnimationFrame(frame);player.pause();};
  },[draw]);
  return <div className="mp-real-laptop" ref={container} data-project={project.id}>
    <video ref={video} poster="/projects/laptop/poster.webp" preload="none" muted playsInline aria-hidden="true" onEnded={finish} onError={finish} onSeeked={event=>draw(event.currentTarget.currentTime)}/>
    <div ref={screen} className="mp-laptop-screen"><ProjectArtwork project={project} screen/></div>
  </div>;
});
export default LaptopMedia;
