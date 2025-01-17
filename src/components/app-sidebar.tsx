import { Webhook, BookText, ArrowRightLeft, GitPullRequestCreateArrow } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useLocation } from 'react-router-dom';

// Menu items.
const items = [
  {
    title: `use`,
    url: '/',
    icon: Webhook,
  },
  {
    title: `useTransition`,
    url: '/use-transition',
    icon: ArrowRightLeft,
  },
  {
    title: `useFormStatus & useActionState`,
    url: '/use-form-status',
    icon: BookText,
  },
  {
    title: 'useOptimistic',
    url: '/use-optimistic',
    icon: GitPullRequestCreateArrow,
  },
];

export function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar>
      <SidebarContent className="bg-stone-200">
        <SidebarGroup>
          <SidebarGroupLabel>React 19 functions lab</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={`${pathname === item.url ? 'text-blue-600' : ''}`}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
