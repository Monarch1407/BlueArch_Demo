import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Save, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  User, 
  Heart, 
  GraduationCap,
  FileText,
  TrendingUp,
  Clock,
  Award,
  AlertTriangle,
  Camera,
  Upload
} from 'lucide-react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { db } from '../../lib/supabase';

interface StudentDetail {
  id: string;
  user_id: string;
  admission_number: string;
  roll_number?: string;
  date_of_birth?: string;
  gender?: string;
  blood_group?: string;
  address?: string;
  emergency_contact?: string;
  medical_conditions?: string;
  transport_required: boolean;
  hostel_required: boolean;
  admission_date: string;
  user: {
    id: string;
    full_name: string;
    email: string;
    phone?: string;
    avatar_url?: string;
  };
  class: {
    id: string;
    name: string;
    section: string;
  };
  parents: Array<{
    relationship: string;
    parent: {
      id: string;
      user: {
        full_name: string;
        email: string;
        phone?: string;
      };
      occupation?: string;
    };
  }>;
}

interface AttendanceStats {
  total_days: number;
  present_days: number;
  absent_days: number;
  late_days: number;
  attendance_percentage: number;
}

interface AcademicPerformance {
  subject: string;
  total_marks: number;
  obtained_marks: number;
  percentage: number;
  grade: string;
  rank?: number;
}

export const StudentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [attendanceStats, setAttendanceStats] = useState<AttendanceStats | null>(null);
  const [academicPerformance, setAcademicPerformance] = useState<AcademicPerformance[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState<any>({});

  useEffect(() => {
    if (id) {
      loadStudentData();
    }
  }, [id]);

  const loadStudentData = async () => {
    try {
      setLoading(true);
      
      // Load student details
      const { data: studentData, error: studentError } = await db.getStudent(id!);
      if (studentError) throw studentError;
      
      setStudent(studentData);
      setEditForm({
        full_name: studentData.user.full_name,
        email: studentData.user.email,
        phone: studentData.user.phone || '',
        roll_number: studentData.roll_number || '',
        blood_group: studentData.blood_group || '',
        address: studentData.address || '',
        emergency_contact: studentData.emergency_contact || '',
        medical_conditions: studentData.medical_conditions || '',
        transport_required: studentData.transport_required,
        hostel_required: studentData.hostel_required
      });

      // Load attendance stats (mock data for now)
      setAttendanceStats({
        total_days: 180,
        present_days: 165,
        absent_days: 12,
        late_days: 3,
        attendance_percentage: 91.7
      });

      // Load academic performance (mock data for now)
      setAcademicPerformance([
        { subject: 'Mathematics', total_marks: 100, obtained_marks: 85, percentage: 85, grade: 'A', rank: 5 },
        { subject: 'Physics', total_marks: 100, obtained_marks: 78, percentage: 78, grade: 'B+', rank: 8 },
        { subject: 'Chemistry', total_marks: 100, obtained_marks: 92, percentage: 92, grade: 'A+', rank: 2 },
        { subject: 'English', total_marks: 100, obtained_marks: 88, percentage: 88, grade: 'A', rank: 4 },
        { subject: 'Biology', total_marks: 100, obtained_marks: 82, percentage: 82, grade: 'A-', rank: 6 }
      ]);

    } catch (error) {
      console.error('Error loading student data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Update student data
      const { error } = await db.updateStudent(id!, {
        roll_number: editForm.roll_number,
        blood_group: editForm.blood_group,
        address: editForm.address,
        emergency_contact: editForm.emergency_contact,
        medical_conditions: editForm.medical_conditions,
        transport_required: editForm.transport_required,
        hostel_required: editForm.hostel_required
      });

      if (error) throw error;

      // Reload data
      await loadStudentData();
      setIsEditing(false);
      
    } catch (error) {
      console.error('Error saving student data:', error);
    } finally {
      setSaving(false);
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'text-green-600 bg-green-100';
      case 'A': return 'text-green-600 bg-green-100';
      case 'A-': return 'text-blue-600 bg-blue-100';
      case 'B+': return 'text-blue-600 bg-blue-100';
      case 'B': return 'text-yellow-600 bg-yellow-100';
      case 'B-': return 'text-yellow-600 bg-yellow-100';
      case 'C': return 'text-orange-600 bg-orange-100';
      default: return 'text-red-600 bg-red-100';
    }
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

  if (!student) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">Student not found</h2>
          <Button onClick={() => navigate('/students')} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Students
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/students')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {student.user.full_name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {student.admission_number} • Class {student.class.name}-{student.class.section}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} loading={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Basic Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      {student.user.avatar_url ? (
                        <img 
                          src={student.user.avatar_url} 
                          alt={student.user.full_name}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : (
                        student.user.full_name.split(' ').map(n => n[0]).join('')
                      )}
                    </div>
                    {isEditing && (
                      <Button 
                        size="sm" 
                        className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <div className="space-y-3">
                      <Input
                        value={editForm.full_name}
                        onChange={(e) => setEditForm({...editForm, full_name: e.target.value})}
                        placeholder="Full Name"
                      />
                      <Input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        placeholder="Email"
                      />
                      <Input
                        value={editForm.phone}
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        placeholder="Phone Number"
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {student.user.full_name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">{student.admission_number}</p>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{student.user.email}</span>
                        </div>
                        {student.user.phone && (
                          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{student.user.phone}</span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Roll Number</label>
                      {isEditing ? (
                        <Input
                          value={editForm.roll_number}
                          onChange={(e) => setEditForm({...editForm, roll_number: e.target.value})}
                          placeholder="Roll Number"
                        />
                      ) : (
                        <p className="text-sm text-gray-900">{student.roll_number || 'Not assigned'}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Blood Group</label>
                      {isEditing ? (
                        <select
                          value={editForm.blood_group}
                          onChange={(e) => setEditForm({...editForm, blood_group: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      ) : (
                        <p className="text-sm text-gray-900">{student.blood_group || 'Not specified'}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                    <p className="text-sm text-gray-900">
                      {student.date_of_birth ? new Date(student.date_of_birth).toLocaleDateString() : 'Not specified'}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Gender</label>
                    <p className="text-sm text-gray-900 capitalize">{student.gender || 'Not specified'}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Address</label>
                    {isEditing ? (
                      <textarea
                        value={editForm.address}
                        onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                        placeholder="Address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        rows={3}
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{student.address || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
                    {isEditing ? (
                      <Input
                        value={editForm.emergency_contact}
                        onChange={(e) => setEditForm({...editForm, emergency_contact: e.target.value})}
                        placeholder="Emergency Contact"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{student.emergency_contact || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Medical Conditions</label>
                    {isEditing ? (
                      <textarea
                        value={editForm.medical_conditions}
                        onChange={(e) => setEditForm({...editForm, medical_conditions: e.target.value})}
                        placeholder="Medical Conditions"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        rows={2}
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{student.medical_conditions || 'None reported'}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Transport</label>
                      {isEditing ? (
                        <label className="flex items-center mt-1">
                          <input
                            type="checkbox"
                            checked={editForm.transport_required}
                            onChange={(e) => setEditForm({...editForm, transport_required: e.target.checked})}
                            className="rounded border-gray-300"
                          />
                          <span className="ml-2 text-sm">Required</span>
                        </label>
                      ) : (
                        <p className="text-sm text-gray-900">
                          {student.transport_required ? 'Required' : 'Not required'}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Hostel</label>
                      {isEditing ? (
                        <label className="flex items-center mt-1">
                          <input
                            type="checkbox"
                            checked={editForm.hostel_required}
                            onChange={(e) => setEditForm({...editForm, hostel_required: e.target.checked})}
                            className="rounded border-gray-300"
                          />
                          <span className="ml-2 text-sm">Required</span>
                        </label>
                      ) : (
                        <p className="text-sm text-gray-900">
                          {student.hostel_required ? 'Required' : 'Not required'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Parent Information */}
            <Card>
              <CardHeader>
                <CardTitle>Parent Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {student.parents.map((parentInfo, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-900 capitalize">
                          {parentInfo.relationship}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>{parentInfo.parent.user.full_name}</p>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-3 h-3" />
                          <span>{parentInfo.parent.user.email}</span>
                        </div>
                        {parentInfo.parent.user.phone && (
                          <div className="flex items-center space-x-2">
                            <Phone className="w-3 h-3" />
                            <span>{parentInfo.parent.user.phone}</span>
                          </div>
                        )}
                        {parentInfo.parent.occupation && (
                          <p className="text-xs text-gray-500">
                            Occupation: {parentInfo.parent.occupation}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Academic & Performance Data */}
          <div className="lg:col-span-2 space-y-6">
            {/* Attendance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Attendance Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {attendanceStats && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{attendanceStats.total_days}</div>
                      <div className="text-sm text-gray-600">Total Days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{attendanceStats.present_days}</div>
                      <div className="text-sm text-gray-600">Present</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{attendanceStats.absent_days}</div>
                      <div className="text-sm text-gray-600">Absent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{attendanceStats.late_days}</div>
                      <div className="text-sm text-gray-600">Late</div>
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Attendance Rate</span>
                    <span className="font-medium">{attendanceStats?.attendance_percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${attendanceStats?.attendance_percentage}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Academic Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {academicPerformance.map((subject, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{subject.subject}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(subject.grade)}`}>
                            {subject.grade}
                          </span>
                          {subject.rank && (
                            <span className="text-xs text-gray-500">Rank #{subject.rank}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>{subject.obtained_marks}/{subject.total_marks}</span>
                        <span>{subject.percentage}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${subject.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Overall Performance</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-600">
                        {Math.round(academicPerformance.reduce((acc, subj) => acc + subj.percentage, 0) / academicPerformance.length)}%
                      </div>
                      <div className="text-xs text-blue-700">Average</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">A</div>
                      <div className="text-xs text-green-700">Overall Grade</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-600">5</div>
                      <div className="text-xs text-purple-700">Class Rank</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Recent Activities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-900">Assignment Submitted</p>
                      <p className="text-xs text-green-700">Mathematics - Algebra Problems</p>
                      <p className="text-xs text-green-600">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900">Exam Result Published</p>
                      <p className="text-xs text-blue-700">Physics Unit Test - Score: 78/100</p>
                      <p className="text-xs text-blue-600">1 day ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-yellow-900">Late Arrival</p>
                      <p className="text-xs text-yellow-700">Arrived 15 minutes late</p>
                      <p className="text-xs text-yellow-600">3 days ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-purple-900">Achievement Unlocked</p>
                      <p className="text-xs text-purple-700">Perfect Attendance - Week 12</p>
                      <p className="text-xs text-purple-600">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};