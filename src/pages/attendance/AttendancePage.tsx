import React, { useState } from 'react';
import { Plus, Calendar, Users, Clock, CheckCircle, XCircle, Download, Upload, Search, Filter, UserCheck, AlertTriangle, TrendingUp, Camera, Fingerprint, BarChart3, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface AttendanceRecord {
  id: string;
  student_id: string;
  student_name: string;
  class: string;
  section: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  check_in_time?: string;
  check_out_time?: string;
  method: 'manual' | 'biometric' | 'rfid' | 'facial_recognition';
  marked_by: string;
  notes?: string;
}

interface AttendanceStats {
  total_students: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendance_rate: number;
}

const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    student_id: 'STU001',
    student_name: 'Arjun Sharma',
    class: '10',
    section: 'A',
    date: '2024-12-10',
    status: 'present',
    check_in_time: '08:15',
    check_out_time: '15:30',
    method: 'biometric',
    marked_by: 'System'
  },
  {
    id: '2',
    student_id: 'STU002',
    student_name: 'Priya Patel',
    class: '10',
    section: 'A',
    date: '2024-12-10',
    status: 'late',
    check_in_time: '08:45',
    method: 'facial_recognition',
    marked_by: 'System',
    notes: 'Traffic delay'
  },
  {
    id: '3',
    student_id: 'STU003',
    student_name: 'Rahul Kumar',
    class: '10',
    section: 'A',
    date: '2024-12-10',
    status: 'absent',
    method: 'manual',
    marked_by: 'Mrs. Smith',
    notes: 'Sick leave'
  }
];

const AttendanceStatsCard: React.FC<{ stats: AttendanceStats }> = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Students</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total_students}</p>
          </div>
          <Users className="w-8 h-8 text-blue-500" />
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Present</p>
            <p className="text-2xl font-bold text-green-600">{stats.present}</p>
          </div>
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Absent</p>
            <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
          </div>
          <XCircle className="w-8 h-8 text-red-500" />
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Late</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
          </div>
          <Clock className="w-8 h-8 text-yellow-500" />
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Attendance Rate</p>
            <p className="text-2xl font-bold text-blue-600">{stats.attendance_rate}%</p>
          </div>
          <TrendingUp className="w-8 h-8 text-blue-500" />
        </div>
      </CardContent>
    </Card>
  </div>
);

const BiometricPanel: React.FC = () => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <Fingerprint className="w-5 h-5" />
        <span>Biometric Attendance System</span>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-2"></div>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <Fingerprint className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Fingerprint Scanner</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">Status: Online</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Today's Scans:</span>
              <span className="font-medium">247</span>
            </div>
            <div className="flex justify-between">
              <span>Success Rate:</span>
              <span className="font-medium text-green-600">98.5%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <Camera className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-900 dark:text-green-100">Facial Recognition</h3>
              <p className="text-sm text-green-700 dark:text-green-300">Status: Active</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Recognitions:</span>
              <span className="font-medium">189</span>
            </div>
            <div className="flex justify-between">
              <span>Accuracy:</span>
              <span className="font-medium text-green-600">96.8%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <UserCheck className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">RFID Cards</h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">Status: Connected</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Card Taps:</span>
              <span className="font-medium">156</span>
            </div>
            <div className="flex justify-between">
              <span>Valid Cards:</span>
              <span className="font-medium text-green-600">100%</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const AttendancePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('2024-12-10');
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockAttendanceRecords);
  const [searchTerm, setSearchTerm] = useState('');

  const stats: AttendanceStats = {
    total_students: 35,
    present: 32,
    absent: 2,
    late: 1,
    excused: 0,
    attendance_rate: 94.3
  };

  const filteredRecords = attendanceRecords.filter(record =>
    record.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.student_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'excused': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'biometric': return <Fingerprint className="w-4 h-4" />;
      case 'facial_recognition': return <Camera className="w-4 h-4" />;
      case 'rfid': return <UserCheck className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Attendance Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Track student attendance with biometric integration</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Bulk Import
            </Button>
            <Button onClick={() => navigate('/attendance/mark')}>
              <Plus className="w-4 h-4 mr-2" />
              Mark Attendance
            </Button>
          </div>
        </div>

        {/* Biometric System Status */}
        <BiometricPanel />

        {/* Date and Class Selection */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Class
                  </label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="10-A">Class 10-A</option>
                    <option value="10-B">Class 10-B</option>
                    <option value="9-A">Class 9-A</option>
                    <option value="9-B">Class 9-B</option>
                  </select>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Stats */}
        <AttendanceStatsCard stats={stats} />

        {/* Attendance Records */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Attendance Records - {selectedDate}</span>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-600">Auto-refresh:</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {record.student_name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{record.student_name}</div>
                            <div className="text-sm text-gray-500">{record.student_id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {record.check_in_time || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {record.check_out_time || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getMethodIcon(record.method)}
                          <span className="text-sm text-gray-900 dark:text-white capitalize">
                            {record.method.replace('_', ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.notes || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/attendance/analytics')}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Attendance Analytics</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">View detailed attendance reports and trends</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Absentee Alerts</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Send notifications to parents for absences</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Fingerprint className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Biometric Setup</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Configure biometric devices and settings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};