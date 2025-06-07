import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, School, Upload, Database, Sparkles, Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

const steps = [
  { id: 1, name: 'Institution Setup', icon: School },
  { id: 2, name: 'Data Import', icon: Upload },
  { id: 3, name: 'System Configuration', icon: Database },
  { id: 4, name: 'AI Enhancement', icon: Sparkles },
];

const StepIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => (
  <div className="flex items-center justify-center mb-8">
    {steps.map((step, index) => {
      const Icon = step.icon;
      const isCompleted = currentStep > step.id;
      const isCurrent = currentStep === step.id;
      
      return (
        <React.Fragment key={step.id}>
          <div className="flex items-center">
            <div className={`
              flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors
              ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                isCurrent ? 'bg-blue-500 border-blue-500 text-white' : 
                'bg-white border-gray-300 text-gray-400'}
            `}>
              {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
            </div>
            <div className="ml-3 text-left">
              <p className={`text-sm font-medium ${isCurrent || isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                Step {step.id}
              </p>
              <p className={`text-xs ${isCurrent || isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>
                {step.name}
              </p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <ChevronRight className="w-5 h-5 text-gray-400 mx-4" />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

export const OnboardingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [institutionData, setInstitutionData] = useState({
    name: '',
    type: 'school',
    academicYear: '2024-25',
    contactEmail: '',
    principal: '',
    address: '',
  });
  const navigate = useNavigate();
  
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      navigate('/dashboard');
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Institution Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Institution Name"
                  value={institutionData.name}
                  onChange={(e) => setInstitutionData({...institutionData, name: e.target.value})}
                  placeholder="Enter your school/college name"
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution Type</label>
                  <select
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={institutionData.type}
                    onChange={(e) => setInstitutionData({...institutionData, type: e.target.value})}
                  >
                    <option value="school">School</option>
                    <option value="college">College</option>
                    <option value="university">University</option>
                    <option value="institute">Training Institute</option>
                  </select>
                </div>
                
                <Input
                  label="Academic Year"
                  value={institutionData.academicYear}
                  onChange={(e) => setInstitutionData({...institutionData, academicYear: e.target.value})}
                  placeholder="2024-25"
                />
                
                <Input
                  label="Contact Email"
                  type="email"
                  value={institutionData.contactEmail}
                  onChange={(e) => setInstitutionData({...institutionData, contactEmail: e.target.value})}
                  placeholder="admin@school.edu"
                />
                
                <Input
                  label="Principal/Head Name"
                  value={institutionData.principal}
                  onChange={(e) => setInstitutionData({...institutionData, principal: e.target.value})}
                  placeholder="Dr. John Smith"
                />
                
                <Input
                  label="Address"
                  value={institutionData.address}
                  onChange={(e) => setInstitutionData({...institutionData, address: e.target.value})}
                  placeholder="Full address"
                />
              </div>
            </CardContent>
          </Card>
        );
        
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Import Your Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Import Options */}
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Student Data</h3>
                    <p className="text-gray-600 mb-4">Import student information via CSV file</p>
                    <Button variant="outline">Choose File</Button>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <Database className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Connect Database</h3>
                    <p className="text-gray-600 mb-4">Import from existing school management system</p>
                    <Button variant="outline">Connect</Button>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <School className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Manual Entry</h3>
                    <p className="text-gray-600 mb-4">Start fresh and add data manually</p>
                    <Button variant="outline">Start Fresh</Button>
                  </div>
                </div>
                
                {/* Progress and Instructions */}
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-medium text-blue-900 mb-3">Import Guidelines</h4>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li>• CSV files should include headers: Name, Email, Class, Section</li>
                      <li>• Maximum file size: 10MB</li>
                      <li>• Supported formats: CSV, Excel (.xlsx)</li>
                      <li>• Sample template available for download</li>
                    </ul>
                    <Button variant="outline" size="sm" className="mt-4">
                      Download Template
                    </Button>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-medium text-green-900 mb-3">Data Security</h4>
                    <p className="text-sm text-green-800">
                      Your data is encrypted and stored securely. BlueArch complies with educational data privacy standards.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Academic Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Grading System</label>
                        <select className="w-full rounded-lg border border-gray-300 px-3 py-2">
                          <option>Percentage (0-100%)</option>
                          <option>Letter Grades (A-F)</option>
                          <option>Points (1-10)</option>
                          <option>Custom Scale</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Academic Terms</label>
                        <select className="w-full rounded-lg border border-gray-300 px-3 py-2">
                          <option>Semester System</option>
                          <option>Trimester System</option>
                          <option>Quarter System</option>
                          <option>Annual System</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Attendance Tracking</label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                            <span className="ml-2 text-sm">Daily Attendance</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span className="ml-2 text-sm">Period-wise Attendance</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span className="ml-2 text-sm">Biometric Integration</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Communication Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notification Preferences</label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                            <span className="ml-2 text-sm">Email Notifications</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                            <span className="ml-2 text-sm">SMS Alerts</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span className="ml-2 text-sm">WhatsApp Integration</span>
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Parent Portal Access</label>
                        <select className="w-full rounded-lg border border-gray-300 px-3 py-2">
                          <option>Full Access</option>
                          <option>View Only</option>
                          <option>Limited Access</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-6">
                    <h4 className="font-medium text-purple-900 mb-3">Payment Gateway</h4>
                    <p className="text-sm text-purple-800 mb-4">
                      Razorpay integration for secure fee collection
                    </p>
                    <Button variant="outline" size="sm">
                      Configure Razorpay
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>TIMA Cyborg AI Enhancement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mb-4">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Your AI Assistant is Ready!</h3>
                <p className="text-gray-600">TIMA Cyborg will help automate tasks and provide intelligent insights</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-3">Smart Features Enabled</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-600" />
                      Automated attendance analysis
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-600" />
                      Smart grade predictions
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-600" />
                      Behavioral pattern detection
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-600" />
                      Personalized recommendations
                    </li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-green-900 mb-3">AI Assistance Available</h4>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-600" />
                      24/7 query support
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-600" />
                      Form auto-completion
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-600" />
                      Report generation
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-green-600" />
                      Data validation
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white text-center">
                <h4 className="text-xl font-bold mb-2">Setup Complete!</h4>
                <p className="mb-4">Your BlueArch ERP system is ready to transform your educational institution</p>
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Launch Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to BlueArch</h1>
          <p className="text-gray-600">Let's set up your educational management system</p>
        </div>
        
        <StepIndicator currentStep={currentStep} />
        
        <div className="mb-8">
          {renderStepContent()}
        </div>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          <Button onClick={handleNext}>
            {currentStep === steps.length ? 'Complete Setup' : 'Next Step'}
          </Button>
        </div>
      </div>
    </div>
  );
};