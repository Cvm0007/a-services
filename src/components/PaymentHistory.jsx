import { useState, useEffect } from 'react';
import { FiCreditCard, FiCalendar, FiCheck, FiX, FiSearch, FiFilter, FiDownload } from 'react-icons/fi';
import useAuthStore from '../store/authStore';

/**
 * PaymentHistory Component - Display and manage user payment transactions
 * Features: Transaction list, filtering, search, download receipts, payment status tracking
 * Can be modified: Add export options, integrate with payment gateways, add refund functionality
 */
const PaymentHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  
  const { payments, currentUser } = useAuthStore();

  // Filter payments for current user
  const userPayments = payments.filter(payment => payment.userId === currentUser.id);

  // Apply filters and search
  const filteredPayments = userPayments.filter(payment => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        payment.transactionId?.toLowerCase().includes(searchLower) ||
        payment.serviceDetails?.title?.toLowerCase().includes(searchLower) ||
        payment.paymentDetails?.last4?.includes(searchLower) ||
        payment.paymentDetails?.upiId?.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filterStatus !== 'all' && payment.status !== filterStatus) return false;

    // Payment method filter
    if (filterMethod !== 'all' && payment.method !== filterMethod) return false;

    // Date range filter
    if (dateRange !== 'all') {
      const paymentDate = new Date(payment.createdAt);
      const now = new Date();
      
      switch (dateRange) {
        case 'today':
          if (paymentDate.toDateString() !== now.toDateString()) return false;
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          if (paymentDate < weekAgo) return false;
          break;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          if (paymentDate < monthAgo) return false;
          break;
        case 'year':
          const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          if (paymentDate < yearAgo) return false;
          break;
      }
    }

    return true;
  });

  // Sort payments
  const sortedPayments = [...filteredPayments].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    
    switch (sortOrder) {
      case 'newest':
        return dateB - dateA;
      case 'oldest':
        return dateA - dateB;
      case 'amount_high':
        return (b.amount || 0) - (a.amount || 0);
      case 'amount_low':
        return (a.amount || 0) - (b.amount || 0);
      default:
        return dateB - dateA;
    }
  });

  // Get payment method icon
  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'card':
        return <FiCreditCard className="w-4 h-4" />;
      case 'upi':
        return <FiSmartphone className="w-4 h-4" />;
      case 'wallet':
        return <FiCalendar className="w-4 h-4" />;
      default:
        return <FiCreditCard className="w-4 h-4" />;
    }
  };

  // Get payment method display name
  const getPaymentMethodName = (method) => {
    switch (method) {
      case 'card':
        return 'Credit/Debit Card';
      case 'upi':
        return 'UPI';
      case 'wallet':
        return 'Mobile Wallet';
      default:
        return 'Unknown';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'refunded':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Download receipt
  const downloadReceipt = (payment) => {
    const receiptData = {
      transactionId: payment.transactionId,
      amount: payment.amount,
      currency: payment.currency,
      method: getPaymentMethodName(payment.method),
      status: payment.status,
      serviceDetails: payment.serviceDetails,
      paymentDetails: payment.paymentDetails,
      createdAt: payment.createdAt,
      user: {
        name: currentUser.name,
        email: currentUser.email
      }
    };

    const receiptText = `
PAYMENT RECEIPT
================

Transaction ID: ${receiptData.transactionId}
Amount: ${receiptData.currency} ${receiptData.amount}
Payment Method: ${receiptData.method}
Status: ${receiptData.status}
Date: ${formatDate(receiptData.createdAt)}

Service Details:
${receiptData.serviceDetails?.title || 'Service Payment'}
${receiptData.serviceDetails?.description || ''}

Payment Details:
${receiptData.method === 'card' 
  ? `Card ending in ${receiptData.paymentDetails.last4}`
  : receiptData.method === 'upi'
  ? `UPI ID: ${receiptData.paymentDetails.upiId}`
  : `${receiptData.paymentDetails.walletType} - ${receiptData.paymentDetails.mobileNumber}`
}

Customer Information:
Name: ${receiptData.user.name}
Email: ${receiptData.user.email}

Thank you for your payment!
    `.trim();

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${payment.transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Payment History</h2>
        <div className="text-sm text-gray-600">
          Total: {userPayments.length} transactions
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by transaction ID, service name, or payment details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
          />
        </div>

        {/* Filter Options */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Methods</option>
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
              <option value="wallet">Mobile Wallet</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last Year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="amount_high">Amount (High to Low)</option>
              <option value="amount_low">Amount (Low to High)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment List */}
      <div className="bg-white rounded-lg shadow-sm">
        {sortedPayments.length === 0 ? (
          <div className="text-center py-12">
            <FiCreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payment transactions found</h3>
            <p className="text-gray-600">
              {searchTerm || filterStatus !== 'all' || filterMethod !== 'all' || dateRange !== 'all'
                ? 'Try adjusting your filters or search terms'
                : 'You haven\'t made any payments yet'
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedPayments.map((payment) => (
                  <tr key={payment.transactionId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {payment.transactionId}
                      </div>
                      <div className="text-xs text-gray-500">
                        {payment.method === 'card' && payment.paymentDetails?.last4
                          ? `**** **** **** ${payment.paymentDetails.last4}`
                          : payment.method === 'upi' && payment.paymentDetails?.upiId
                          ? payment.paymentDetails.upiId
                          : payment.method === 'wallet' && payment.paymentDetails?.mobileNumber
                          ? `****${payment.paymentDetails.mobileNumber.slice(-4)}`
                          : 'N/A'
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {payment.serviceDetails?.title || 'Service Payment'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {payment.serviceDetails?.category || 'General Service'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        {getPaymentMethodIcon(payment.method)}
                        <span className="ml-2">{getPaymentMethodName(payment.method)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {payment.currency || 'INR'} {payment.amount || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                        {payment.status || 'unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(payment.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => downloadReceipt(payment)}
                        className="text-primary-600 hover:text-primary-900 font-medium"
                        title="Download Receipt"
                      >
                        <FiDownload className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
