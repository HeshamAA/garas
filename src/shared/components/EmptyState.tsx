import { useEffect, useRef } from 'react';
import '@lottiefiles/lottie-player';

interface EmptyStateProps {
  message: string;
  description?: string;
}

export const EmptyState = ({ message, description }: EmptyStateProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && containerRef.current.children.length === 0) {
      const player = document.createElement('lottie-player');
      player.setAttribute('src', '/EmptyList.lottie');
      player.setAttribute('background', 'transparent');
      player.setAttribute('speed', '1');
      player.setAttribute('style', 'width: 250px; height: 250px; margin: 0 auto;');
      player.setAttribute('loop', '');
      player.setAttribute('autoplay', '');
      
      containerRef.current.appendChild(player);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 animate-fade-in">
      <div ref={containerRef} className="mb-6" />
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center">
        {message}
      </h3>
      {description && (
        <p className="text-base md:text-lg text-gray-600 text-center max-w-md">
          {description}
        </p>
      )}
    </div>
  );
};
