import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Fingerprint, 
  Camera, 
  CreditCard,
  Search,
  Filter,
  Save,
  Upload,
  Download,
  Wifi,
  WifiOff
} from 'lucide-react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { db, subscriptions } from '../../lib/supabase';

interface Student {
  id: string;
  admission_number: string;
  roll_number?: string;
  user: {
    full_name: string;
    avatar_url?: string;
  };
  attendance_status?: 'present' | 'absent' | 'late' | 'excused';
  check_in_time?: string;
  biometric_verified?: boolean;
  method?: 'manual' | 'biometric' | 'rfid' | 'facial_recognition';
}

interface BiometricDevice {
  id: string;
  name: string;
  type: 'fingerprint' | 'facial_recognition' | 'rfid';
  status: 'online' | 'offline' | 'error';
  last_sync: string;
  success_rate: number;
}

const mockBiometricDevices: BiometricDevice[] = [
  {
    id: '1',
    name: 'Fingerprint Scanner - Main Gate',
    type: 'fingerprint',
    status: 'online',
    last_sync: '2024-12-10T08:30:00Z',
    success_rate: 98.5
  },
  {
    id: '2',
    name: 'Face Recognition - Classroom Block',
    type: 'facial_recognition',
    status: 'online',
    last_sync: '2024-12-10T08:25:00Z',
    success_rate: 96.8
  },
  {
    id: '3',
    name: 'RFID Reader - Library',
    type: 'rfid',
    status: 'offline',
    last_sync: '2024-12-10T07:45:00Z',
    success_rate: 99.2
  }
];

const BiometricDeviceCard: React.FC<{ device: BiometricDevice }> = ({ device }) => {
  const getDeviceIcon = () => {
    switch (device.type) {
      case 'fingerprint': return <Fingerprint className="w-6 h-6" />;
      case 'facial_recognition': return <Camera className="w-6 h-6" />;
      case 'rfid': return <CreditCard className="w-6 h-6" />;
    }
  };

  const getStatusColor = () => {
    switch (device.status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'offline': return 'text-red-600 bg-red-100';
      case 'error': return 'text-yellow-600 bg-yellow-100';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${device.status === 'online' ? 'bg-green-100' : device.status === 'offline' ? 'bg-red-100' : 'bg-yellow-100'}`}>
              {getDeviceIcon()}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{device.name}</h3>
              <p className="text-sm text-gray-600 capitalize">{device.type.replace('_', ' ')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
              {device.status}
            </span>
            {device.status === 'online' ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Success Rate</span>
            <span className="font-medium text-green-600">{device.success_rate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${device.success_rate}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Last Sync</span>
            <span>{new Date(device.last_sync).toLocaleTimeString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StudentAttendanceRow: React.FC<{
  student: Student;
  onMarkAttendance: (studentId: string, status: string, method: string) => void;
  isMarking: boolean;
}> = ({ student, onMarkAttendance, isMarking }) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'excused': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method?: string) => {
    switch (method) {
      case 'biometric': return <Fingerprint className="w-4 h-4" />;
      case 'facial_recognition': return <Camera className="w-4 h-4" />;
      case 'rfid': return <CreditCard className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {student.user.avatar_url ? (
              <img 
                src={student.user.avatar_url} 
                alt={student.user.full_name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              student.user.full_name.split(' ').map(n => n[0]).join('')
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {student.user.full_name}
            </div>
            <div className="text-sm text-gray-500">
              {student.admission_number} • Roll: {student.roll_number || 'N/A'}
            </div>
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        {student.attendance_status ? (
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.attendance_status)}`}>
              {student.attendance_status}
            </span>
            {student.biometric_verified && (
              <div className="flex items-center space-x-1 text-green-600">
                {getMethodIcon(student.method)}
                <span className="text-xs">Verified</span>
              </div>
            )}
          </div>
        ) : (
          <span className="text-gray-400 text-sm">Not marked</span>
        )}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {student.check_in_time || '-'}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant={student.attendance_status === 'present' ? 'primary' : 'outline'}
            onClick={() => onMarkAttendance(student.id, 'present', 'manual')}
            disabled={isMarking}
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Present
          </Button>
          <Button
            size="sm"
            variant={student.attendance_status === 'absent' ? 'danger' : 'outline'}
            onClick={() => onMarkAttendance(student.id, 'absent', 'manual')}
            disabled={isMarking}
          >
            <XCircle className="w-4 h-4 mr-1" />
            Absent
          </Button>
          <Button
            size="sm"
            variant={student.attendance_status === 'late' ? 'secondary' : 'outline'}
            onClick={() => onMarkAttendance(student.id, 'late', 'manual')}
            disabled={isMarking}
          >
            <AlertTriangle className="w-4 h-4 mr-1" />
            Late
          </Button>
        </div>
      </td>
    </tr>
  );
};

export const AttendanceMarkingPage: React.FC = () => {
  const { user } = useAuthStore();
  const [students, setStudents] = useState<Student[]>([]);
  const [biometricDevices] = useState<BiometricDevice[]>(mockBiometricDevices);
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    loadStudents();
    
    // Set up real-time subscription for attendance updates
    if (autoRefresh) {
      const subscription = subscriptions.subscribeToAttendance(selectedClass, (payload) => {
        console.log('Real-time attendance update:', payload);
        loadStudents(); // Refresh data when changes occur
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [selectedClass, selectedDate, autoRefresh]);

  const loadStudents = async () => {
    try {
      setLoading(true);
      
      // Mock data for demonstration
      const mockStudents: Student[] = [
        {
          id: '1',
          admission_number: 'STU001',
          roll_number: '01',
          user: { full_name: 'Arjun Sharma' },
          attendance_status: 'present',
          check_in_time: '08:15',
          biometric_verified: true,
          method: 'biometric'
        },
        {
          id: '2',
          admission_number: 'STU002',
          roll_number: '02',
          user: { full_name: 'Priya Patel' },
          attendance_status: 'late',
          check_in_time: '08:45',
          biometric_verified: true,
          method: 'facial_recognition'
        },
        {
          id: '3',
          admission_number: 'STU003',
          roll_number: '03',
          user: { full_name: 'Rahul Kumar' },
          attendance_status: 'absent',
          method: 'manual'
        },
        {
          id: '4',
          admission_number: 'STU004',
          roll_number: '04',
          user: { full_name: 'Ananya Singh' }
        },
        {
          id: '5',
          admission_number: 'STU005',
          roll_number: '05',
          user: { full_name: 'Vikash Gupta' }
        }
      ];
      
      setStudents(mockStudents);
    } catch (error) {
      console.error('Error loading students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAttendance = async (studentId: string, status: string, method: string) => {
    try {
      setMarking(true);
      
      // Update local state immediately for better UX
      setStudents(prev => prev.map(student => 
        student.id === studentId 
          ? { 
              ...student, 
              attendance_status: status as any,
              check_in_time: status === 'present' || status === 'late' ? new Date().toLocaleTimeString() : undefined,
              method: method as any,
              biometric_verified: method !== 'manual'
            }
          : student
      ));

      // In a real implementation, this would call the API
      const attendanceData = {
        student_id: studentId,
        date: selectedDate,
        status,
        method,
        check_in_time: status === 'present' || status === 'late' ? new Date().toISOString() : null,
        marked_by: user?.id
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Attendance marked:', attendanceData);
      
    } catch (error) {
      console.error('Error marking attendance:', error);
      // Revert local state on error
      loadStudents();
    } finally {
      setMarking(false);
    }
  };

  const handleBulkMarkPresent = async () => {
    const unmarkedStudents = students.filter(s => !s.attendance_status);
    for (const student of unmarkedStudents) {
      await handleMarkAttendance(student.id, 'present', 'manual');
    }
  };

  const handleSaveAttendance = async () => {
    try {
      setMarking(true);
      
      // In a real implementation, this would save all attendance records
      console.log('Saving attendance for date:', selectedDate);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Attendance saved successfully!');
      
    } catch (error) {
      console.error('Error saving attendance:', error);
      alert('Error saving attendance. Please try again.');
    } finally {
      setMarking(false);
    }
  };

  const filteredStudents = students.filter(student =>
    student.user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.admission_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.roll_number && student.roll_number.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const attendanceStats = {
    total: students.length,
    present: students.filter(s => s.attendance_status === 'present').length,
    absent: students.filter(s => s.attendance_status === 'absent').length,
    late: students.filter(s => s.attendance_status === 'late').length,
    unmarked: students.filter(s => !s.attendance_status).length,
    biometric_verified: students.filter(s => s.biometric_verified).length
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mark Attendance</h1>
            <p className="text-gray-600 dark:text-gray-400">Real-time attendance marking with biometric integration</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Auto-refresh:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <Button variant="outline" onClick={handleBulkMarkPresent} disabled={marking}>
              <Users className="w-4 h-4 mr-2" />
              Mark All Present
            </Button>
            <Button onClick={handleSaveAttendance} loading={marking}>
              <Save className="w-4 h-4 mr-2" />
              Save Attendance
            </Button>
          </div>
        </div>

        {/* Biometric Devices Status */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Biometric Devices Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {biometricDevices.map((device) => (
              <BiometricDeviceCard key={device.id} device={device} />
            ))}
          </div>
        </div>

        {/* Class and Date Selection */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
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
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{attendanceStats.total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{attendanceStats.present}</div>
                <div className="text-sm text-gray-600">Present</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{attendanceStats.absent}</div>
                <div className="text-sm text-gray-600">Absent</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{attendanceStats.late}</div>
                <div className="text-sm text-gray-600">Late</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{attendanceStats.unmarked}</div>
                <div className="text-sm text-gray-600">Unmarked</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{attendanceStats.biometric_verified}</div>
                <div className="text-sm text-gray-600">Biometric</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students Attendance Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Students - {selectedClass}</span>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Completion: {Math.round(((attendanceStats.total - attendanceStats.unmarked) / attendanceStats.total) * 100)}%</span>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((attendanceStats.total - attendanceStats.unmarked) / attendanceStats.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredStudents.map((student) => (
                    <StudentAttendanceRow
                      key={student.id}
                      student={student}
                      onMarkAttendance={handleMarkAttendance}
                      isMarking={marking}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {filteredStudents.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No students found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm ? 'Try adjusting your search criteria.' : 'No students enrolled in this class.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};