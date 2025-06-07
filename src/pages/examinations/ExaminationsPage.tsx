import React, { useState } from 'react';
import { Plus, FileText, Clock, Users, Award, Edit, Trash2, Download, Upload, Search, Filter, CheckCircle, AlertCircle, BookOpen, Calculator, Brain } from 'lucide-react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface Examination {
  id: string;
  title: string;
  subject: string;
  class: string;
  exam_type: 'unit_test' | 'mid_term' | 'final' | 'assignment' | 'project';
  date: string;
  duration: number; // in minutes
  total_marks: number;
  passing_marks: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'graded';
  auto_grading: boolean;
  question_count: number;
  students_enrolled: number;
  students_completed: number;
  created_by: string;
  created_at: string;
}

interface ExamResult {
  id: string;
  exam_id: string;
  student_id: string;
  student_name: string;
  marks_obtained: number;
  total_marks: number;
  percentage: number;
  grade: string;
  status: 'pass' | 'fail' | 'pending';
  submitted_at?: string;
  auto_graded: boolean;
  time_taken: number; // in minutes
}

interface Question {
  id: string;
  exam_id: string;
  question_text: string;
  question_type: 'mcq' | 'true_false' | 'short_answer' | 'essay' | 'numerical';
  options?: string[];
  correct_answer: string;
  marks: number;
  difficulty: 'easy' | 'medium' | 'hard';
  auto_gradable: boolean;
}

const mockExaminations: Examination[] = [
  {
    id: '1',
    title: 'Mathematics Unit Test - Algebra',
    subject: 'Mathematics',
    class: '10-A',
    exam_type: 'unit_test',
    date: '2024-12-15',
    duration: 90,
    total_marks: 50,
    passing_marks: 20,
    status: 'scheduled',
    auto_grading: true,
    question_count: 25,
    students_enrolled: 35,
    students_completed: 0,
    created_by: 'Dr. Priya Sharma',
    created_at: '2024-12-01'
  },
  {
    id: '2',
    title: 'Physics Mid-Term Examination',
    subject: 'Physics',
    class: '10-A',
    exam_type: 'mid_term',
    date: '2024-12-12',
    duration: 120,
    total_marks: 80,
    passing_marks: 32,
    status: 'completed',
    auto_grading: false,
    question_count: 40,
    students_enrolled: 35,
    students_completed: 33,
    created_by: 'Mr. Rajesh Kumar',
    created_at: '2024-11-20'
  },
  {
    id: '3',
    title: 'English Literature Assignment',
    subject: 'English',
    class: '10-A',
    exam_type: 'assignment',
    date: '2024-12-08',
    duration: 60,
    total_marks: 30,
    passing_marks: 12,
    status: 'graded',
    auto_grading: true,
    question_count: 15,
    students_enrolled: 35,
    students_completed: 35,
    created_by: 'Ms. Anita Patel',
    created_at: '2024-11-25'
  }
];

const mockExamResults: ExamResult[] = [
  {
    id: '1',
    exam_id: '3',
    student_id: 'STU001',
    student_name: 'Arjun Sharma',
    marks_obtained: 26,
    total_marks: 30,
    percentage: 86.7,
    grade: 'A',
    status: 'pass',
    submitted_at: '2024-12-08T10:30:00',
    auto_graded: true,
    time_taken: 45
  },
  {
    id: '2',
    exam_id: '3',
    student_id: 'STU002',
    student_name: 'Priya Patel',
    marks_obtained: 28,
    total_marks: 30,
    percentage: 93.3,
    grade: 'A+',
    status: 'pass',
    submitted_at: '2024-12-08T10:25:00',
    auto_graded: true,
    time_taken: 42
  }
];

const ExamCard: React.FC<{
  exam: Examination;
  onEdit: (exam: Examination) => void;
  onDelete: (id: string) => void;
  onViewResults: (exam: Examination) => void;
}> = ({ exam, onEdit, onDelete, onViewResults }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'graded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'unit_test': return 'bg-orange-100 text-orange-800';
      case 'mid_term': return 'bg-red-100 text-red-800';
      case 'final': return 'bg-purple-100 text-purple-800';
      case 'assignment': return 'bg-green-100 text-green-800';
      case 'project': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const completionRate = exam.students_enrolled > 0 ? 
    Math.round((exam.students_completed / exam.students_enrolled) * 100) : 0;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(exam.status)}`}>
                {exam.status.replace('_', ' ')}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(exam.exam_type)}`}>
                {exam.exam_type.replace('_', ' ')}
              </span>
              {exam.auto_grading && (
                <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded text-xs font-medium flex items-center">
                  <Brain className="w-3 h-3 mr-1" />
                  Auto-Grade
                </span>
              )}
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{exam.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{exam.subject} • Class {exam.class}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => onEdit(exam)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(exam.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <p className="text-gray-600 dark:text-gray-400">Date & Duration</p>
            <p className="font-medium">{new Date(exam.date).toLocaleDateString()}</p>
            <p className="text-xs text-gray-500">{exam.duration} minutes</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Marks</p>
            <p className="font-medium">{exam.total_marks} total</p>
            <p className="text-xs text-gray-500">{exam.passing_marks} to pass</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Questions</p>
            <p className="font-medium">{exam.question_count} questions</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Students</p>
            <p className="font-medium">{exam.students_completed}/{exam.students_enrolled}</p>
            <p className="text-xs text-gray-500">{completionRate}% completed</p>
          </div>
        </div>
        
        {exam.students_enrolled > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Completion Progress</span>
              <span>{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-xs text-gray-500">
            Created by {exam.created_by}
          </span>
          <div className="flex items-center space-x-2">
            {exam.status === 'graded' && (
              <Button variant="outline\" size="sm\" onClick={() => onViewResults(exam)}>
                <Award className="w-4 h-4 mr-1" />
                Results
              </Button>
            )}
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-1" />
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ExamStats: React.FC<{ exams: Examination[] }> = ({ exams }) => {
  const stats = {
    total: exams.length,
    scheduled: exams.filter(e => e.status === 'scheduled').length,
    ongoing: exams.filter(e => e.status === 'ongoing').length,
    completed: exams.filter(e => e.status === 'completed').length,
    graded: exams.filter(e => e.status === 'graded').length,
    autoGraded: exams.filter(e => e.auto_grading).length
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Exams</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Scheduled</p>
              <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ongoing</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.ongoing}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Graded</p>
              <p className="text-2xl font-bold text-purple-600">{stats.graded}</p>
            </div>
            <Award className="w-8 h-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Auto-Graded</p>
              <p className="text-2xl font-bold text-teal-600">{stats.autoGraded}</p>
            </div>
            <Brain className="w-8 h-8 text-teal-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AutoGradingPanel: React.FC = () => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <Brain className="w-5 h-5" />
        <span>TIMA Cyborg Auto-Grading Engine</span>
        <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse ml-2"></div>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <Calculator className="w-8 h-8 text-teal-600" />
            <div>
              <h3 className="font-semibold text-teal-900 dark:text-teal-100">MCQ & Numerical</h3>
              <p className="text-sm text-teal-700 dark:text-teal-300">Instant grading</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Accuracy:</span>
              <span className="font-medium text-green-600">100%</span>
            </div>
            <div className="flex justify-between">
              <span>Speed:</span>
              <span className="font-medium">Real-time</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Essay Analysis</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">AI-powered evaluation</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Accuracy:</span>
              <span className="font-medium text-green-600">94.5%</span>
            </div>
            <div className="flex justify-between">
              <span>Processing:</span>
              <span className="font-medium">2-3 minutes</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <Award className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">Grade Analytics</h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">Performance insights</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Reports:</span>
              <span className="font-medium">Auto-generated</span>
            </div>
            <div className="flex justify-between">
              <span>Insights:</span>
              <span className="font-medium text-green-600">Advanced</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const ExaminationsPage: React.FC = () => {
  const [examinations, setExaminations] = useState<Examination[]>(mockExaminations);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');

  const filteredExaminations = examinations.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;
    const matchesType = typeFilter === 'all' || exam.exam_type === typeFilter;
    const matchesClass = classFilter === 'all' || exam.class === classFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesClass;
  });

  const handleEdit = (exam: Examination) => {
    console.log('Edit exam:', exam);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this examination?')) {
      setExaminations(examinations.filter(e => e.id !== id));
    }
  };

  const handleViewResults = (exam: Examination) => {
    console.log('View results for:', exam);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Examinations & Auto-Grading</h1>
            <p className="text-gray-600 dark:text-gray-400">Create, manage, and auto-grade examinations with AI</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import Questions
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Exam
            </Button>
          </div>
        </div>

        {/* Auto-Grading System Status */}
        <AutoGradingPanel />

        {/* Stats */}
        <ExamStats exams={examinations} />

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search examinations..."
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
                  <option value="scheduled">Scheduled</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="graded">Graded</option>
                </select>
                
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="unit_test">Unit Test</option>
                  <option value="mid_term">Mid Term</option>
                  <option value="final">Final</option>
                  <option value="assignment">Assignment</option>
                  <option value="project">Project</option>
                </select>
                
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Classes</option>
                  <option value="9-A">Class 9-A</option>
                  <option value="9-B">Class 9-B</option>
                  <option value="10-A">Class 10-A</option>
                  <option value="10-B">Class 10-B</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Examinations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredExaminations.map((exam) => (
            <ExamCard
              key={exam.id}
              exam={exam}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewResults={handleViewResults}
            />
          ))}
        </div>

        {filteredExaminations.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No examinations found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' || classFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating your first examination.'}
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Examination
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Question Bank</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage and organize exam questions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Grade Analytics</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Analyze student performance trends</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calculator className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Auto-Grade Settings</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Configure AI grading parameters</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};