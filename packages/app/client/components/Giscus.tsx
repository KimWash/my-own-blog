import { useEffect, useRef } from 'react';

interface GiscusProps {
  reactionsEnabled?: '0' | '1'; // use '1' to enable reactions
  theme?: 'preferred_color_scheme' | 'light' | 'dark'; // depends on theme options
  loading?: 'lazy' | 'eager'; // loading behavior
  lang?: string; // e.g., 'ko'
}


export default function Giscus({reactionsEnabled}: GiscusProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://giscus.app/client.js';
    scriptElem.async = true;
    scriptElem.crossOrigin = 'anonymous';

    scriptElem.setAttribute('data-repo', 'KimWash/my-own-blog');
    scriptElem.setAttribute('data-repo-id', 'R_kgDOLMCPwQ');
    scriptElem.setAttribute('data-category', 'Announcements');
    scriptElem.setAttribute('data-category-id', 'DIC_kwDOLMCPwc4CkxB3');
    scriptElem.setAttribute('data-mapping', 'pathname');
    scriptElem.setAttribute('data-strict', '0');
    scriptElem.setAttribute('data-reactions-enabled', reactionsEnabled ?? '0');
    scriptElem.setAttribute('data-emit-metadata', '0');
    scriptElem.setAttribute('data-input-position', 'bottom');
    scriptElem.setAttribute('data-theme', 'preferred_color_scheme');
    scriptElem.setAttribute('data-loading', 'lazy');
    scriptElem.setAttribute('data-lang', 'ko');

    ref.current.appendChild(scriptElem);
  }, []);



  return <section ref={ref} />;
}