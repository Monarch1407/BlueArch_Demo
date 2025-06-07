import React, { useState } from 'react';
import { Plus, Calendar, Clock, Users, BookOpen, Edit, Trash2, Download, Upload, Filter, Search } from 'lucide-react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface TimeSlot {
  id: string;
  start_time: string;
  end_time: string;
  duration: number;
}

interface TimetableEntry {
  id: string;
  day: string;
  time_slot_id: string;
  subject_id: string;
  teacher_id: string;
  class_id: string;
  room: string;
  subject_name: string;
  teacher_name: string;
  class_name: string;
  is_break?: boolean;
  break_type?: 'short' | 'lunch' | 'assembly';
}

interface Class {
  id: string;
  name: string;
  section: string;
  strength: number;
}

const mockTimeSlots: TimeSlot[] = [
  { id: '1', start_time: '08:00', end_time: '08:45', duration: 45 },
  { id: '2', start_time: '08:45', end_time: '09:30', duration: 45 },
  { id: '3', start_time: '09:30', end_time: '09:45', duration: 15 }, // Short Break
  { id: '4', start_time: '09:45', end_time: '10:30', duration: 45 },
  { id: '5', start_time: '10:30', end_time: '11:15', duration: 45 },
  { id: '6', start_time: '11:15', end_time: '12:00', duration: 45 },
  { id: '7', start_time: '12:00', end_time: '12:45', duration: 45 }, // Lunch Break
  { id: '8', start_time: '12:45', end_time: '13:30', duration: 45 },
  { id: '9', start_time: '13:30', end_time: '14:15', duration: 45 },
  { id: '10', start_time: '14:15', end_time: '15:00', duration: 45 },
];

const mockClasses: Class[] = [
  { id: '1', name: '9', section: 'A', strength: 35 },
  { id: '2', name: '9', section: 'B', strength: 32 },
  { id: '3', name: '10', section: 'A', strength: 38 },
  { id: '4', name: '10', section: 'B', strength: 36 },
  { id: '5', name: '11', section: 'A', strength: 30 },
  { id: '6', name: '11', section: 'B', strength: 28 },
];

const mockTimetableEntries: TimetableEntry[] = [
  {
    id: '1',
    day: 'Monday',
    time_slot_id: '1',
    subject_id: 'math',
    teacher_id: 'teacher1',
    class_id: '1',
    room: 'Room 101',
    subject_name: 'Mathematics',
    teacher_name: 'Dr. Priya Sharma',
    class_name: '9-A'
  },
  {
    id: '2',
    day: 'Monday',
    time_slot_id: '2',
    subject_id: 'physics',
    teacher_id: 'teacher2',
    class_id: '1',
    room: 'Lab 1',
    subject_name: 'Physics',
    teacher_name: 'Mr. Rajesh Kumar',
    class_name: '9-A'
  },
  {
    id: '3',
    day: 'Monday',
    time_slot_id: '3',
    subject_id: 'break',
    teacher_id: '',
    class_id: '1',
    room: '',
    subject_name: 'Short Break',
    teacher_name: '',
    class_name: '9-A',
    is_break: true,
    break_type: 'short'
  }
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TimetableGrid: React.FC<{
  selectedClass: string;
  entries: TimetableEntry[];
  timeSlots: TimeSlot[];
  onEditEntry: (entry: TimetableEntry) => void;
}> = ({ selectedClass, entries, timeSlots, onEditEntry }) => {
  const getEntryForSlot = (day: string, timeSlotId: string) => {
    return entries.find(entry => 
      entry.day === day && 
      entry.time_slot_id === timeSlotId && 
      entry.class_id === selectedClass
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800">
            <th className="border border-gray-200 dark:border-gray-700 p-3 text-left font-medium text-gray-900 dark:text-white min-w-24">
              Time
            </th>
            {days.map(day => (
              <th key={day} className="border border-gray-200 dark:border-gray-700 p-3 text-center font-medium text-gray-900 dark:text-white min-w-32">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(slot => (
            <tr key={slot.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="border border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {slot.start_time}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {slot.end_time}
                </div>
                <div className="text-xs text-gray-400">
                  {slot.duration}min
                </div>
              </td>
              {days.map(day => {
                const entry = getEntryForSlot(day, slot.id);
                return (
                  <td key={`${day}-${slot.id}`} className="border border-gray-200 dark:border-gray-700 p-2">
                    {entry ? (
                      <div
                        className={`p-2 rounded-lg cursor-pointer transition-colors ${
                          entry.is_break
                            ? entry.break_type === 'lunch'
                              ? 'bg-orange-100 hover:bg-orange-200 text-orange-800'
                              : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
                            : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                        }`}
                        onClick={() => !entry.is_break && onEditEntry(entry)}
                      >
                        <div className="text-sm font-medium">{entry.subject_name}</div>
                        {!entry.is_break && (
                          <>
                            <div className="text-xs">{entry.teacher_name}</div>
                            <div className="text-xs">{entry.room}</div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="h-16 flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                        <Plus className="w-4 h-4" />
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TimetableStats: React.FC<{ entries: TimetableEntry[]; selectedClass: string }> = ({ entries, selectedClass }) => {
  const classEntries = entries.filter(entry => entry.class_id === selectedClass && !entry.is_break);
  const totalPeriods = classEntries.length;
  const uniqueSubjects = new Set(classEntries.map(entry => entry.subject_id)).size;
  const uniqueTeachers = new Set(classEntries.map(entry => entry.teacher_id)).size;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Periods</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalPeriods}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Subjects</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{uniqueSubjects}</p>
            </div>
            <BookOpen className="w-8 h-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Teachers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{uniqueTeachers}</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round((totalPeriods / (days.length * (timeSlots.length - 2))) * 100)}%
              </p>
            </div>
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const TimetablePage: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('1');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimetableEntry | null>(null);

  const handleEditEntry = (entry: TimetableEntry) => {
    setEditingEntry(entry);
    setShowAddModal(true);
  };

  const selectedClassInfo = mockClasses.find(c => c.id === selectedClass);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Timetable Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Create and manage class schedules and curriculum</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import Schedule
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Period
            </Button>
          </div>
        </div>

        {/* Class Selection and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Select Class
                  </label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {mockClasses.map(cls => (
                      <option key={cls.id} value={cls.id}>
                        Class {cls.name}-{cls.section} ({cls.strength} students)
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Academic Year
                  </label>
                  <select className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="2024-25">2024-25</option>
                    <option value="2023-24">2023-24</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  Grid View
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  List View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <TimetableStats entries={mockTimetableEntries} selectedClass={selectedClass} />

        {/* Timetable Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>
                  Weekly Timetable - Class {selectedClassInfo?.name}-{selectedClassInfo?.section}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-100 rounded"></div>
                  <span>Regular Class</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-yellow-100 rounded"></div>
                  <span>Break</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-orange-100 rounded"></div>
                  <span>Lunch</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {viewMode === 'grid' ? (
              <TimetableGrid
                selectedClass={selectedClass}
                entries={mockTimetableEntries}
                timeSlots={mockTimeSlots}
                onEditEntry={handleEditEntry}
              />
            ) : (
              <div className="space-y-4">
                {days.map(day => (
                  <Card key={day}>
                    <CardHeader>
                      <CardTitle className="text-lg">{day}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mockTimetableEntries
                          .filter(entry => entry.day === day && entry.class_id === selectedClass)
                          .map(entry => {
                            const timeSlot = mockTimeSlots.find(slot => slot.id === entry.time_slot_id);
                            return (
                              <div
                                key={entry.id}
                                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                                  entry.is_break
                                    ? 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                                    : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                                }`}
                                onClick={() => !entry.is_break && handleEditEntry(entry)}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-gray-600">
                                    {timeSlot?.start_time} - {timeSlot?.end_time}
                                  </span>
                                  {!entry.is_break && (
                                    <Button variant="ghost" size="sm">
                                      <Edit className="w-3 h-3" />
                                    </Button>
                                  )}
                                </div>
                                <h4 className="font-semibold text-gray-900">{entry.subject_name}</h4>
                                {!entry.is_break && (
                                  <>
                                    <p className="text-sm text-gray-600">{entry.teacher_name}</p>
                                    <p className="text-sm text-gray-500">{entry.room}</p>
                                  </>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Bulk Schedule</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Create schedules for multiple classes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Teacher Workload</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Analyze teacher schedules and workload</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Curriculum Mapping</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Map subjects to curriculum standards</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};