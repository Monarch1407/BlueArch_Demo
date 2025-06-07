import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2, 
  Maximize2, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Brain,
  Sparkles,
  Zap,
  FileText,
  Users,
  Calendar,
  BarChart3,
  Settings,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { useAuthStore } from '../../store/authStore';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'cyborg';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'warning' | 'success' | 'action';
  actions?: Array<{
    label: string;
    action: string;
    icon?: React.ReactNode;
  }>;
  metadata?: {
    confidence?: number;
    source?: string;
    relatedData?: any;
  };
}

interface AICapability {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'automation' | 'analysis' | 'assistance' | 'monitoring';
  status: 'active' | 'learning' | 'disabled';
}

const aiCapabilities: AICapability[] = [
  {
    id: 'attendance-analysis',
    name: 'Attendance Pattern Analysis',
    description: 'Detects unusual attendance patterns and suggests interventions',
    icon: <Users className="w-4 h-4" />,
    category: 'analysis',
    status: 'active'
  },
  {
    id: 'grade-prediction',
    name: 'Grade Prediction',
    description: 'Predicts student performance based on historical data',
    icon: <BarChart3 className="w-4 h-4" />,
    category: 'analysis',
    status: 'active'
  },
  {
    id: 'form-assistance',
    name: 'Smart Form Completion',
    description: 'Auto-fills forms and detects potential errors',
    icon: <FileText className="w-4 h-4" />,
    category: 'assistance',
    status: 'active'
  },
  {
    id: 'schedule-optimization',
    name: 'Schedule Optimization',
    description: 'Optimizes timetables and resolves conflicts automatically',
    icon: <Calendar className="w-4 h-4" />,
    category: 'automation',
    status: 'learning'
  },
  {
    id: 'anomaly-detection',
    name: 'Anomaly Detection',
    description: 'Monitors for suspicious activities and data inconsistencies',
    icon: <AlertTriangle className="w-4 h-4" />,
    category: 'monitoring',
    status: 'active'
  },
  {
    id: 'personalized-recommendations',
    name: 'Personalized Recommendations',
    description: 'Provides role-specific suggestions and insights',
    icon: <Lightbulb className="w-4 h-4" />,
    category: 'assistance',
    status: 'active'
  }
];

const quickActions = [
  { label: 'Mark Attendance', action: 'navigate:/attendance/mark', icon: <Users className="w-4 h-4" /> },
  { label: 'View Analytics', action: 'navigate:/analytics', icon: <BarChart3 className="w-4 h-4" /> },
  { label: 'Create Timetable', action: 'navigate:/timetable', icon: <Calendar className="w-4 h-4" /> },
  { label: 'Generate Report', action: 'generate:report', icon: <FileText className="w-4 h-4" /> },
  { label: 'System Health', action: 'check:system', icon: <Settings className="w-4 h-4" /> },
  { label: 'Help & Support', action: 'show:help', icon: <HelpCircle className="w-4 h-4" /> }
];

export const TIMACyborgAssistant: React.FC = () => {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showCapabilities, setShowCapabilities] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeConversation();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeConversation = () => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: `Hello ${user?.full_name}! I'm TIMA Cyborg, your AI assistant. I'm here to help you with BlueArch ERP. I can assist with attendance tracking, student management, analytics, and much more. How can I help you today?`,
      sender: 'cyborg',
      timestamp: new Date(),
      type: 'text',
      actions: quickActions.slice(0, 3),
      metadata: {
        confidence: 1.0,
        source: 'initialization'
      }
    };
    setMessages([welcomeMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const response = generateAIResponse(inputText);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (input: string): Message => {
    const lowerInput = input.toLowerCase();
    
    // Attendance-related queries
    if (lowerInput.includes('attendance')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "I can help you with attendance management! I've analyzed today's attendance data and found that Class 10-A has a 94.3% attendance rate. Would you like me to generate an attendance report or help you mark attendance for a specific class?",
        sender: 'cyborg',
        timestamp: new Date(),
        type: 'suggestion',
        actions: [
          { label: 'Mark Attendance', action: 'navigate:/attendance/mark', icon: <Users className="w-4 h-4" /> },
          { label: 'View Reports', action: 'navigate:/attendance/reports', icon: <BarChart3 className="w-4 h-4" /> },
          { label: 'Send Alerts', action: 'send:attendance-alerts', icon: <AlertTriangle className="w-4 h-4" /> }
        ],
        metadata: {
          confidence: 0.95,
          source: 'attendance_analysis',
          relatedData: { attendanceRate: 94.3, class: '10-A' }
        }
      };
    }

    // Student-related queries
    if (lowerInput.includes('student')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "I can assist with student management tasks. Currently, you have 1,247 active students across all classes. I've detected 3 students with declining performance who might need attention. Would you like me to show you the student analytics or help you add a new student?",
        sender: 'cyborg',
        timestamp: new Date(),
        type: 'warning',
        actions: [
          { label: 'View At-Risk Students', action: 'show:at-risk-students', icon: <AlertTriangle className="w-4 h-4" /> },
          { label: 'Add New Student', action: 'navigate:/students/add', icon: <Users className="w-4 h-4" /> },
          { label: 'Student Analytics', action: 'navigate:/analytics/students', icon: <BarChart3 className="w-4 h-4" /> }
        ],
        metadata: {
          confidence: 0.92,
          source: 'student_analysis',
          relatedData: { totalStudents: 1247, atRiskCount: 3 }
        }
      };
    }

    // Timetable-related queries
    if (lowerInput.includes('timetable') || lowerInput.includes('schedule')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "I can help optimize your timetables! I've detected 2 scheduling conflicts for next week and can automatically resolve them. I can also suggest optimal time slots based on teacher availability and student performance patterns.",
        sender: 'cyborg',
        timestamp: new Date(),
        type: 'suggestion',
        actions: [
          { label: 'Resolve Conflicts', action: 'resolve:timetable-conflicts', icon: <Zap className="w-4 h-4" /> },
          { label: 'Optimize Schedule', action: 'optimize:timetable', icon: <Calendar className="w-4 h-4" /> },
          { label: 'View Timetable', action: 'navigate:/timetable', icon: <Calendar className="w-4 h-4" /> }
        ],
        metadata: {
          confidence: 0.88,
          source: 'timetable_analysis',
          relatedData: { conflicts: 2, optimizationPotential: 'high' }
        }
      };
    }

    // Analytics and reports
    if (lowerInput.includes('report') || lowerInput.includes('analytics')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "I can generate comprehensive reports and analytics for you! Based on current data, I recommend focusing on attendance trends (showing 2.5% improvement) and academic performance analysis. Which type of report would you like me to create?",
        sender: 'cyborg',
        timestamp: new Date(),
        type: 'success',
        actions: [
          { label: 'Attendance Report', action: 'generate:attendance-report', icon: <FileText className="w-4 h-4" /> },
          { label: 'Performance Analytics', action: 'generate:performance-report', icon: <BarChart3 className="w-4 h-4" /> },
          { label: 'Custom Report', action: 'create:custom-report', icon: <Settings className="w-4 h-4" /> }
        ],
        metadata: {
          confidence: 0.96,
          source: 'analytics_engine',
          relatedData: { attendanceImprovement: 2.5 }
        }
      };
    }

    // Help and capabilities
    if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
      return {
        id: (Date.now() + 1).toString(),
        text: "I'm equipped with advanced AI capabilities to assist you with BlueArch ERP! I can analyze patterns, predict outcomes, automate tasks, and provide intelligent recommendations. Here are my key capabilities:",
        sender: 'cyborg',
        timestamp: new Date(),
        type: 'text',
        actions: [
          { label: 'View All Capabilities', action: 'show:capabilities', icon: <Brain className="w-4 h-4" /> },
          { label: 'Quick Tutorial', action: 'start:tutorial', icon: <HelpCircle className="w-4 h-4" /> },
          { label: 'Settings', action: 'show:ai-settings', icon: <Settings className="w-4 h-4" /> }
        ],
        metadata: {
          confidence: 1.0,
          source: 'help_system'
        }
      };
    }

    // Default response with smart suggestions
    const responses = [
      {
        text: "I'm here to help! I can assist with student management, attendance tracking, timetable optimization, report generation, and much more. What would you like to work on?",
        actions: quickActions.slice(0, 3)
      },
      {
        text: "Based on your recent activity, I notice you've been working with attendance data. Would you like me to analyze attendance patterns or help with any specific attendance-related tasks?",
        actions: [
          { label: 'Analyze Patterns', action: 'analyze:attendance-patterns', icon: <BarChart3 className="w-4 h-4" /> },
          { label: 'Mark Attendance', action: 'navigate:/attendance/mark', icon: <Users className="w-4 h-4" /> }
        ]
      },
      {
        text: "I can help you streamline your workflow! I've learned from your usage patterns and can suggest the most efficient ways to complete your tasks. What are you trying to accomplish?",
        actions: quickActions.slice(2, 5)
      }
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      id: (Date.now() + 1).toString(),
      text: randomResponse.text,
      sender: 'cyborg',
      timestamp: new Date(),
      type: 'text',
      actions: randomResponse.actions,
      metadata: {
        confidence: 0.85,
        source: 'general_assistance'
      }
    };
  };

  const handleActionClick = (action: string) => {
    if (action.startsWith('navigate:')) {
      const path = action.replace('navigate:', '');
      window.location.href = path;
    } else if (action.startsWith('show:')) {
      const showType = action.replace('show:', '');
      if (showType === 'capabilities') {
        setShowCapabilities(true);
      }
    } else {
      // Handle other actions
      const actionMessage: Message = {
        id: Date.now().toString(),
        text: `Executing: ${action}`,
        sender: 'cyborg',
        timestamp: new Date(),
        type: 'success'
      };
      setMessages(prev => [...prev, actionMessage]);
    }
  };

  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      // Implement speech recognition
      setTimeout(() => {
        setIsListening(false);
        setInputText("Voice input: Show me today's attendance");
      }, 3000);
    } else {
      setIsListening(false);
    }
  };

  const handleTextToSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 shadow-lg relative"
        >
          <img 
            src="/TIMA CYBORG.png" 
            alt="TIMA Cyborg" 
            className="w-10 h-10 rounded-full"
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse flex items-center justify-center">
            <Sparkles className="w-2 h-2 text-white" />
          </div>
        </Button>
        
        {/* Floating notification */}
        <div className="absolute -top-16 -left-32 bg-white rounded-lg shadow-lg p-3 max-w-xs opacity-90 hover:opacity-100 transition-opacity">
          <div className="flex items-center space-x-2">
            <Brain className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium">TIMA Cyborg</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            I've detected 3 items that need your attention. Click to see details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-96 transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[600px]'} shadow-2xl border-2 border-green-200`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg">
          <div className="flex items-center space-x-3">
            <img 
              src="/TIMA CYBORG.png" 
              alt="TIMA Cyborg" 
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <div>
              <h3 className="font-bold text-sm flex items-center space-x-1">
                <span>TIMA Cyborg</span>
                <Sparkles className="w-3 h-3" />
              </h3>
              <p className="text-xs opacity-90">AI Educational Assistant</p>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-xs">Active</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 p-1"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* AI Capabilities Panel */}
            {showCapabilities && (
              <div className="p-4 bg-blue-50 border-b">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-blue-900">AI Capabilities</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCapabilities(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {aiCapabilities.map((capability) => (
                    <div
                      key={capability.id}
                      className="p-2 bg-white rounded border text-xs"
                    >
                      <div className="flex items-center space-x-1 mb-1">
                        {capability.icon}
                        <span className="font-medium">{capability.name}</span>
                        <div className={`w-2 h-2 rounded-full ${
                          capability.status === 'active' ? 'bg-green-500' :
                          capability.status === 'learning' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <p className="text-gray-600">{capability.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <CardContent className="p-4 h-96 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : message.type === 'warning'
                        ? 'bg-yellow-50 border border-yellow-200 text-yellow-900'
                        : message.type === 'success'
                        ? 'bg-green-50 border border-green-200 text-green-900'
                        : message.type === 'suggestion'
                        ? 'bg-blue-50 border border-blue-200 text-blue-900'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    }`}
                  >
                    {message.sender === 'cyborg' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <img 
                          src="/TIMA CYBORG.png" 
                          alt="TIMA Cyborg" 
                          className="w-4 h-4 rounded-full"
                        />
                        <span className="text-xs font-medium">TIMA Cyborg</span>
                        {message.metadata?.confidence && (
                          <span className="text-xs opacity-70">
                            {Math.round(message.metadata.confidence * 100)}% confident
                          </span>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTextToSpeech(message.text)}
                          className="p-0 h-4 w-4"
                        >
                          {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                        </Button>
                      </div>
                    )}
                    <p>{message.text}</p>
                    
                    {message.actions && (
                      <div className="mt-3 space-y-1">
                        {message.actions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleActionClick(action.action)}
                            className="w-full justify-start text-xs"
                          >
                            {action.icon}
                            <span className="ml-1">{action.label}</span>
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <img 
                        src="/TIMA CYBORG.png" 
                        alt="TIMA Cyborg" 
                        className="w-4 h-4 rounded-full"
                      />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask TIMA Cyborg anything..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Button
                  onClick={handleVoiceInput}
                  size="sm"
                  variant={isListening ? 'primary' : 'outline'}
                  className={isListening ? 'animate-pulse' : ''}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-1 mt-2">
                {quickActions.slice(0, 4).map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleActionClick(action.action)}
                    className="text-xs px-2 py-1 h-6"
                  >
                    {action.icon}
                    <span className="ml-1">{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};