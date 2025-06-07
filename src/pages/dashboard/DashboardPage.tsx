import React, { useEffect, useState } from 'react';
import { Users, GraduationCap, TrendingUp, CreditCard, Bell, Calendar, Award, Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { MainLayout } from '../../components/layout/MainLayout';

const StatsCard: React.FC<{
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}> = ({ title, value, change, changeType, icon }) => {
  const changeColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600',
  }[changeType];
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            <p className={`text-sm ${changeColor}`}>{change}</p>
          </div>
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const QuickAction: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  onClick: () => void;
}> = ({ title, description, icon, action, onClick }) => (
  <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
    <CardContent className="p-6">
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
          <Button variant="outline" size="sm" className="mt-3">
            {action}
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const RecentActivity: React.FC<{
  activities: Array<{
    id: string;
    action: string;
    user: string;
    time: string;
    type: 'info' | 'success' | 'warning';
  }>;
}> = ({ activities }) => (
  <Card>
    <CardHeader>
      <CardTitle>Recent Activities</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${
              activity.type === 'success' ? 'bg-green-500' :
              activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
            }`} />
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white">{activity.action}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">by {activity.user} • {activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    totalStudents: 1247,
    totalTeachers: 85,
    attendanceRate: 94.2,
    pendingFees: 15,
  });
  
  const [recentActivities] = useState([
    { id: '1', action: 'New student admission approved', user: 'Admin', time: '2 hours ago', type: 'success' as const },
    { id: '2', action: 'Fee payment received from Grade 10A', user: 'Accounts', time: '3 hours ago', type: 'success' as const },
    { id: '3', action: 'Attendance marked for Grade 8B', user: 'Mrs. Smith', time: '4 hours ago', type: 'info' as const },
    { id: '4', action: 'Assignment submitted late by 5 students', user: 'System', time: '5 hours ago', type: 'warning' as const },
  ]);
  
  const getDashboardContent = () => {
    switch (user?.role) {
      case 'admin':
        return (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Students"
                value={stats.totalStudents}
                change="+12 this month"
                changeType="positive"
                icon={<Users className="w-6 h-6" />}
              />
              <StatsCard
                title="Total Teachers"
                value={stats.totalTeachers}
                change="+3 new hires"
                changeType="positive"
                icon={<GraduationCap className="w-6 h-6" />}
              />
              <StatsCard
                title="Attendance Rate"
                value={`${stats.attendanceRate}%`}
                change="+2.5% from last month"
                changeType="positive"
                icon={<TrendingUp className="w-6 h-6" />}
              />
              <StatsCard
                title="Pending Fees"
                value={stats.pendingFees}
                change="-8 from last week"
                changeType="positive"
                icon={<CreditCard className="w-6 h-6" />}
              />
            </div>
            
            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <QuickAction
                  title="Add New Student"
                  description="Register a new student to the system"
                  icon={<Users className="w-5 h-5" />}
                  action="Add Student"
                  onClick={() => console.log('Add student')}
                />
                <QuickAction
                  title="Generate Reports"
                  description="Create attendance and performance reports"
                  icon={<Activity className="w-5 h-5" />}
                  action="Generate"
                  onClick={() => console.log('Generate reports')}
                />
                <QuickAction
                  title="Send Announcements"
                  description="Notify parents and students about updates"
                  icon={<Bell className="w-5 h-5" />}
                  action="Send Now"
                  onClick={() => console.log('Send announcement')}
                />
              </div>
            </div>
          </>
        );
        
      case 'teacher':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <QuickAction
              title="Mark Attendance"
              description="Take attendance for your classes"
              icon={<Users className="w-5 h-5" />}
              action="Mark Now"
              onClick={() => console.log('Mark attendance')}
            />
            <QuickAction
              title="Create Assignment"
              description="Assign homework to your students"
              icon={<Calendar className="w-5 h-5" />}
              action="Create"
              onClick={() => console.log('Create assignment')}
            />
            <QuickAction
              title="Grade Submissions"
              description="Review and grade student work"
              icon={<Award className="w-5 h-5" />}
              action="Grade"
              onClick={() => console.log('Grade submissions')}
            />
          </div>
        );
        
      case 'student':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div>
                      <p className="font-medium">Mathematics</p>
                      <p className="text-sm text-gray-600">Room 101</p>
                    </div>
                    <span className="text-sm font-medium">9:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div>
                      <p className="font-medium">Science</p>
                      <p className="text-sm text-gray-600">Lab 2</p>
                    </div>
                    <span className="text-sm font-medium">10:30 AM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div>
                      <p className="font-medium">English</p>
                      <p className="text-sm text-gray-600">Room 205</p>
                    </div>
                    <span className="text-sm font-medium">1:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Pending Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border border-orange-200 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <p className="font-medium">Math Assignment #5</p>
                    <p className="text-sm text-gray-600">Due: Tomorrow</p>
                  </div>
                  <div className="p-3 border border-blue-200 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="font-medium">Science Lab Report</p>
                    <p className="text-sm text-gray-600">Due: Friday</p>
                  </div>
                  <div className="p-3 border border-green-200 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="font-medium">English Essay</p>
                    <p className="text-sm text-gray-600">Due: Next Week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      case 'parent':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Child's Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Mathematics</span>
                    <span className="font-medium text-green-600">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Science</span>
                    <span className="font-medium text-blue-600">92%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>English</span>
                    <span className="font-medium text-purple-600">78%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Attendance</span>
                    <span className="font-medium text-green-600">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="font-medium">Parent-Teacher Meeting</p>
                    <p className="text-sm text-gray-600">Dec 15, 2024</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="font-medium">Annual Sports Day</p>
                    <p className="text-sm text-gray-600">Dec 20, 2024</p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="font-medium">Winter Break Begins</p>
                    <p className="text-sm text-gray-600">Dec 22, 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome Header with Enhanced Branding */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-4 right-4 opacity-20">
            <img 
              src="/Bluearch logo.png" 
              alt="BlueArch Logo" 
              className="h-16 w-16 object-contain"
            />
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Welcome back, {user?.full_name}!
              </h1>
              <p className="text-blue-100">
                {user?.role === 'admin' && "Here's what's happening at your institution today."}
                {user?.role === 'teacher' && "Ready to inspire young minds today?"}
                {user?.role === 'student' && "Let's make today a great learning day!"}
                {user?.role === 'parent' && "Stay updated with your child's progress."}
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <img 
                    src="/TIMA CYBORG.png" 
                    alt="TIMA Cyborg" 
                    className="w-6 h-6 rounded-full"
                  />
                  <p className="text-sm text-blue-100 font-medium">TIMA Cyborg Available</p>
                </div>
                <p className="text-xs text-blue-200">Your AI assistant is ready</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Role-specific Dashboard Content */}
        {getDashboardContent()}
        
        {/* Recent Activities (for admin) */}
        {user?.role === 'admin' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivity activities={recentActivities} />
            
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Database Status</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Healthy</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Payment Gateway</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Backup Status</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Updated</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <img 
                        src="/TIMA CYBORG.png" 
                        alt="TIMA Cyborg" 
                        className="w-4 h-4 rounded-full"
                      />
                      <span>TIMA Cyborg</span>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Online</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
};