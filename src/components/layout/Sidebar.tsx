import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  BarChart3,
  Settings,
  UserCheck,
  FileText,
  Bus,
  Building,
  Award,
  MessageSquare,
  Wallet,
  Clock,
  Target,
  Fingerprint,
  Brain,
  Layers,
  Globe
} from 'lucide-react';
import { clsx } from 'clsx';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';

const navigationItems = {
  admin: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Students', href: '/students', icon: Users },
    { name: 'Teachers', href: '/teachers', icon: GraduationCap },
    { name: 'Admissions', href: '/admissions', icon: FileText },
    { name: 'Timetable', href: '/timetable', icon: Clock },
    { name: 'Curriculum', href: '/curriculum', icon: Target },
    { name: 'Attendance', href: '/attendance', icon: UserCheck },
    { name: 'Examinations', href: '/examinations', icon: Brain },
    { name: 'Academics', href: '/academics', icon: BookOpen },
    { name: 'Fee Management', href: '/fees', icon: CreditCard },
    { name: 'Transport', href: '/transport', icon: Bus },
    { name: 'Hostel', href: '/hostel', icon: Building },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'TIMA Wallet', href: '/wallet', icon: Wallet },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'Wireframes', href: '/wireframes', icon: Layers },
    { name: 'Sitemap', href: '/sitemap', icon: Globe },
    { name: 'Settings', href: '/settings', icon: Settings },
  ],
  teacher: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Classes', href: '/classes', icon: Users },
    { name: 'Timetable', href: '/timetable', icon: Clock },
    { name: 'Curriculum', href: '/curriculum', icon: Target },
    { name: 'Attendance', href: '/attendance', icon: UserCheck },
    { name: 'Examinations', href: '/examinations', icon: Brain },
    { name: 'Assignments', href: '/assignments', icon: BookOpen },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'Achievements', href: '/achievements', icon: Award },
  ],
  student: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Timetable', href: '/timetable', icon: Clock },
    { name: 'Assignments', href: '/assignments', icon: BookOpen },
    { name: 'Examinations', href: '/examinations', icon: FileText },
    { name: 'Attendance', href: '/attendance', icon: UserCheck },
    { name: 'Fees', href: '/fees', icon: CreditCard },
    { name: 'Achievements', href: '/achievements', icon: Award },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
  ],
  parent: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Child Progress', href: '/progress', icon: BarChart3 },
    { name: 'Timetable', href: '/timetable', icon: Clock },
    { name: 'Attendance', href: '/attendance', icon: UserCheck },
    { name: 'Fees', href: '/fees', icon: CreditCard },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'Transport', href: '/transport', icon: Bus },
    { name: 'Achievements', href: '/achievements', icon: Award },
  ],
};

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuthStore();
  const { sidebarOpen } = useAppStore();
  
  if (!user) return null;
  
  const navigation = navigationItems[user.role] || [];
  
  return (
    <div className={clsx(
      'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-200 ease-in-out',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      'lg:translate-x-0 lg:static lg:inset-0'
    )}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center space-x-3">
            <img 
              src="/Bluearch logo.png" 
              alt="BlueArch Logo" 
              className="h-8 w-8 object-contain"
            />
            <h1 className="text-white text-xl font-bold">BlueArch</h1>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        {/* TIMA Cyborg Assistant */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-3 text-white">
            <div className="flex items-center mb-2">
              <img 
                src="/TIMA CYBORG.png" 
                alt="TIMA Cyborg" 
                className="w-6 h-6 mr-2 rounded-full bg-white p-0.5"
              />
              <span className="text-sm font-medium">TIMA Cyborg</span>
              <div className="w-2 h-2 bg-green-300 rounded-full ml-auto animate-pulse"></div>
            </div>
            <p className="text-xs opacity-90">Your AI assistant is ready to help!</p>
          </div>
        </div>
        
        {/* TIMA Branding */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
            <span className="text-xs">Powered by</span>
            <img 
              src="/LogoPNG.png" 
              alt="TIMA Logo" 
              className="h-4 w-4 object-contain"
            />
            <span className="text-xs font-medium">TIMA Technologies</span>
          </div>
        </div>
      </div>
    </div>
  );
};