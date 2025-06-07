import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuthStore } from '../../store/authStore';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock user data - in real app, this would come from your auth API
      const mockUser = {
        id: '1',
        full_name: 'Akash Kevin',
        email: email,
        role: 'admin' as const,
        status: 'active' as const,
        created_at: new Date().toISOString(),
      };
      
      login(mockUser);
      navigate('/dashboard');
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 p-2">
            <img 
              src="/Bluearch logo.png" 
              alt="BlueArch Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">BlueArch</h1>
          <p className="text-blue-100">Educational Management System</p>
          <div className="flex items-center justify-center mt-2 space-x-2">
            <span className="text-sm text-blue-200">by</span>
            <img 
              src="/LogoPNG.png" 
              alt="TIMA Logo" 
              className="h-4 w-4 object-contain"
            />
            <span className="text-sm text-blue-200 font-medium">TIMA Integrated Technologies</span>
          </div>
        </div>
        
        {/* Login form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              placeholder="Enter your email"
              required
            />
            
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-4 h-4" />}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Forgot password?</a>
            </div>
            
            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
            >
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Contact your administrator</a>
            </p>
          </div>
        </div>
        
        {/* Demo credentials */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white text-sm">
          <p className="font-medium mb-2">Demo Credentials:</p>
          <p>Email: admin@school.edu</p>
          <p>Password: demo123</p>
        </div>
        
        {/* TIMA Cyborg Assistant Preview */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
          <div className="flex items-center space-x-3">
            <img 
              src="/TIMA CYBORG.png" 
              alt="TIMA Cyborg" 
              className="w-10 h-10 rounded-full bg-white p-1"
            />
            <div>
              <p className="text-sm font-medium">TIMA Cyborg AI Assistant</p>
              <p className="text-xs text-blue-200">Ready to help you navigate BlueArch</p>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};