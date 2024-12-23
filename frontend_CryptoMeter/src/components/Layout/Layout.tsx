import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppSidebar } from './AppSideBar'
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar'

export const Layout = () => {
  return (
    <SidebarProvider>
        <AppSidebar />
        <main>
            <SidebarTrigger />
            <Outlet />
        </main>
    </SidebarProvider>
  )
}

