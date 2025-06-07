import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  CreditCard, 
  Download, 
  Upload, 
  Search, 
  Filter, 
  DollarSign, 
  Calendar, 
  Users, 
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Receipt,
  Send,
  Eye,
  Edit
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';

interface FeeStructure {
  id: string;
  fee_type: string;
  amount: number;
  due_date: string;
  is_mandatory: boolean;
  description: string;
  class_id?: string;
  class_name?: string;
  academic_year: string;
}

interface FeePayment {
  id: string;
  student_id: string;
  student_name: string;
  student_admission_no: string;
  class_name: string;
  fee_structure_id: string;
  fee_type: string;
  amount_due: number;
  amount_paid: number;
  payment_date?: string;
  payment_method: 'razorpay' | 'cash' | 'cheque' | 'bank_transfer';
  transaction_id?: string;
  razorpay_payment_id?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'overdue';
  receipt_number?: string;
  due_date: string;
}

interface FeeStats {
  total_amount: number;
  collected_amount: number;
  pending_amount: number;
  overdue_amount: number;
  collection_rate: number;
  total_students: number;
  paid_students: number;
  pending_students: number;
  overdue_students: number;
}

const mockFeeStructures: FeeStructure[] = [
  {
    id: '1',
    fee_type: 'Tuition Fee',
    amount: 15000,
    due_date: '2024-12-15',
    is_mandatory: true,
    description: 'Monthly tuition fee for academic year 2024-25',
    class_name: 'All Classes',
    academic_year: '2024-25'
  },
  {
    id: '2',
    fee_type: 'Transport Fee',
    amount: 3000,
    due_date: '2024-12-10',
    is_mandatory: false,
    description: 'Monthly transport fee for school bus service',
    class_name: 'All Classes',
    academic_year: '2024-25'
  },
  {
    id: '3',
    fee_type: 'Lab Fee',
    amount: 2000,
    due_date: '2024-12-20',
    is_mandatory: true,
    description: 'Laboratory fee for science practicals',
    class_name: 'Class 11-12',
    academic_year: '2024-25'
  }
];

const mockFeePayments: FeePayment[] = [
  {
    id: '1',
    student_id: 'STU001',
    student_name: 'Arjun Sharma',
    student_admission_no: 'STU001',
    class_name: '10-A',
    fee_structure_id: '1',
    fee_type: 'Tuition Fee',
    amount_due: 15000,
    amount_paid: 15000,
    payment_date: '2024-12-05',
    payment_method: 'razorpay',
    transaction_id: 'TXN123456789',
    razorpay_payment_id: 'pay_123456789',
    status: 'completed',
    receipt_number: 'RCP001',
    due_date: '2024-12-15'
  },
  {
    id: '2',
    student_id: 'STU002',
    student_name: 'Priya Patel',
    student_admission_no: 'STU002',
    class_name: '10-A',
    fee_structure_id: '1',
    fee_type: 'Tuition Fee',
    amount_due: 15000,
    amount_paid: 0,
    payment_method: 'razorpay',
    status: 'pending',
    due_date: '2024-12-15'
  },
  {
    id: '3',
    student_id: 'STU003',
    student_name: 'Rahul Kumar',
    student_admission_no: 'STU003',
    class_name: '9-B',
    fee_structure_id: '2',
    fee_type: 'Transport Fee',
    amount_due: 3000,
    amount_paid: 0,
    payment_method: 'razorpay',
    status: 'overdue',
    due_date: '2024-12-01'
  }
];

const FeeStatsCard: React.FC<{ stats: FeeStats }> = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Amount</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ₹{stats.total_amount.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">Due this month</p>
          </div>
          <DollarSign className="w-8 h-8 text-blue-500" />
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Collected</p>
            <p className="text-2xl font-bold text-green-600">
              ₹{stats.collected_amount.toLocaleString()}
            </p>
            <p className="text-xs text-green-500">{stats.collection_rate}% collected</p>
          </div>
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              ₹{stats.pending_amount.toLocaleString()}
            </p>
            <p className="text-xs text-yellow-600">{stats.pending_students} students</p>
          </div>
          <Clock className="w-8 h-8 text-yellow-500" />
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue</p>
            <p className="text-2xl font-bold text-red-600">
              ₹{stats.overdue_amount.toLocaleString()}
            </p>
            <p className="text-xs text-red-600">{stats.overdue_students} students</p>
          </div>
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
      </CardContent>
    </Card>
  </div>
);

const FeePaymentCard: React.FC<{
  payment: FeePayment;
  onPayNow: (payment: FeePayment) => void;
  onSendReminder: (payment: FeePayment) => void;
  onViewReceipt: (payment: FeePayment) => void;
}> = ({ payment, onPayNow, onSendReminder, onViewReceipt }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const isOverdue = new Date(payment.due_date) < new Date() && payment.status === 'pending';

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
              {payment.student_name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{payment.student_name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {payment.student_admission_no} • {payment.class_name}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(payment.status)}`}>
              {getStatusIcon(payment.status)}
              <span>{payment.status}</span>
            </span>
            {isOverdue && (
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                Overdue
              </span>
            )}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Fee Type</span>
            <span className="font-medium">{payment.fee_type}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Amount Due</span>
            <span className="font-bold text-lg">₹{payment.amount_due.toLocaleString()}</span>
          </div>
          
          {payment.amount_paid > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Amount Paid</span>
              <span className="font-medium text-green-600">₹{payment.amount_paid.toLocaleString()}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Due Date</span>
            <span className={`font-medium ${isOverdue ? 'text-red-600' : 'text-gray-900'}`}>
              {new Date(payment.due_date).toLocaleDateString()}
            </span>
          </div>
          
          {payment.payment_date && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Payment Date</span>
              <span className="font-medium text-green-600">
                {new Date(payment.payment_date).toLocaleDateString()}
              </span>
            </div>
          )}
          
          {payment.payment_method && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Payment Method</span>
              <div className="flex items-center space-x-1">
                <CreditCard className="w-4 h-4" />
                <span className="font-medium capitalize">{payment.payment_method}</span>
              </div>
            </div>
          )}
          
          {payment.receipt_number && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Receipt No.</span>
              <span className="font-medium">{payment.receipt_number}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            {payment.status === 'completed' && (
              <Button variant="outline\" size="sm\" onClick={() => onViewReceipt(payment)}>
                <Receipt className="w-4 h-4 mr-1" />
                Receipt
              </Button>
            )}
            {(payment.status === 'pending' || payment.status === 'overdue') && (
              <Button variant="outline" size="sm" onClick={() => onSendReminder(payment)}>
                <Send className="w-4 h-4 mr-1" />
                Remind
              </Button>
            )}
          </div>
          
          {(payment.status === 'pending' || payment.status === 'overdue') && (
            <Button onClick={() => onPayNow(payment)} className="bg-gradient-to-r from-green-500 to-teal-500">
              <CreditCard className="w-4 h-4 mr-1" />
              Pay Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const RazorpayIntegrationPanel: React.FC = () => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <CreditCard className="w-5 h-5" />
        <span>Razorpay Payment Gateway</span>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-2"></div>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <CreditCard className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Payment Gateway</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">Status: Active</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Today's Transactions:</span>
              <span className="font-medium">₹2,45,000</span>
            </div>
            <div className="flex justify-between">
              <span>Success Rate:</span>
              <span className="font-medium text-green-600">98.7%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-900 dark:text-green-100">Auto Settlement</h3>
              <p className="text-sm text-green-700 dark:text-green-300">T+1 Settlement</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Pending Settlement:</span>
              <span className="font-medium">₹1,85,000</span>
            </div>
            <div className="flex justify-between">
              <span>Next Settlement:</span>
              <span className="font-medium text-green-600">Tomorrow</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">Analytics</h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">Real-time Insights</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>This Month:</span>
              <span className="font-medium">₹45,67,000</span>
            </div>
            <div className="flex justify-between">
              <span>Growth:</span>
              <span className="font-medium text-green-600">+12.5%</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const FeesPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [feePayments, setFeePayments] = useState<FeePayment[]>(mockFeePayments);
  const [feeStructures] = useState<FeeStructure[]>(mockFeeStructures);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [feeTypeFilter, setFeeTypeFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');

  const filteredPayments = feePayments.filter(payment => {
    const matchesSearch = payment.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.student_admission_no.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesFeeType = feeTypeFilter === 'all' || payment.fee_type === feeTypeFilter;
    const matchesClass = classFilter === 'all' || payment.class_name === classFilter;
    
    return matchesSearch && matchesStatus && matchesFeeType && matchesClass;
  });

  const stats: FeeStats = {
    total_amount: feePayments.reduce((sum, payment) => sum + payment.amount_due, 0),
    collected_amount: feePayments.reduce((sum, payment) => sum + payment.amount_paid, 0),
    pending_amount: feePayments.filter(p => p.status === 'pending').reduce((sum, payment) => sum + payment.amount_due, 0),
    overdue_amount: feePayments.filter(p => p.status === 'overdue').reduce((sum, payment) => sum + payment.amount_due, 0),
    collection_rate: Math.round((feePayments.reduce((sum, payment) => sum + payment.amount_paid, 0) / feePayments.reduce((sum, payment) => sum + payment.amount_due, 0)) * 100),
    total_students: feePayments.length,
    paid_students: feePayments.filter(p => p.status === 'completed').length,
    pending_students: feePayments.filter(p => p.status === 'pending').length,
    overdue_students: feePayments.filter(p => p.status === 'overdue').length
  };

  const handlePayNow = async (payment: FeePayment) => {
    try {
      // Initialize Razorpay payment
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: payment.amount_due * 100, // Amount in paise
        currency: 'INR',
        name: 'BlueArch ERP',
        description: `${payment.fee_type} - ${payment.student_name}`,
        order_id: `order_${Date.now()}`, // This should come from your backend
        handler: function (response: any) {
          // Handle successful payment
          console.log('Payment successful:', response);
          
          // Update payment status
          setFeePayments(prev => prev.map(p => 
            p.id === payment.id 
              ? {
                  ...p,
                  status: 'completed' as const,
                  amount_paid: payment.amount_due,
                  payment_date: new Date().toISOString(),
                  razorpay_payment_id: response.razorpay_payment_id,
                  transaction_id: response.razorpay_order_id,
                  receipt_number: `RCP${Date.now()}`
                }
              : p
          ));
          
          alert('Payment successful!');
        },
        prefill: {
          name: payment.student_name,
          email: 'student@school.edu', // This should come from student data
          contact: '9999999999' // This should come from student data
        },
        theme: {
          color: '#3B82F6'
        }
      };

      // This would normally be loaded from Razorpay CDN
      // const rzp = new window.Razorpay(options);
      // rzp.open();
      
      // For demo purposes, simulate payment success
      setTimeout(() => {
        setFeePayments(prev => prev.map(p => 
          p.id === payment.id 
            ? {
                ...p,
                status: 'completed' as const,
                amount_paid: payment.amount_due,
                payment_date: new Date().toISOString(),
                razorpay_payment_id: `pay_${Date.now()}`,
                transaction_id: `txn_${Date.now()}`,
                receipt_number: `RCP${Date.now()}`
              }
            : p
        ));
        alert('Payment successful! (Demo)');
      }, 2000);
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const handleSendReminder = async (payment: FeePayment) => {
    try {
      // Send reminder notification
      console.log('Sending reminder for:', payment);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(`Reminder sent to ${payment.student_name}'s parents via SMS and email.`);
      
    } catch (error) {
      console.error('Failed to send reminder:', error);
      alert('Failed to send reminder. Please try again.');
    }
  };

  const handleViewReceipt = (payment: FeePayment) => {
    // Generate and download receipt
    console.log('Generating receipt for:', payment);
    alert(`Receipt ${payment.receipt_number} will be downloaded.`);
  };

  const uniqueFeeTypes = [...new Set(feePayments.map(p => p.fee_type))];
  const uniqueClasses = [...new Set(feePayments.map(p => p.class_name))];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fee Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage fee collection with Razorpay integration</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Bulk Upload
            </Button>
            <Button onClick={() => navigate('/fees/structure')}>
              <Plus className="w-4 h-4 mr-2" />
              Add Fee Structure
            </Button>
          </div>
        </div>

        {/* Razorpay Integration Panel */}
        <RazorpayIntegrationPanel />

        {/* Fee Statistics */}
        <FeeStatsCard stats={stats} />

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-wrap items-center gap-4">
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
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                  <option value="failed">Failed</option>
                </select>
                
                <select
                  value={feeTypeFilter}
                  onChange={(e) => setFeeTypeFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Fee Types</option>
                  {uniqueFeeTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Classes</option>
                  {uniqueClasses.map(className => (
                    <option key={className} value={className}>{className}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fee Payments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPayments.map((payment) => (
            <FeePaymentCard
              key={payment.id}
              payment={payment}
              onPayNow={handlePayNow}
              onSendReminder={handleSendReminder}
              onViewReceipt={handleViewReceipt}
            />
          ))}
        </div>

        {filteredPayments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No fee records found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchTerm || statusFilter !== 'all' || feeTypeFilter !== 'all' || classFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No fee structures have been created yet.'}
              </p>
              <Button onClick={() => navigate('/fees/structure')}>
                <Plus className="w-4 h-4 mr-2" />
                Create Fee Structure
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Fee Analytics</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">View collection trends and insights</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Send className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Bulk Reminders</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Send payment reminders to multiple students</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Receipt className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Receipt Management</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Generate and manage payment receipts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};