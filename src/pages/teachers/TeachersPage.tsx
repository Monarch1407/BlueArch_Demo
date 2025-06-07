import React, { useState } from 'react';
import { Plus, Search, Filter, Download, Upload, GraduationCap, Edit, Trash2, Eye, MoreHorizontal, Mail, Phone } from 'lucide-react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface Teacher {
  id: string;
  employee_id: string;
  full_name: string;
  email: string;
  phone: string;
  subject_specialization: string;
  is_class_teacher: boolean;
  class_assigned?: string;
  qualification: string;
  experience_years: number;
  joining_date: string;
  status: 'active' | 'inactive' | 'on_leave';
  salary: number;
}

const mockTeachers: Teacher[] = [
  {
    id: '1',
    employee_id: 'EMP001',
    full_name: 'Dr. Priya Sharma',
    email: 'priya.sharma@school.edu',
    phone: '+91 9876543210',
    subject_specialization: 'Mathematics',
    is_class_teacher: true,
    class_assigned: '10-A',
    qualification: 'M.Sc Mathematics, B.Ed',
    experience_years: 8,
    joining_date: '2020-06-15',
    status: 'active',
    salary: 45000
  },
  {
    id: '2',
    employee_id: 'EMP002',
    full_name: 'Mr. Rajesh Kumar',
    email: 'rajesh.kumar@school.edu',
    phone: '+91 9876543211',
    subject_specialization: 'Physics',
    is_class_teacher: false,
    qualification: 'M.Sc Physics, B.Ed',
    experience_years: 12,
    joining_date: '2018-04-10',
    status: 'active',
    salary: 52000
  },
  {
    id: '3',
    employee_id: 'EMP003',
    full_name: 'Ms. Anita Patel',
    email: 'anita.patel@school.edu',
    phone: '+91 9876543212',
    subject_specialization: 'English',
    is_class_teacher: true,
    class_assigned: '9-B',
    qualification: 'M.A English, B.Ed',
    experience_years: 6,
    joining_date: '2021-07-01',
    status: 'on_leave',
    salary: 42000
  }
];

const TeacherCard: React.FC<{ 
  teacher: Teacher; 
  onEdit: (teacher: Teacher) => void; 
  onDelete: (id: string) => void 
}> = ({ teacher, onEdit, onDelete }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
            {teacher.full_name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{teacher.full_name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{teacher.employee_id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            teacher.status === 'active' ? 'bg-green-100 text-green-800' :
            teacher.status === 'inactive' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {teacher.status.replace('_', ' ')}
          </span>
          <div className="relative">
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 dark:text-gray-400">Subject</p>
            <p className="font-medium">{teacher.subject_specialization}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Experience</p>
            <p className="font-medium">{teacher.experience_years} years</p>
          </div>
          {teacher.is_class_teacher && teacher.class_assigned && (
            <div>
              <p className="text-gray-600 dark:text-gray-400">Class Teacher</p>
              <p className="font-medium">{teacher.class_assigned}</p>
            </div>
          )}
          <div>
            <p className="text-gray-600 dark:text-gray-400">Salary</p>
            <p className="font-medium">₹{teacher.salary.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <Mail className="w-3 h-3 mr-1" />
            {teacher.email}
          </div>
          <div className="flex items-center">
            <Phone className="w-3 h-3 mr-1" />
            {teacher.phone}
          </div>
        </div>
        
        <div className="text-xs text-gray-500">
          <p>{teacher.qualification}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <span className="text-xs text-gray-500">Joined: {new Date(teacher.joining_date).toLocaleDateString()}</span>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onEdit(teacher)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(teacher.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const TeachersPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject_specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || teacher.subject_specialization === subjectFilter;
    const matchesStatus = statusFilter === 'all' || teacher.status === statusFilter;
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const handleEdit = (teacher: Teacher) => {
    console.log('Edit teacher:', teacher);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(teachers.filter(t => t.id !== id));
    }
  };

  const stats = {
    total: teachers.length,
    active: teachers.filter(t => t.status === 'active').length,
    inactive: teachers.filter(t => t.status === 'inactive').length,
    onLeave: teachers.filter(t => t.status === 'on_leave').length,
    classTeachers: teachers.filter(t => t.is_class_teacher).length,
  };

  const subjects = [...new Set(teachers.map(t => t.subject_specialization))];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Teachers Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage faculty information and assignments</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import CSV
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Teacher
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Teachers</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                </div>
                <GraduationCap className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                  <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">On Leave</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.onLeave}</p>
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Class Teachers</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.classTeachers}</p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Experience</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round(teachers.reduce((acc, t) => acc + t.experience_years, 0) / teachers.length)} yrs
                  </p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search teachers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on_leave">On Leave</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                >
                  Table
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Teachers Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredTeachers.map((teacher) => (
                      <tr key={teacher.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {teacher.full_name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{teacher.full_name}</div>
                              <div className="text-sm text-gray-500">{teacher.employee_id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {teacher.subject_specialization}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {teacher.is_class_teacher ? teacher.class_assigned || '-' : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {teacher.experience_years} years
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            teacher.status === 'active' ? 'bg-green-100 text-green-800' :
                            teacher.status === 'inactive' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {teacher.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(teacher)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(teacher.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {filteredTeachers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No teachers found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchTerm || subjectFilter !== 'all' || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by adding your first teacher.'}
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Teacher
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};