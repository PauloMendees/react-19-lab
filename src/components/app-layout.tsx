import { FC, PropsWithChildren } from 'react';
import { AppSidebar } from './app-sidebar';
import { SidebarProvider, SidebarTrigger } from './ui/sidebar';

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <main className="w-full h-[100vsh] flex flex-col items-start justify-start overflow-auto">
        <SidebarTrigger />
        <div className="w-full flex-1 flex flex-col">{children}</div>
      </main>
    </SidebarProvider>
  );
};
