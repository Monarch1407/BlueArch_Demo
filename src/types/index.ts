export interface User {
  id: string;
  full_name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  status: 'active' | 'inactive';
  created_at: string;
}

export interface Institution {
  id: string;
  name: string;
  logo_url?: string;
  academic_year: string;
  contact_email: string;
  created_by: string;
  created_at: string;
}

export interface Student {
  id: string;
  user_id: string;
  admission_no: string;
  class: string;
  section?: string;
  dob?: string;
  gender?: string;
  blood_group?: string;
  parent_id?: string;
  institution_id: string;
  created_at: string;
  user?: User;
}

export interface Teacher {
  id: string;
  user_id: string;
  subject_specialization: string;
  is_class_teacher: boolean;
  class_assigned?: string;
  institution_id: string;
  created_at: string;
  user?: User;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  class: string;
  teacher_id: string;
  institution_id: string;
  created_at: string;
}

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  due_date: string;
  subject_id: string;
  created_by: string;
  created_at: string;
}

export interface FeePayment {
  id: string;
  student_id: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  payment_date?: string;
  payment_mode?: 'razorpay';
  razorpay_reference?: string;
  created_at: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  attendanceRate: number;
  pendingFees: number;
  activeAssignments: number;
  recentActivities: Array<{
    id: string;
    action: string;
    user: string;
    timestamp: string;
  }>;
}