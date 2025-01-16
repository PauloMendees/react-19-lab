import { FC, ReactNode } from "react"
import { SidebarProvider } from "./components/ui/sidebar"

interface LayoutProps { 
    children: ReactNode
}

export const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <SidebarProvider>
            <main>

                {children}
            </main>
    </SidebarProvider>
    )
}