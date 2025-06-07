import React, { useState } from 'react';
import { Globe, Users, BookOpen, Calendar, FileText, Settings, Award, CreditCard, Bus, Building, BarChart3, MessageSquare, Wallet, UserCheck, Target, Clock, Brain, Fingerprint, Camera, Download, Share2, Search, Filter } from 'lucide-react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface SitemapNode {
  id: string;
  title: string;
  path: string;
  icon: React.ReactNode;
  description: string;
  role_access: ('admin' | 'teacher' | 'student' | 'parent')[];
  children?: SitemapNode[];
  status: 'implemented' | 'in_progress' | 'planned';
  priority: 'high' | 'medium' | 'low';
}

const sitemapData: SitemapNode[] = [
  {
    id: 'root',
    title: 'BlueArch ERP',
    path: '/',
    icon: <Globe className="w-5 h-5" />,
    description: 'Educational Management System Root',
    role_access: ['admin', 'teacher', 'student', 'parent'],
    status: 'implemented',
    priority: 'high',
    children: [
      {
        id: 'auth',
        title: 'Authentication',
        path: '/auth',
        icon: <UserCheck className="w-5 h-5" />,
        description: 'User authentication and authorization',
        role_access: ['admin', 'teacher', 'student', 'parent'],
        status: 'implemented',
        priority: 'high',
        children: [
          {
            id: 'login',
            title: 'Login',
            path: '/login',
            icon: <UserCheck className="w-4 h-4" />,
            description: 'User login page',
            role_access: ['admin', 'teacher', 'student', 'parent'],
            status: 'implemented',
            priority: 'high'
          },
          {
            id: 'onboarding',
            title: 'Onboarding',
            path: '/onboarding',
            icon: <Settings className="w-4 h-4" />,
            description: 'Institution setup and configuration',
            role_access: ['admin'],
            status: 'implemented',
            priority: 'high'
          }
        ]
      },
      {
        id: 'dashboard',
        title: 'Dashboard',
        path: '/dashboard',
        icon: <BarChart3 className="w-5 h-5" />,
        description: 'Role-based dashboard with analytics',
        role_access: ['admin', 'teacher', 'student', 'parent'],
        status: 'implemented',
        priority: 'high'
      },
      {
        id: 'student-management',
        title: 'Student Management',
        path: '/students',
        icon: <Users className="w-5 h-5" />,
        description: 'Comprehensive student information system',
        role_access: ['admin', 'teacher'],
        status: 'implemented',
        priority: 'high',
        children: [
          {
            id: 'student-list',
            title: 'Student Directory',
            path: '/students',
            icon: <Users className="w-4 h-4" />,
            description: 'View and manage all students',
            role_access: ['admin', 'teacher'],
            status: 'implemented',
            priority: 'high'
          },
          {
            id: 'student-profile',
            title: 'Student Profiles',
            path: '/students/:id',
            icon: <FileText className="w-4 h-4" />,
            description: 'Individual student detailed profiles',
            role_access: ['admin', 'teacher', 'student', 'parent'],
            status: 'planned',
            priority: 'medium'
          },
          {
            id: 'student-enrollment',
            title: 'Enrollment',
            path: '/students/enroll',
            icon: <FileText className="w-4 h-4" />,
            description: 'Student enrollment and registration',
            role_access: ['admin'],
            status: 'planned',
            priority: 'medium'
          }
        ]
      },
      {
        id: 'teacher-management',
        title: 'Teacher Management',
        path: '/teachers',
        icon: <BookOpen className="w-5 h-5" />,
        description: 'Faculty management and assignments',
        role_access: ['admin'],
        status: 'implemented',
        priority: 'high',
        children: [
          {
            id: 'teacher-list',
            title: 'Teacher Directory',
            path: '/teachers',
            icon: <BookOpen className="w-4 h-4" />,
            description: 'View and manage all teachers',
            role_access: ['admin'],
            status: 'implemented',
            priority: 'high'
          },
          {
            id: 'teacher-profile',
            title: 'Teacher Profiles',
            path: '/teachers/:id',
            icon: <FileText className="w-4 h-4" />,
            description: 'Individual teacher detailed profiles',
            role_access: ['admin', 'teacher'],
            status: 'planned',
            priority: 'medium'
          },
          {
            id: 'teacher-workload',
            title: 'Workload Management',
            path: '/teachers/workload',
            icon: <BarChart3 className="w-4 h-4" />,
            description: 'Teacher workload analysis and distribution',
            role_access: ['admin'],
            status: 'planned',
            priority: 'medium'
          }
        ]
      },
      {
        id: 'admissions',
        title: 'Admissions',
        path: '/admissions',
        icon: <FileText className="w-5 h-5" />,
        description: 'Student admission process management',
        role_access: ['admin'],
        status: 'implemented',
        priority: 'high',
        children: [
          {
            id: 'admission-applications',
            title: 'Applications',
            path: '/admissions',
            icon: <FileText className="w-4 h-4" />,
            description: 'Manage admission applications',
            role_access: ['admin'],
            status: 'implemented',
            priority: 'high'
          },
          {
            id: 'admission-interviews',
            title: 'Interviews',
            path: '/admissions/interviews',
            icon: <Users className="w-4 h-4" />,
            description: 'Schedule and manage interviews',
            role_access: ['admin'],
            status: 'planned',
            priority: 'medium'
          }
        ]
      },
      {
        id: 'timetable',
        title: 'Timetable Management',
        path: '/timetable',
        icon: <Clock className="w-5 h-5" />,
        description: 'Smart timetable creation and management',
        role_access: ['admin', 'teacher', 'student', 'parent'],
        status: 'implemented',
        priority: 'high',
        children: [
          {
            id: 'timetable-view',
            title: 'View Timetable',
            path: '/timetable',
            icon: <Clock className="w-4 h-4" />,
            description: 'View class timetables',
            role_access: ['admin', 'teacher', 'student', 'parent'],
            status: 'implemented',
            priority: 'high'
          },
          {
            id: 'timetable-create',
            title: 'Create Timetable',
            path: '/timetable/create',
            icon: <Calendar className="w-4 h-4" />,
            description: 'Create and edit timetables',
            role_access: ['admin'],
            status: 'planned',
            priority: 'medium'
          }
        ]
      },
      {
        id: 'curriculum',
        title: 'Curriculum Management',
        path: '/curriculum',
        icon: <Target className="w-5 h-5" />,
        description: 'Curriculum standards and learning outcomes',
        role_access: ['admin', 'teacher'],
        status: 'implemented',
        priority: 'high',
        children: [
          {
            id: 'curriculum-standards',
            title: 'Standards',
            path: '/curriculum',
            icon: <Target className="w-4 h-4" />,
            description: 'Manage curriculum standards',
            role_access: ['admin', 'teacher'],
            status: 'implemented',
            priority: 'high'
          },
          {
            id: 'learning-outcomes',
            title: 'Learning Outcomes',
            path: '/curriculum/outcomes',
            icon: <Award className="w-4 h-4" />,
            description: 'Define and track learning outcomes',
            role_access: ['admin', 'teacher'],
            status: 'planned',
            priority: 'medium'
          }
        ]
      },
      {
        id: 'attendance',
        title: 'Attendance Management',
        path: '/attendance',
        icon: <UserCheck className="w-5 h-5" />,
        description: 'Biometric attendance tracking system',
        role_access: ['admin', 'teacher', 'student', 'parent'],
        status: 'implemented',
        priority: 'high',
        children: [
          {
            id: 'attendance-mark',
            title: 'Mark Attendance',
            path: '/attendance',
            icon: <UserCheck className="w-4 h-4" />,
            description: 'Mark and view attendance',
            role_access: ['admin', 'teacher'],
            status: 'implemented',
            priority: 'high'
          },
          {
            id: 'biometric-setup',
            title: 'Biometric Setup',
            path: '/attendance/biometric',
            icon: <Fingerprint className="w-4 h-4" />,
            description: 'Configure biometric devices',
            role_access: ['admin'],
            status: 'planned',
            priority: 'medium'
          },
          {
            id: 'attendance-reports',
            title: 'Reports',
            path: '/attendance/reports',
            icon: <BarChart3 className="w-4 h-4" />,
            description: 'Attendance analytics and reports',
            role_access: ['admin', 'teacher', 'parent'],
            status: 'planned',
            priority: 'medium'
          }
        ]
      },
      {
        id: 'examinations',
        title: 'Examinations',
        path: '/examinations',
        icon: <FileText className="w-5 h-5" />,
        description: 'AI-powered examination and grading system',
        role_access: ['admin', 'teacher', 'student'],
        status: 'implemented',
        priority: 'high',
        children: [
          {
            id: 'exam-management',
            title: 'Exam Management',
            path: '/examinations',
            icon: <FileText className="w-4 h-4" />,
            description: 'Create and manage examinations',
            role_access: ['admin', 'teacher'],
            status: 'implemented',
            priority: 'high'
          },
          {
            id: 'auto-grading',
            title: 'Auto-Grading',
            path: '/examinations/grading',
            icon: <Brain className="w-4 h-4" />,
            description: 'TIMA Cyborg auto-grading system',
            role_access: ['admin', 'teacher'],
            status: 'planned',
            priority: 'high'
          },
          {
            id: 'question-bank',
            title: 'Question Bank',
            path: '/examinations/questions',
            icon: <BookOpen className="w-4 h-4" />,
            description: 'Manage examination questions',
            role_access: ['admin', 'teacher'],
            status: 'planned',
            priority: 'medium'
          }
        ]
      },
      {
        id: 'fees',
        title: 'Fee Management',
        path: '/fees',
        icon: <CreditCard className="w-5 h-5" />,
        description: 'Fee collection and payment tracking',
        role_access: ['admin', 'student', 'parent'],
        status: 'planned',
        priority: 'high',
        children: [
          {
            id: 'fee-structure',
            title: 'Fee Structure',
            path: '/fees/structure',
            icon: <CreditCard className="w-4 h-4" />,
            description: 'Define fee structures',
            role_access: ['admin'],
            status: 'planned',
            priority: 'high'
          },
          {
            id: 'payment-gateway',
            title: 'Payments',
            path: '/fees/payments',
            icon: <Wallet className="w-4 h-4" />,
            description: 'Razorpay payment integration',
            role_access: ['admin', 'student', 'parent'],
            status: 'planned',
            priority: 'high'
          }
        ]
      },
      {
        id: 'transport',
        title: 'Transport Management',
        path: '/transport',
        icon: <Bus className="w-5 h-5" />,
        description: 'School transport and route management',
        role_access: ['admin', 'student', 'parent'],
        status: 'planned',
        priority: 'medium'
      },
      {
        id: 'hostel',
        title: 'Hostel Management',
        path: '/hostel',
        icon: <Building className="w-5 h-5" />,
        description: 'Hostel accommodation management',
        role_access: ['admin', 'student', 'parent'],
        status: 'planned',
        priority: 'medium'
      },
      {
        id: 'analytics',
        title: 'Analytics',
        path: '/analytics',
        icon: <BarChart3 className="w-5 h-5" />,
        description: 'Advanced analytics and reporting',
        role_access: ['admin'],
        status: 'planned',
        priority: 'medium'
      },
      {
        id: 'wallet',
        title: 'TIMA Wallet',
        path: '/wallet',
        icon: <Wallet className="w-5 h-5" />,
        description: 'Internal reward and payment system',
        role_access: ['admin', 'student', 'parent'],
        status: 'planned',
        priority: 'low'
      },
      {
        id: 'messages',
        title: 'Messages',
        path: '/messages',
        icon: <MessageSquare className="w-5 h-5" />,
        description: 'Communication and messaging system',
        role_access: ['admin', 'teacher', 'student', 'parent'],
        status: 'planned',
        priority: 'medium'
      },
      {
        id: 'settings',
        title: 'Settings',
        path: '/settings',
        icon: <Settings className="w-5 h-5" />,
        description: 'System configuration and preferences',
        role_access: ['admin'],
        status: 'planned',
        priority: 'medium'
      }
    ]
  }
];

const SitemapNode: React.FC<{
  node: SitemapNode;
  level: number;
  onNodeClick: (node: SitemapNode) => void;
  selectedNode: SitemapNode | null;
}> = ({ node, level, onNodeClick, selectedNode }) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'planned': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColors = (roles: string[]) => {
    const colors = {
      admin: 'bg-purple-100 text-purple-800',
      teacher: 'bg-blue-100 text-blue-800',
      student: 'bg-green-100 text-green-800',
      parent: 'bg-orange-100 text-orange-800'
    };
    return roles.map(role => colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800');
  };

  return (
    <div className={`ml-${level * 4}`}>
      <div
        className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
          selectedNode?.id === node.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => onNodeClick(node)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="mt-1">{node.icon}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-gray-900">{node.title}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(node.status)}`}>
                  {node.status.replace('_', ' ')}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(node.priority)}`}>
                  {node.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{node.description}</p>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">Access:</span>
                <div className="flex space-x-1">
                  {node.role_access.map((role, index) => (
                    <span
                      key={role}
                      className={`px-2 py-1 rounded text-xs font-medium ${getRoleColors(node.role_access)[index]}`}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs text-gray-500 font-mono">{node.path}</span>
              </div>
            </div>
          </div>
          {node.children && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? '−' : '+'}
            </Button>
          )}
        </div>
      </div>
      
      {node.children && isExpanded && (
        <div className="mt-4 space-y-4">
          {node.children.map((child) => (
            <SitemapNode
              key={child.id}
              node={child}
              level={level + 1}
              onNodeClick={onNodeClick}
              selectedNode={selectedNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const SitemapPage: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<SitemapNode | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  const flattenNodes = (nodes: SitemapNode[]): SitemapNode[] => {
    const result: SitemapNode[] = [];
    const traverse = (nodeList: SitemapNode[]) => {
      nodeList.forEach(node => {
        result.push(node);
        if (node.children) {
          traverse(node.children);
        }
      });
    };
    traverse(nodes);
    return result;
  };

  const allNodes = flattenNodes(sitemapData);
  
  const filteredNodes = allNodes.filter(node => {
    const matchesSearch = node.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         node.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         node.path.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || node.status === statusFilter;
    const matchesRole = roleFilter === 'all' || node.role_access.includes(roleFilter as any);
    return matchesSearch && matchesStatus && matchesRole;
  });

  const stats = {
    total: allNodes.length,
    implemented: allNodes.filter(n => n.status === 'implemented').length,
    in_progress: allNodes.filter(n => n.status === 'in_progress').length,
    planned: allNodes.filter(n => n.status === 'planned').length,
    high_priority: allNodes.filter(n => n.priority === 'high').length
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Site Architecture & Mapping</h1>
            <p className="text-gray-600 dark:text-gray-400">Complete system architecture and navigation structure</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Sitemap
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pages</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                </div>
                <Globe className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Implemented</p>
                  <p className="text-2xl font-bold text-green-600">{stats.implemented}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.in_progress}</p>
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Planned</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.planned}</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">High Priority</p>
                  <p className="text-2xl font-bold text-red-600">{stats.high_priority}</p>
                </div>
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search pages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="implemented">Implemented</option>
                  <option value="in_progress">In Progress</option>
                  <option value="planned">Planned</option>
                </select>
                
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sitemap Tree */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Site Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sitemapData.map((node) => (
                    <SitemapNode
                      key={node.id}
                      node={node}
                      level={0}
                      onNodeClick={setSelectedNode}
                      selectedNode={selectedNode}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            {selectedNode ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {selectedNode.icon}
                    <span>Page Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{selectedNode.title}</h3>
                      <p className="text-sm text-gray-600">{selectedNode.description}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">Path:</span>
                      <p className="text-sm font-mono bg-gray-100 p-2 rounded mt-1">{selectedNode.path}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                        selectedNode.status === 'implemented' ? 'bg-green-100 text-green-800' :
                        selectedNode.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {selectedNode.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">Priority:</span>
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                        selectedNode.priority === 'high' ? 'bg-red-100 text-red-800' :
                        selectedNode.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedNode.priority}
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700 block mb-2">Role Access:</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedNode.role_access.map((role) => (
                          <span
                            key={role}
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              role === 'admin' ? 'bg-purple-100 text-purple-800' :
                              role === 'teacher' ? 'bg-blue-100 text-blue-800' :
                              role === 'student' ? 'bg-green-100 text-green-800' :
                              'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {selectedNode.children && (
                      <div>
                        <span className="text-sm font-medium text-gray-700">Child Pages:</span>
                        <p className="text-sm text-gray-600 mt-1">{selectedNode.children.length} sub-pages</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a page</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Click on any page in the sitemap to view detailed information.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};