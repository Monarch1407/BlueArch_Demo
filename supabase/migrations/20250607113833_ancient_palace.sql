/*
  # Initial BlueArch ERP Database Schema

  1. New Tables
    - `institutions` - Educational institution details
    - `users` - All system users (admin, teacher, student, parent)
    - `students` - Student-specific information
    - `teachers` - Teacher-specific information
    - `parents` - Parent-specific information
    - `classes` - Class and section information
    - `subjects` - Subject definitions
    - `academic_years` - Academic year management
    - `time_slots` - Timetable time slots
    - `timetable_entries` - Timetable schedule entries
    - `attendance_records` - Daily attendance tracking
    - `examinations` - Exam definitions
    - `exam_results` - Student exam results
    - `assignments` - Homework and assignments
    - `assignment_submissions` - Student submissions
    - `fee_structures` - Fee definitions
    - `fee_payments` - Payment records
    - `announcements` - School announcements
    - `audit_logs` - System audit trail

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each role
    - Secure data access based on institution and role
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Institutions table
CREATE TABLE IF NOT EXISTS institutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text UNIQUE NOT NULL,
  logo_url text,
  address text,
  phone text,
  email text,
  website text,
  academic_year text NOT NULL DEFAULT '2024-25',
  timezone text DEFAULT 'Asia/Kolkata',
  currency text DEFAULT 'INR',
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Users table (unified for all roles)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  avatar_url text,
  role text NOT NULL CHECK (role IN ('admin', 'teacher', 'student', 'parent')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  last_login timestamptz,
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Academic Years
CREATE TABLE IF NOT EXISTS academic_years (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  year_code text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  is_current boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Classes
CREATE TABLE IF NOT EXISTS classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  academic_year_id uuid REFERENCES academic_years(id) ON DELETE CASCADE,
  name text NOT NULL,
  section text NOT NULL,
  capacity integer DEFAULT 40,
  class_teacher_id uuid REFERENCES users(id),
  room_number text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(institution_id, academic_year_id, name, section)
);

-- Subjects
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  name text NOT NULL,
  code text NOT NULL,
  description text,
  class_level text NOT NULL,
  is_core boolean DEFAULT true,
  credits integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  UNIQUE(institution_id, code, class_level)
);

-- Students
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  admission_number text UNIQUE NOT NULL,
  class_id uuid REFERENCES classes(id),
  roll_number text,
  date_of_birth date,
  gender text CHECK (gender IN ('male', 'female', 'other')),
  blood_group text,
  address text,
  emergency_contact text,
  medical_conditions text,
  transport_required boolean DEFAULT false,
  hostel_required boolean DEFAULT false,
  admission_date date DEFAULT CURRENT_DATE,
  graduation_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Teachers
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  employee_id text UNIQUE NOT NULL,
  qualification text,
  specialization text,
  experience_years integer DEFAULT 0,
  salary numeric(10,2),
  joining_date date DEFAULT CURRENT_DATE,
  is_class_teacher boolean DEFAULT false,
  subjects text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Parents
CREATE TABLE IF NOT EXISTS parents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  occupation text,
  annual_income numeric(12,2),
  created_at timestamptz DEFAULT now()
);

-- Student-Parent relationships
CREATE TABLE IF NOT EXISTS student_parents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES parents(id) ON DELETE CASCADE,
  relationship text NOT NULL CHECK (relationship IN ('father', 'mother', 'guardian')),
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, parent_id)
);

-- Time Slots for timetable
CREATE TABLE IF NOT EXISTS time_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  name text NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  duration_minutes integer NOT NULL,
  is_break boolean DEFAULT false,
  break_type text CHECK (break_type IN ('short', 'lunch', 'assembly')),
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Timetable entries
CREATE TABLE IF NOT EXISTS timetable_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  academic_year_id uuid REFERENCES academic_years(id) ON DELETE CASCADE,
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  subject_id uuid REFERENCES subjects(id),
  teacher_id uuid REFERENCES teachers(id),
  time_slot_id uuid REFERENCES time_slots(id) ON DELETE CASCADE,
  day_of_week integer NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
  room_number text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(institution_id, academic_year_id, class_id, time_slot_id, day_of_week)
);

-- Attendance records
CREATE TABLE IF NOT EXISTS attendance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  date date NOT NULL,
  status text NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
  check_in_time time,
  check_out_time time,
  method text DEFAULT 'manual' CHECK (method IN ('manual', 'biometric', 'rfid', 'facial_recognition')),
  marked_by uuid REFERENCES users(id),
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, date)
);

-- Examinations
CREATE TABLE IF NOT EXISTS examinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  academic_year_id uuid REFERENCES academic_years(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  exam_type text NOT NULL CHECK (exam_type IN ('unit_test', 'mid_term', 'final', 'assignment', 'project')),
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE,
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  total_marks integer NOT NULL DEFAULT 100,
  passing_marks integer NOT NULL DEFAULT 40,
  duration_minutes integer NOT NULL DEFAULT 180,
  exam_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  instructions text,
  auto_grading boolean DEFAULT false,
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'ongoing', 'completed', 'cancelled')),
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Exam results
CREATE TABLE IF NOT EXISTS exam_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  examination_id uuid REFERENCES examinations(id) ON DELETE CASCADE,
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  marks_obtained numeric(5,2) NOT NULL,
  grade text,
  percentage numeric(5,2),
  rank integer,
  status text DEFAULT 'graded' CHECK (status IN ('absent', 'graded', 'pending')),
  remarks text,
  graded_by uuid REFERENCES users(id),
  graded_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(examination_id, student_id)
);

-- Assignments
CREATE TABLE IF NOT EXISTS assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE,
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  teacher_id uuid REFERENCES teachers(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  instructions text,
  total_marks integer DEFAULT 10,
  due_date timestamptz NOT NULL,
  submission_type text DEFAULT 'file' CHECK (submission_type IN ('file', 'text', 'link')),
  auto_grading boolean DEFAULT false,
  status text DEFAULT 'active' CHECK (status IN ('draft', 'active', 'closed')),
  created_at timestamptz DEFAULT now()
);

-- Assignment submissions
CREATE TABLE IF NOT EXISTS assignment_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid REFERENCES assignments(id) ON DELETE CASCADE,
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  submission_text text,
  file_urls text[],
  submitted_at timestamptz DEFAULT now(),
  marks_obtained numeric(5,2),
  grade text,
  feedback text,
  status text DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted', 'graded', 'returned')),
  graded_by uuid REFERENCES users(id),
  graded_at timestamptz,
  UNIQUE(assignment_id, student_id)
);

-- Fee structures
CREATE TABLE IF NOT EXISTS fee_structures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  academic_year_id uuid REFERENCES academic_years(id) ON DELETE CASCADE,
  class_id uuid REFERENCES classes(id),
  fee_type text NOT NULL,
  amount numeric(10,2) NOT NULL,
  due_date date,
  is_mandatory boolean DEFAULT true,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Fee payments
CREATE TABLE IF NOT EXISTS fee_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  fee_structure_id uuid REFERENCES fee_structures(id) ON DELETE CASCADE,
  amount_paid numeric(10,2) NOT NULL,
  payment_date timestamptz DEFAULT now(),
  payment_method text DEFAULT 'razorpay' CHECK (payment_method IN ('razorpay', 'cash', 'cheque', 'bank_transfer')),
  transaction_id text,
  razorpay_payment_id text,
  razorpay_order_id text,
  status text DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  receipt_number text UNIQUE,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Announcements
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  target_audience text[] NOT NULL, -- ['all', 'students', 'teachers', 'parents', 'class:10-A']
  priority text DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  is_published boolean DEFAULT false,
  publish_date timestamptz,
  expiry_date timestamptz,
  attachments text[],
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Audit logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid REFERENCES institutions(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id),
  action text NOT NULL,
  table_name text,
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE timetable_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE examinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_institution_id ON users(institution_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_students_admission_number ON students(admission_number);
CREATE INDEX IF NOT EXISTS idx_students_class_id ON students(class_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student_date ON attendance_records(student_id, date);
CREATE INDEX IF NOT EXISTS idx_exam_results_examination_student ON exam_results(examination_id, student_id);
CREATE INDEX IF NOT EXISTS idx_fee_payments_student_id ON fee_payments(student_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- RLS Policies

-- Institutions: Users can only see their own institution
CREATE POLICY "Users can view own institution" ON institutions
  FOR SELECT USING (
    id IN (SELECT institution_id FROM users WHERE id = auth.uid())
  );

-- Users: Institution-based access
CREATE POLICY "Users can view users in same institution" ON users
  FOR SELECT USING (
    institution_id IN (SELECT institution_id FROM users WHERE id = auth.uid())
  );

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (id = auth.uid());

-- Students: Institution and role-based access
CREATE POLICY "Institution users can view students" ON students
  FOR SELECT USING (
    institution_id IN (SELECT institution_id FROM users WHERE id = auth.uid())
  );

-- Teachers: Institution-based access
CREATE POLICY "Institution users can view teachers" ON teachers
  FOR SELECT USING (
    institution_id IN (SELECT institution_id FROM users WHERE id = auth.uid())
  );

-- Attendance: Students can view own, teachers/admins can view all in institution
CREATE POLICY "Students can view own attendance" ON attendance_records
  FOR SELECT USING (
    student_id IN (SELECT id FROM students WHERE user_id = auth.uid())
    OR
    institution_id IN (
      SELECT institution_id FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'teacher')
    )
  );

-- Exam results: Students can view own, teachers/admins can view all
CREATE POLICY "Students can view own exam results" ON exam_results
  FOR SELECT USING (
    student_id IN (SELECT id FROM students WHERE user_id = auth.uid())
    OR
    examination_id IN (
      SELECT e.id FROM examinations e
      JOIN users u ON u.institution_id = e.institution_id
      WHERE u.id = auth.uid() AND u.role IN ('admin', 'teacher')
    )
  );

-- Fee payments: Students and parents can view own, admins can view all
CREATE POLICY "Students and parents can view own fee payments" ON fee_payments
  FOR SELECT USING (
    student_id IN (
      SELECT s.id FROM students s
      LEFT JOIN student_parents sp ON sp.student_id = s.id
      LEFT JOIN parents p ON p.id = sp.parent_id
      WHERE s.user_id = auth.uid() OR p.user_id = auth.uid()
    )
    OR
    institution_id IN (
      SELECT institution_id FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Audit logs: Only admins can view
CREATE POLICY "Only admins can view audit logs" ON audit_logs
  FOR SELECT USING (
    institution_id IN (
      SELECT institution_id FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Functions for audit logging
CREATE OR REPLACE FUNCTION log_audit_event()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (
    institution_id,
    user_id,
    action,
    table_name,
    record_id,
    old_values,
    new_values
  ) VALUES (
    COALESCE(NEW.institution_id, OLD.institution_id),
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create audit triggers for important tables
CREATE TRIGGER audit_users AFTER INSERT OR UPDATE OR DELETE ON users
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_students AFTER INSERT OR UPDATE OR DELETE ON students
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_teachers AFTER INSERT OR UPDATE OR DELETE ON teachers
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_fee_payments AFTER INSERT OR UPDATE OR DELETE ON fee_payments
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();

CREATE TRIGGER audit_exam_results AFTER INSERT OR UPDATE OR DELETE ON exam_results
  FOR EACH ROW EXECUTE FUNCTION log_audit_event();