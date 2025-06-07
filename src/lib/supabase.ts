import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const auth = {
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },
  
  signUp: async (email: string, password: string, metadata?: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    return { data, error };
  },
  
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },
  
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Database helpers with proper typing
export const db = {
  // Institutions
  getInstitution: async (id: string) => {
    const { data, error } = await supabase
      .from('institutions')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  // Users
  getUser: async (id: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  getUserByEmail: async (email: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    return { data, error };
  },

  // Students
  getStudents: async (institutionId: string, classId?: string) => {
    let query = supabase
      .from('students')
      .select(`
        *,
        user:users(*),
        class:classes(*)
      `)
      .eq('institution_id', institutionId);
    
    if (classId) {
      query = query.eq('class_id', classId);
    }
    
    const { data, error } = await query;
    return { data, error };
  },

  getStudent: async (id: string) => {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        user:users(*),
        class:classes(*),
        parents:student_parents(
          relationship,
          parent:parents(
            *,
            user:users(*)
          )
        )
      `)
      .eq('id', id)
      .single();
    return { data, error };
  },

  createStudent: async (studentData: any) => {
    const { data, error } = await supabase
      .from('students')
      .insert(studentData)
      .select()
      .single();
    return { data, error };
  },

  updateStudent: async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  // Teachers
  getTeachers: async (institutionId: string) => {
    const { data, error } = await supabase
      .from('teachers')
      .select(`
        *,
        user:users(*)
      `)
      .eq('institution_id', institutionId);
    return { data, error };
  },

  getTeacher: async (id: string) => {
    const { data, error } = await supabase
      .from('teachers')
      .select(`
        *,
        user:users(*)
      `)
      .eq('id', id)
      .single();
    return { data, error };
  },

  // Classes
  getClasses: async (institutionId: string, academicYearId?: string) => {
    let query = supabase
      .from('classes')
      .select(`
        *,
        class_teacher:users(*),
        academic_year:academic_years(*)
      `)
      .eq('institution_id', institutionId);
    
    if (academicYearId) {
      query = query.eq('academic_year_id', academicYearId);
    }
    
    const { data, error } = await query;
    return { data, error };
  },

  // Subjects
  getSubjects: async (institutionId: string, classLevel?: string) => {
    let query = supabase
      .from('subjects')
      .select('*')
      .eq('institution_id', institutionId);
    
    if (classLevel) {
      query = query.eq('class_level', classLevel);
    }
    
    const { data, error } = await query;
    return { data, error };
  },

  // Attendance
  getAttendance: async (studentId: string, dateRange?: { start: string; end: string }) => {
    let query = supabase
      .from('attendance_records')
      .select(`
        *,
        student:students(
          *,
          user:users(*)
        ),
        marked_by_user:users(*)
      `)
      .eq('student_id', studentId);
    
    if (dateRange) {
      query = query
        .gte('date', dateRange.start)
        .lte('date', dateRange.end);
    }
    
    const { data, error } = await query;
    return { data, error };
  },

  markAttendance: async (attendanceData: any) => {
    const { data, error } = await supabase
      .from('attendance_records')
      .upsert(attendanceData, {
        onConflict: 'student_id,date'
      })
      .select();
    return { data, error };
  },

  // Examinations
  getExaminations: async (institutionId: string, classId?: string) => {
    let query = supabase
      .from('examinations')
      .select(`
        *,
        subject:subjects(*),
        class:classes(*),
        created_by_user:users(*)
      `)
      .eq('institution_id', institutionId);
    
    if (classId) {
      query = query.eq('class_id', classId);
    }
    
    const { data, error } = await query;
    return { data, error };
  },

  getExamResults: async (examinationId: string, studentId?: string) => {
    let query = supabase
      .from('exam_results')
      .select(`
        *,
        student:students(
          *,
          user:users(*)
        ),
        examination:examinations(*)
      `)
      .eq('examination_id', examinationId);
    
    if (studentId) {
      query = query.eq('student_id', studentId);
    }
    
    const { data, error } = await query;
    return { data, error };
  },

  // Assignments
  getAssignments: async (classId: string, subjectId?: string) => {
    let query = supabase
      .from('assignments')
      .select(`
        *,
        subject:subjects(*),
        class:classes(*),
        teacher:teachers(
          *,
          user:users(*)
        )
      `)
      .eq('class_id', classId);
    
    if (subjectId) {
      query = query.eq('subject_id', subjectId);
    }
    
    const { data, error } = await query;
    return { data, error };
  },

  // Fee Management
  getFeeStructures: async (institutionId: string, classId?: string) => {
    let query = supabase
      .from('fee_structures')
      .select(`
        *,
        class:classes(*),
        academic_year:academic_years(*)
      `)
      .eq('institution_id', institutionId);
    
    if (classId) {
      query = query.eq('class_id', classId);
    }
    
    const { data, error } = await query;
    return { data, error };
  },

  getFeePayments: async (studentId: string) => {
    const { data, error } = await supabase
      .from('fee_payments')
      .select(`
        *,
        student:students(
          *,
          user:users(*)
        ),
        fee_structure:fee_structures(*)
      `)
      .eq('student_id', studentId);
    return { data, error };
  },

  createFeePayment: async (paymentData: any) => {
    const { data, error } = await supabase
      .from('fee_payments')
      .insert(paymentData)
      .select()
      .single();
    return { data, error };
  },

  // Timetable
  getTimetable: async (classId: string, academicYearId: string) => {
    const { data, error } = await supabase
      .from('timetable_entries')
      .select(`
        *,
        subject:subjects(*),
        teacher:teachers(
          *,
          user:users(*)
        ),
        time_slot:time_slots(*)
      `)
      .eq('class_id', classId)
      .eq('academic_year_id', academicYearId)
      .eq('is_active', true);
    return { data, error };
  },

  // Announcements
  getAnnouncements: async (institutionId: string, targetAudience?: string[]) => {
    let query = supabase
      .from('announcements')
      .select(`
        *,
        created_by_user:users(*)
      `)
      .eq('institution_id', institutionId)
      .eq('is_published', true);
    
    if (targetAudience) {
      query = query.overlaps('target_audience', targetAudience);
    }
    
    const { data, error } = await query;
    return { data, error };
  },

  // Audit Logs
  getAuditLogs: async (institutionId: string, filters?: any) => {
    let query = supabase
      .from('audit_logs')
      .select(`
        *,
        user:users(*)
      `)
      .eq('institution_id', institutionId)
      .order('created_at', { ascending: false });
    
    if (filters?.userId) {
      query = query.eq('user_id', filters.userId);
    }
    
    if (filters?.action) {
      query = query.eq('action', filters.action);
    }
    
    if (filters?.dateRange) {
      query = query
        .gte('created_at', filters.dateRange.start)
        .lte('created_at', filters.dateRange.end);
    }
    
    const { data, error } = await query;
    return { data, error };
  }
};

// Real-time subscriptions
export const subscriptions = {
  subscribeToAttendance: (classId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('attendance_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'attendance_records',
        filter: `class_id=eq.${classId}`
      }, callback)
      .subscribe();
  },

  subscribeToAnnouncements: (institutionId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('announcement_changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'announcements',
        filter: `institution_id=eq.${institutionId}`
      }, callback)
      .subscribe();
  }
};

export default supabase;