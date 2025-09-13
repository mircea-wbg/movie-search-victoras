import type { ReactNode } from 'react';

type GridProps = {
  children: ReactNode;
  className?: string;
};

export default function Grid({ children }: GridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-[15px]">
      {children}
    </div>
  );
}