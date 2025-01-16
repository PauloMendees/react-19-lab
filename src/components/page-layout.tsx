import { FC, PropsWithChildren } from 'react';

export const PageLayout: FC<PropsWithChildren & { title: string }> = ({ children, title }) => {
  return (
    <div className="w-full flex flex-col lg:p-8 p-4 items-start gap-4">
      <h1 className="font-bold lg:text-2xl text-lg">{title}</h1>
      {children}
    </div>
  );
};
