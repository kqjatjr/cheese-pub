import React, { useRef, useEffect } from 'react';
import { Spinner } from '@nextui-org/react';

type Props = {
  onShow: () => Promise<unknown>;
};

const InfiniteLoading = ({ onShow }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isLoading = useRef(false);
  const onShowRef = useRef(onShow);

  onShowRef.current = onShow;

  useEffect(() => {
    const container = ref.current;
    if (container) {
      const observer = new IntersectionObserver(async (entries) => {
        if (isLoading.current) return;

        if (entries[0].isIntersecting) {
          try {
            isLoading.current = true;
            await onShow();
          } finally {
            isLoading.current = false;
          }
        }
      });

      observer.observe(container);
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center py-5">
      <Spinner />
    </div>
  );
};

export default InfiniteLoading;
