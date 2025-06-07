import React, { useState } from 'react';
import { Plus, Search, Filter, Download, FileText, Clock, CheckCircle, XCircle, Eye, Edit } from 'lucide-react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface AdmissionApplication {
  id: string;
  application_no: string;
  student_name: string;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  class_applied: string;
  dob: string;
  gender: string;
  previous_school?: string;
  status: 'pending' | 'approved' | 'rejected' | 'waitlisted';
  submitted_at: string;
  documents_submitted: boolean;
  interview_scheduled?: string;
  admission_fee_paid: boolean;
}

const mockApplications: AdmissionApplication[] = [
  {
    id: '1',
    application_no: 'ADM2024001',
    student_name: 'Aarav Gupta',
    parent_name: 'Vikash Gupta',
    parent_email: 'vikash.gupta@email.com',
    parent_phone: '+91 9876543210',
    class_applied: '9',
    dob: '2009-04-15',
    gender: 'Male',
    previous_school: 'Delhi Public School',
    status: 'pending',
    submitted_at: '2024-12-01',
    documents_submitted: true,
    interview_scheduled: '2024-12-15',
    admission_fee_paid: false
  },
  {
    id: '2',
    application_no: 'ADM2024002',
    student_name: 'Ananya Singh',
    parent_name: 'Rajesh Singh',
    parent_email: 'rajesh.singh@email.com',
    parent_phone: '+91 9876543211',
    class_applied: '10',
    dob: '2008-07-22',
    gender: 'Female',
    previous_school: 'Kendriya Vidyalaya',
    status: 'approved',
    submitted_at: '2024-11-28',
    documents_submitted: true,
    admission_fee_paid: true
  },
  {
    id: '3',
    application_no: 'ADM2024003',
    student_name: 'Arjun Patel',
    parent_name: 'Suresh Patel',
    parent_email: 'suresh.patel@email.com',
    parent_phone: '+91 9876543212',
    class_applied: '11',
    dob: '2007-12-10',
    gender: 'Male',
    status: 'waitlisted',
    submitted_at: '2024-11-25',
    documents_submitted: false,
    admission_fee_paid: false
  }
];

const StatusBadge: React.FC<{ status: AdmissionApplication['status'] }> = ({ status }) => {
  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
    rejected: { color: 'bg-red-100 text-red-800', icon: XCircle },
    waitlisted: { color: 'bg-blue-100 text-blue-800', icon: Clock }
  };
  
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3 mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ApplicationCard: React.FC<{ 
  application: AdmissionApplication; 
  onView: (app: AdmissionApplication) => void;
  onEdit: (app: AdmissionApplication) => void;
}> = ({ application, onView, onEdit }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{application.student_name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{application.application_no}</p>
        </div>
        <StatusBadge status={application.status} />
      </div>
      
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 dark:text-gray-400">Class Applied</p>
            <p className="font-medium">Class {application.class_applied}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Parent</p>
            <p className="font-medium">{application.parent_name}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Phone</p>
            <p className="font-medium">{application.parent_phone}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Submitted</p>
            <p className="font-medium">{new Date(application.submitted_at).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-xs">
          <div className={`flex items-center ${application.documents_submitted ? 'text-green-600' : 'text-red-600'}`}>
            <div className={`w-2 h-2 rounded-full mr-1 ${application.documents_submitted ? 'bg-green-500' : 'bg-red-500'}`}></div>
            Documents {application.documents_submitted ? 'Submitted' : 'Pending'}
          </div>
          <div className={`flex items-center ${application.admission_fee_paid ? 'text-green-600' : 'text-gray-600'}`}>
            <div className={`w-2 h-2 rounded-full mr-1 ${application.admission_fee_paid ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            Fee {application.admission_fee_paid ? 'Paid' : 'Pending'}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500">
          {application.interview_scheduled && (
            <span>Interview: {new Date(application.interview_scheduled).toLocaleDateString()}</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => onView(application)}>
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onEdit(application)}>
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const AdmissionsPage: React.FC = () => {
  const [applications, setApplications] = useState<AdmissionApplication[]>(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.application_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.parent_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesClass = classFilter === 'all' || app.class_applied === classFilter;
    return matchesSearch && matchesStatus && matchesClass;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    waitlisted: applications.filter(app => app.status === 'waitlisted').length,
  };

  const handleView = (application: AdmissionApplication) => {
    console.log('View application:', application);
  };

  const handleEdit = (application: AdmissionApplication) => {
    console.log('Edit application:', application);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admissions Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage student admission applications and processes</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Applications
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Application
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Waitlisted</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.waitlisted}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search applications..."
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
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="waitlisted">Waitlisted</option>
                </select>
                
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Classes</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onView={handleView}
              onEdit={handleEdit}
            />
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No applications found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchTerm || statusFilter !== 'all' || classFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No admission applications have been submitted yet.'}
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Application
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};