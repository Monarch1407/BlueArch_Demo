import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useAppStore } from './store/appStore';
import { LoginPage } from './pages/auth/LoginPage';
import { OnboardingPage } from './pages/onboarding/OnboardingPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { StudentsPage } from './pages/students/StudentsPage';
import { StudentDetailPage } from './pages/students/StudentDetailPage';
import { TeachersPage } from './pages/teachers/TeachersPage';
import { AdmissionsPage } from './pages/admissions/AdmissionsPage';
import { TimetablePage } from './pages/timetable/TimetablePage';
import { CurriculumPage } from './pages/curriculum/CurriculumPage';
import { AttendancePage } from './pages/attendance/AttendancePage';
import { AttendanceMarkingPage } from './pages/attendance/AttendanceMarkingPage';
import { ExaminationsPage } from './pages/examinations/ExaminationsPage';
import { FeesPage } from './pages/fees/FeesPage';
import { WireframePage } from './pages/wireframes/WireframePage';
import { SitemapPage } from './pages/sitemap/SitemapPage';
import LandingPage from './pages/landing/LandingPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route Component (redirects to dashboard if already authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

function App() {
  const { theme } = useAppStore();
  
  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  return (
    <Router>
      <div className={theme}>
        <Routes>
          {/* Landing Page */}
          <Route path="/landing" element={<LandingPage />} />
          
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/onboarding" 
            element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/students" 
            element={
              <ProtectedRoute>
                <StudentsPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/students/:id" 
            element={
              <ProtectedRoute>
                <StudentDetailPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/teachers" 
            element={
              <ProtectedRoute>
                <TeachersPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admissions" 
            element={
              <ProtectedRoute>
                <AdmissionsPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/timetable" 
            element={
              <ProtectedRoute>
                <TimetablePage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/curriculum" 
            element={
              <ProtectedRoute>
                <CurriculumPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/attendance" 
            element={
              <ProtectedRoute>
                <AttendancePage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/attendance/mark" 
            element={
              <ProtectedRoute>
                <AttendanceMarkingPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/examinations" 
            element={
              <ProtectedRoute>
                <ExaminationsPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/fees" 
            element={
              <ProtectedRoute>
                <FeesPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/wireframes" 
            element={
              <ProtectedRoute>
                <WireframePage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/sitemap" 
            element={
              <ProtectedRoute>
                <SitemapPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Additional protected routes */}
          <Route 
            path="/academics" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Academic Management</h1>
                    <p className="text-gray-600">Coming soon...</p>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/transport" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Transport Management</h1>
                    <p className="text-gray-600">Coming soon...</p>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/hostel" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Hostel Management</h1>
                    <p className="text-gray-600">Coming soon...</p>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
                    <p className="text-gray-600">Coming soon...</p>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/wallet" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">TIMA Wallet</h1>
                    <p className="text-gray-600">Coming soon...</p>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/messages" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Messages</h1>
                    <p className="text-gray-600">Coming soon...</p>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
                    <p className="text-gray-600">Coming soon...</p>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/landing\" replace />} />
          
          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/dashboard\" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;