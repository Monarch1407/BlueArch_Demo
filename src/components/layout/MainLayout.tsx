import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { TIMACyborgAssistant } from '../ai/TIMACyborgAssistant';
import { useAppStore } from '../../store/appStore';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { sidebarOpen } = useAppStore();
  
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => useAppStore.getState().toggleSidebar()}
        />
      )}
      
      {/* TIMA Cyborg AI Assistant */}
      <TIMACyborgAssistant />
    </div>
  );
};