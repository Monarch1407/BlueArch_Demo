import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Star, Users, BookOpen, TrendingUp, Shield, Zap, Globe, Phone, Mail, MapPin, Menu, X, Play, Award, Clock, Brain } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Student Information System",
      description: "Comprehensive student management with enrollment, profiles, and academic tracking."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-green-600" />,
      title: "Curriculum Management",
      description: "Design and manage curriculum standards with learning outcomes and assessments."
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-600" />,
      title: "Smart Timetabling",
      description: "AI-powered timetable generation with conflict resolution and optimization."
    },
    {
      icon: <Brain className="w-8 h-8 text-teal-600" />,
      title: "Auto-Grading System",
      description: "TIMA Cyborg AI automatically grades exams and provides detailed analytics."
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Biometric Attendance",
      description: "Secure attendance tracking with fingerprint, facial recognition, and RFID."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Analytics Dashboard",
      description: "Real-time insights and reports for data-driven decision making."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Rajesh Gupta",
      role: "Principal, Delhi Public School",
      content: "BlueArch has transformed our school management. The AI features are incredible!",
      rating: 5,
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Mrs. Priya Sharma",
      role: "Academic Director, St. Mary's College",
      content: "The auto-grading system saves us hours of work. TIMA Cyborg is amazing!",
      rating: 5,
      image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Mr. Amit Patel",
      role: "IT Head, Modern Academy",
      content: "Best educational ERP we've used. The biometric integration is seamless.",
      rating: 5,
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  const stats = [
    { number: "2000+", label: "Educational Institutions" },
    { number: "500K+", label: "Students Managed" },
    { number: "50K+", label: "Teachers Empowered" },
    { number: "99.9%", label: "Uptime Guarantee" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/Bluearch logo.png" 
                alt="BlueArch Logo" 
                className="h-8 w-8 object-contain"
              />
              <span className="text-xl font-bold text-gray-900">BlueArch</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#solutions" className="text-gray-600 hover:text-blue-600 transition-colors">Solutions</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Testimonials</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
              <Button variant="outline" size="sm">
                Login
              </Button>
              <Button size="sm">
                Get Started
              </Button>
            </div>
            
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              <a href="#features" className="block text-gray-600 hover:text-blue-600">Features</a>
              <a href="#solutions" className="block text-gray-600 hover:text-blue-600">Solutions</a>
              <a href="#pricing" className="block text-gray-600 hover:text-blue-600">Pricing</a>
              <a href="#testimonials" className="block text-gray-600 hover:text-blue-600">Testimonials</a>
              <a href="#contact" className="block text-gray-600 hover:text-blue-600">Contact</a>
              <div className="flex space-x-3 pt-4">
                <Button variant="outline" size="sm" className="flex-1">Login</Button>
                <Button size="sm" className="flex-1">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <img 
                  src="/LogoPNG.png" 
                  alt="TIMA Logo" 
                  className="h-6 w-6 object-contain"
                />
                <span className="text-sm font-medium text-gray-600">Powered by TIMA Integrated Technologies</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Transform Education with{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI-Powered ERP
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                BlueArch is the complete educational management system with TIMA Cyborg AI assistant, 
                biometric integration, and smart automation for modern institutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="flex items-center">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Free 30-day trial
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  No setup fees
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  24/7 support
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <img 
                  src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" 
                  alt="BlueArch Dashboard" 
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src="/TIMA CYBORG.png" 
                    alt="TIMA Cyborg" 
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">TIMA Cyborg AI Assistant</h3>
                    <p className="text-sm text-gray-600">Ready to help with your educational management</p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    "I can help you manage students, create timetables, grade exams automatically, 
                    and provide insights on institutional performance."
                  </p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg">
                <Brain className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white p-3 rounded-full shadow-lg">
                <Shield className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Educational Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to run a modern educational institution, powered by AI and designed for efficiency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TIMA Cyborg Section */}
      <section className="py-20 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/TIMA CYBORG.png" 
                  alt="TIMA Cyborg" 
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Meet TIMA Cyborg</h3>
                  <p className="text-teal-600 font-medium">Your AI Educational Assistant</p>
                </div>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                AI That Understands Education
              </h2>
              
              <p className="text-xl text-gray-600 mb-8">
                TIMA Cyborg is not just another chatbot. It's an advanced AI assistant specifically 
                designed for educational institutions, capable of automating complex tasks and 
                providing intelligent insights.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Automatic Grading</h4>
                    <p className="text-gray-600">Grade essays, MCQs, and numerical problems with 94.5% accuracy</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Smart Scheduling</h4>
                    <p className="text-gray-600">Optimize timetables and resolve conflicts automatically</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Predictive Analytics</h4>
                    <p className="text-gray-600">Identify at-risk students and recommend interventions</p>
                  </div>
                </div>
              </div>
              
              <Button size="lg">
                Experience TIMA Cyborg
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <img 
                      src="/TIMA CYBORG.png" 
                      alt="TIMA Cyborg" 
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="bg-gray-100 rounded-lg p-3 flex-1">
                      <p className="text-sm">I've analyzed the attendance data and found that Class 10-A has a 94.3% attendance rate this month. Would you like me to generate a detailed report?</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 justify-end">
                    <div className="bg-blue-500 text-white rounded-lg p-3">
                      <p className="text-sm">Yes, please create the report and send it to the principal.</p>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <img 
                      src="/TIMA CYBORG.png" 
                      alt="TIMA Cyborg" 
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="bg-gray-100 rounded-lg p-3 flex-1">
                      <p className="text-sm">Report generated and sent! I've also scheduled automatic weekly attendance reports. Is there anything else you'd like me to help with?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Educational Leaders
            </h2>
            <p className="text-xl text-gray-600">
              See what educators are saying about BlueArch
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of educational institutions already using BlueArch to streamline 
            operations and improve student outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/Bluearch logo.png" 
                  alt="BlueArch Logo" 
                  className="h-8 w-8 object-contain"
                />
                <span className="text-xl font-bold">BlueArch</span>
              </div>
              <p className="text-gray-400 mb-6">
                Complete ERP solution for educational institutions, powered by TIMA Integrated Technologies.
              </p>
              <div className="flex items-center space-x-2">
                <img 
                  src="/LogoPNG.png" 
                  alt="TIMA Logo" 
                  className="h-6 w-6 object-contain"
                />
                <span className="text-sm text-gray-400">TIMA Integrated Technologies</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4" />
                  <span>+91 1234567890</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4" />
                  <span>hello@bluearch.tima.tech</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4" />
                  <span>Bangalore, India</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 TIMA Integrated Technologies Private Limited. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;