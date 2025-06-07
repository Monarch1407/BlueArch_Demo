import React, { useState } from 'react';
import { Plus, BookOpen, Target, Clock, Users, Edit, Trash2, Download, Upload, Search, Filter } from 'lucide-react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface CurriculumStandard {
  id: string;
  code: string;
  title: string;
  description: string;
  grade_level: string;
  subject: string;
  category: 'core' | 'elective' | 'extracurricular';
  learning_objectives: string[];
  assessment_methods: string[];
  duration_weeks: number;
  prerequisites?: string[];
  resources: string[];
  status: 'draft' | 'active' | 'archived';
  created_at: string;
  updated_at: string;
}

interface LearningOutcome {
  id: string;
  curriculum_id: string;
  outcome: string;
  bloom_level: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';
  assessment_criteria: string;
  weightage: number;
}

const mockCurriculumStandards: CurriculumStandard[] = [
  {
    id: '1',
    code: 'MATH-9-ALG',
    title: 'Algebraic Expressions and Equations',
    description: 'Introduction to algebraic concepts, expressions, and linear equations',
    grade_level: '9',
    subject: 'Mathematics',
    category: 'core',
    learning_objectives: [
      'Understand algebraic expressions and their components',
      'Solve linear equations in one variable',
      'Apply algebraic concepts to real-world problems'
    ],
    assessment_methods: ['Written Tests', 'Problem Solving', 'Project Work'],
    duration_weeks: 6,
    prerequisites: ['Basic Arithmetic', 'Number Systems'],
    resources: ['Textbook Chapter 2', 'Online Practice Platform', 'Manipulatives'],
    status: 'active',
    created_at: '2024-01-15',
    updated_at: '2024-02-01'
  },
  {
    id: '2',
    code: 'SCI-9-PHYS',
    title: 'Motion and Force',
    description: 'Fundamental concepts of motion, velocity, acceleration, and Newton\'s laws',
    grade_level: '9',
    subject: 'Physics',
    category: 'core',
    learning_objectives: [
      'Define and calculate velocity and acceleration',
      'Understand Newton\'s three laws of motion',
      'Analyze motion using graphs and equations'
    ],
    assessment_methods: ['Lab Reports', 'Practical Experiments', 'Theory Tests'],
    duration_weeks: 8,
    prerequisites: ['Basic Mathematics', 'Measurement Units'],
    resources: ['Physics Lab Equipment', 'Simulation Software', 'Video Demonstrations'],
    status: 'active',
    created_at: '2024-01-20',
    updated_at: '2024-02-05'
  },
  {
    id: '3',
    code: 'ENG-9-LIT',
    title: 'Poetry Analysis and Appreciation',
    description: 'Study of poetic devices, themes, and critical analysis of selected poems',
    grade_level: '9',
    subject: 'English Literature',
    category: 'core',
    learning_objectives: [
      'Identify and analyze poetic devices',
      'Interpret themes and meanings in poetry',
      'Express personal responses to literary works'
    ],
    assessment_methods: ['Essay Writing', 'Oral Presentations', 'Creative Writing'],
    duration_weeks: 4,
    resources: ['Poetry Anthology', 'Audio Recordings', 'Literary Analysis Guides'],
    status: 'active',
    created_at: '2024-01-25',
    updated_at: '2024-02-10'
  }
];

const mockLearningOutcomes: LearningOutcome[] = [
  {
    id: '1',
    curriculum_id: '1',
    outcome: 'Students can simplify algebraic expressions using basic operations',
    bloom_level: 'apply',
    assessment_criteria: 'Correctly simplifies 8 out of 10 expressions',
    weightage: 25
  },
  {
    id: '2',
    curriculum_id: '1',
    outcome: 'Students can solve linear equations with one variable',
    bloom_level: 'apply',
    assessment_criteria: 'Solves equations with 90% accuracy',
    weightage: 35
  },
  {
    id: '3',
    curriculum_id: '1',
    outcome: 'Students can create word problems involving algebraic concepts',
    bloom_level: 'create',
    assessment_criteria: 'Creates relevant and solvable word problems',
    weightage: 40
  }
];

const CurriculumCard: React.FC<{
  curriculum: CurriculumStandard;
  onEdit: (curriculum: CurriculumStandard) => void;
  onDelete: (id: string) => void;
}> = ({ curriculum, onEdit, onDelete }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
              {curriculum.code}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              curriculum.status === 'active' ? 'bg-green-100 text-green-800' :
              curriculum.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {curriculum.status}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              curriculum.category === 'core' ? 'bg-purple-100 text-purple-800' :
              curriculum.category === 'elective' ? 'bg-orange-100 text-orange-800' :
              'bg-teal-100 text-teal-800'
            }`}>
              {curriculum.category}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{curriculum.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{curriculum.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(curriculum)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(curriculum.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p className="text-gray-600 dark:text-gray-400">Grade Level</p>
          <p className="font-medium">Class {curriculum.grade_level}</p>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-400">Subject</p>
          <p className="font-medium">{curriculum.subject}</p>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-400">Duration</p>
          <p className="font-medium">{curriculum.duration_weeks} weeks</p>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-400">Objectives</p>
          <p className="font-medium">{curriculum.learning_objectives.length} items</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Learning Objectives:</p>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            {curriculum.learning_objectives.slice(0, 2).map((objective, index) => (
              <li key={index} className="flex items-start">
                <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {objective}
              </li>
            ))}
            {curriculum.learning_objectives.length > 2 && (
              <li className="text-blue-600 font-medium">
                +{curriculum.learning_objectives.length - 2} more...
              </li>
            )}
          </ul>
        </div>
        
        <div>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Assessment Methods:</p>
          <div className="flex flex-wrap gap-1">
            {curriculum.assessment_methods.map((method, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <span className="text-xs text-gray-500">
          Updated: {new Date(curriculum.updated_at).toLocaleDateString()}
        </span>
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-500">
            {mockLearningOutcomes.filter(o => o.curriculum_id === curriculum.id).length} outcomes
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const CurriculumStats: React.FC<{ standards: CurriculumStandard[] }> = ({ standards }) => {
  const stats = {
    total: standards.length,
    active: standards.filter(s => s.status === 'active').length,
    draft: standards.filter(s => s.status === 'draft').length,
    core: standards.filter(s => s.category === 'core').length,
    elective: standards.filter(s => s.category === 'elective').length,
    avgDuration: Math.round(standards.reduce((acc, s) => acc + s.duration_weeks, 0) / standards.length)
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Standards</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
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
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Draft</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.draft}</p>
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Core Subjects</p>
              <p className="text-2xl font-bold text-purple-600">{stats.core}</p>
            </div>
            <Target className="w-8 h-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Electives</p>
              <p className="text-2xl font-bold text-orange-600">{stats.elective}</p>
            </div>
            <Users className="w-8 h-8 text-orange-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Duration</p>
              <p className="text-2xl font-bold text-blue-600">{stats.avgDuration}w</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const CurriculumPage: React.FC = () => {
  const [standards, setStandards] = useState<CurriculumStandard[]>(mockCurriculumStandards);
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredStandards = standards.filter(standard => {
    const matchesSearch = standard.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         standard.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         standard.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === 'all' || standard.grade_level === gradeFilter;
    const matchesSubject = subjectFilter === 'all' || standard.subject === subjectFilter;
    const matchesStatus = statusFilter === 'all' || standard.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || standard.category === categoryFilter;
    
    return matchesSearch && matchesGrade && matchesSubject && matchesStatus && matchesCategory;
  });

  const handleEdit = (standard: CurriculumStandard) => {
    console.log('Edit standard:', standard);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this curriculum standard?')) {
      setStandards(standards.filter(s => s.id !== id));
    }
  };

  const subjects = [...new Set(standards.map(s => s.subject))];
  const grades = [...new Set(standards.map(s => s.grade_level))].sort();

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Curriculum Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Design and manage curriculum standards and learning outcomes</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import Standards
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Curriculum
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Standard
            </Button>
          </div>
        </div>

        {/* Stats */}
        <CurriculumStats standards={standards} />

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search curriculum standards..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Grades</option>
                  {grades.map(grade => (
                    <option key={grade} value={grade}>Class {grade}</option>
                  ))}
                </select>
                
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
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
                
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="core">Core</option>
                  <option value="elective">Elective</option>
                  <option value="extracurricular">Extracurricular</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Curriculum Standards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStandards.map((standard) => (
            <CurriculumCard
              key={standard.id}
              curriculum={standard}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {filteredStandards.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No curriculum standards found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchTerm || gradeFilter !== 'all' || subjectFilter !== 'all' || statusFilter !== 'all' || categoryFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating your first curriculum standard.'}
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Curriculum Standard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};