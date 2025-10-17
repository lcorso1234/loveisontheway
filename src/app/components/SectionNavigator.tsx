'use client';

import { useEffect, useState } from 'react';

const sections = ['section-1','section-2','section-3','section-4','section-5'];

export default function SectionNavigator(){
  const [active, setActive] = useState('section-1');

  useEffect(()=>{
    const onKey = (e: KeyboardEvent) =>{
      if(e.key === 'ArrowDown' || e.key === 'PageDown'){
        const idx = sections.indexOf(active);
        const next = sections[Math.min(sections.length-1, idx+1)];
        const el = document.getElementById(next);
        if(el){ el.scrollIntoView({behavior:'smooth'}); setActive(next); }
      }
      if(e.key === 'ArrowUp' || e.key === 'PageUp'){
        const idx = sections.indexOf(active);
        const prev = sections[Math.max(0, idx-1)];
        const el = document.getElementById(prev);
        if(el){ el.scrollIntoView({behavior:'smooth'}); setActive(prev); }
      }
    };

    const onScroll = () =>{
      let nearest = active;
      let minDist = Infinity;
      sections.forEach(id=>{
        const el = document.getElementById(id);
        if(!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top);
        if(dist < minDist){ minDist = dist; nearest = id; }
      });
      setActive(nearest);
    }

    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, {passive:true});
    return ()=>{
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
    }
  },[active]);

  return null;
}
