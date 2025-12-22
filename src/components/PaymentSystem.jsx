import { useState } from 'react';
import { FiCreditCard, FiLock, FiCheck, FiAlertCircle, FiSmartphone, FiCalendar } from 'react-icons/fi';
import useAuthStore from '../store/authStore';

/**
 * PaymentSystem Component - Comprehensive payment processing interface
 * Features: Card payments, UPI, wallet payments, payment history, secure processing
 * Can be modified: Add new payment methods, integrate with payment gateways
 */
const PaymentSystem = ({ amount, serviceDetails, onPaymentSuccess, onPaymentCancel }) => {
  // Payment state management
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1); // 1: method, 2: details, 3: confirmation
  const [errors, setErrors] = useState({});
  
  // Card payment form state
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    saveCard: false
  });
  
  // UPI payment state
  const [upiDetails, setUpiDetails] = useState({
    upiId: '',
    saveUpi: false
  });
  
  // Wallet payment state
  const [walletDetails, setWalletDetails] = useState({
    walletType: 'paytm',
    mobileNumber: '',
    saveWallet: false
  });
  
  const { processPayment, currentUser } = useAuthStore();

  // Validate card details
  const validateCardDetails = () => {
    const newErrors = {};
    
    if (!cardDetails.cardNumber || cardDetails.cardNumber.length !== 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    if (!cardDetails.cardHolder || cardDetails.cardHolder.length < 3) {
      newErrors.cardHolder = 'Please enter the cardholder name';
    }
    
    if (!cardDetails.expiryMonth || !cardDetails.expiryYear) {
      newErrors.expiry = 'Please select expiry date';
    }
    
    if (!cardDetails.cvv || cardDetails.cvv.length !== 3) {
      newErrors.cvv = 'Please enter a valid 3-digit CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate UPI details
  const validateUpiDetails = () => {
    const newErrors = {};
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
    
    if (!upiDetails.upiId || !upiRegex.test(upiDetails.upiId)) {
      newErrors.upiId = 'Please enter a valid UPI ID (e.g., user@bank)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate wallet details
  const validateWalletDetails = () => {
    const newErrors = {};
    const mobileRegex = /^[6-9]\d{9}$/;
    
    if (!walletDetails.mobileNumber || !mobileRegex.test(walletDetails.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Process payment based on selected method
  const handlePayment = async () => {
    let isValid = false;
    
    switch (paymentMethod) {
      case 'card':
        isValid = validateCardDetails();
        break;
      case 'upi':
        isValid = validateUpiDetails();
        break;
      case 'wallet':
        isValid = validateWalletDetails();
        break;
      default:
        isValid = false;
    }
    
    if (!isValid) return;
    
    setProcessingPayment(true);
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const paymentData = {
        userId: currentUser.id,
        amount: amount,
        currency: 'INR',
        method: paymentMethod,
        serviceDetails: serviceDetails,
        status: 'completed',
        transactionId: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        paymentDetails: paymentMethod === 'card' ? {
          last4: cardDetails.cardNumber.slice(-4),
          cardHolder: cardDetails.cardHolder
        } : paymentMethod === 'upi' ? {
          upiId: upiDetails.upiId
        } : {
          walletType: walletDetails.walletType,
          mobileNumber: walletDetails.mobileNumber
        },
        createdAt: new Date().toISOString()
      };
      
      const result = processPayment(paymentData);
      
      if (result.success) {
        setPaymentStep(3); // Success step
        if (onPaymentSuccess) {
          onPaymentSuccess(result.payment);
        }
      } else {
        setErrors({ payment: result.error });
      }
    } catch (error) {
      setErrors({ payment: 'Payment processing failed. Please try again.' });
    } finally {
      setProcessingPayment(false);
    }
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Render payment method selection
  const renderPaymentMethod = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setPaymentMethod('card')}
          className={`p-4 border rounded-lg text-left transition-colors ${
            paymentMethod === 'card' 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <FiCreditCard className="w-6 h-6 mb-2 text-primary-600" />
          <div className="font-medium">Credit/Debit Card</div>
          <div className="text-sm text-gray-600">Visa, Mastercard, RuPay</div>
        </button>
        
        <button
          onClick={() => setPaymentMethod('upi')}
          className={`p-4 border rounded-lg text-left transition-colors ${
            paymentMethod === 'upi' 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <FiSmartphone className="w-6 h-6 mb-2 text-primary-600" />
          <div className="font-medium">UPI Payment</div>
          <div className="text-sm text-gray-600">Google Pay, PhonePe, Paytm</div>
        </button>
        
        <button
          onClick={() => setPaymentMethod('wallet')}
          className={`p-4 border rounded-lg text-left transition-colors ${
            paymentMethod === 'wallet' 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <FiCalendar className="w-6 h-6 mb-2 text-primary-600" />
          <div className="font-medium">Mobile Wallet</div>
          <div className="text-sm text-gray-600">Paytm, PhonePe, Amazon Pay</div>
        </button>
      </div>
      
      <button
        onClick={() => setPaymentStep(2)}
        className="btn-primary w-full mt-6"
      >
        Continue with {paymentMethod === 'card' ? 'Card' : paymentMethod === 'upi' ? 'UPI' : 'Wallet'} Payment
      </button>
    </div>
  );

  // Render card payment form
  const renderCardPayment = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Card Details</h3>
      
      <div>
        <label className="block text-sm font-medium mb-2">Card Number</label>
        <input
          type="text"
          value={cardDetails.cardNumber}
          onChange={(e) => setCardDetails({
            ...cardDetails,
            cardNumber: formatCardNumber(e.target.value)
          })}
          placeholder="1234 5678 9012 3456"
          maxLength="19"
          className={`input-field ${errors.cardNumber ? 'border-red-500' : ''}`}
        />
        {errors.cardNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Cardholder Name</label>
        <input
          type="text"
          value={cardDetails.cardHolder}
          onChange={(e) => setCardDetails({
            ...cardDetails,
            cardHolder: e.target.value
          })}
          placeholder="John Doe"
          className={`input-field ${errors.cardHolder ? 'border-red-500' : ''}`}
        />
        {errors.cardHolder && (
          <p className="text-red-500 text-sm mt-1">{errors.cardHolder}</p>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Expiry Date</label>
          <div className="flex gap-2">
            <select
              value={cardDetails.expiryMonth}
              onChange={(e) => setCardDetails({
                ...cardDetails,
                expiryMonth: e.target.value
              })}
              className={`input-field ${errors.expiry ? 'border-red-500' : ''}`}
            >
              <option value="">Month</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={String(i + 1).padStart(2, '0')}>
                  {String(i + 1).padStart(2, '0')}
                </option>
              ))}
            </select>
            <select
              value={cardDetails.expiryYear}
              onChange={(e) => setCardDetails({
                ...cardDetails,
                expiryYear: e.target.value
              })}
              className={`input-field ${errors.expiry ? 'border-red-500' : ''}`}
            >
              <option value="">Year</option>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={new Date().getFullYear() + i}>
                  {new Date().getFullYear() + i}
                </option>
              ))}
            </select>
          </div>
          {errors.expiry && (
            <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">CVV</label>
          <input
            type="text"
            value={cardDetails.cvv}
            onChange={(e) => setCardDetails({
              ...cardDetails,
              cvv: e.target.value.replace(/\D/g, '').slice(0, 3)
            })}
            placeholder="123"
            maxLength="3"
            className={`input-field ${errors.cvv ? 'border-red-500' : ''}`}
          />
          {errors.cvv && (
            <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="saveCard"
          checked={cardDetails.saveCard}
          onChange={(e) => setCardDetails({
            ...cardDetails,
            saveCard: e.target.checked
          })}
          className="mr-2"
        />
        <label htmlFor="saveCard" className="text-sm">Save card for future payments</label>
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={() => setPaymentStep(1)}
          className="btn-secondary flex-1"
        >
          Back
        </button>
        <button
          onClick={handlePayment}
          disabled={processingPayment}
          className="btn-primary flex-1"
        >
          {processingPayment ? 'Processing...' : `Pay ₹${amount}`}
        </button>
      </div>
    </div>
  );

  // Render UPI payment form
  const renderUpiPayment = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">UPI Details</h3>
      
      <div>
        <label className="block text-sm font-medium mb-2">UPI ID</label>

        <input
          type="text"
          value={upiDetails.upiId}
          onChange={(e) => setUpiDetails({
            ...upiDetails,
            upiId: e.target.value
          })}
          placeholder="yourname@bankname"
          className={`input-field ${errors.upiId ? 'border-red-500' : ''}`}
        />
        {errors.upiId && (
          <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>
        )}
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="saveUpi"
          checked={upiDetails.saveUpi}
          onChange={(e) => setUpiDetails({
            ...upiDetails,
            saveUpi: e.target.checked
          })}
          className="mr-2"
        />
        <label htmlFor="saveUpi" className="text-sm">Save UPI ID for future payments</label>
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={() => setPaymentStep(1)}
          className="btn-secondary flex-1"
        >
          Back
        </button>
        <button
          onClick={handlePayment}
          disabled={processingPayment}
          className="btn-primary flex-1"
        >
          {processingPayment ? 'Processing...' : `Pay ₹${amount}`}
        </button>
      </div>
    </div>
  );

  // Render wallet payment form
  const renderWalletPayment = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Mobile Wallet Details</h3>
      
      <div>
        <label className="block text-sm font-medium mb-2">Wallet Type</label>
        <select
          value={walletDetails.walletType}
          onChange={(e) => setWalletDetails({
            ...walletDetails,
            walletType: e.target.value
          })}
          className="input-field"
        >
          <option value="paytm">Paytm</option>
          <option value="phonepe">PhonePe</option>
          <option value="amazonpay">Amazon Pay</option>
          <option value="mobikwik">MobiKwik</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Mobile Number</label>
        <input
          type="text"
          value={walletDetails.mobileNumber}
          onChange={(e) => setWalletDetails({
            ...walletDetails,
            mobileNumber: e.target.value.replace(/\D/g, '').slice(0, 10)
          })}
          placeholder="9876543210"
          maxLength="10"
          className={`input-field ${errors.mobileNumber ? 'border-red-500' : ''}`}
        />
        {errors.mobileNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
        )}
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="saveWallet"
          checked={walletDetails.saveWallet}
          onChange={(e) => setWalletDetails({
            ...walletDetails,
            saveWallet: e.target.checked
          })}
          className="mr-2"
        />
        <label htmlFor="saveWallet" className="text-sm">Save wallet for future payments</label>
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={() => setPaymentStep(1)}
          className="btn-secondary flex-1"
        >
          Back
        </button>
        <button
          onClick={handlePayment}
          disabled={processingPayment}
          className="btn-primary flex-1"
        >
          {processingPayment ? 'Processing...' : `Pay ₹${amount}`}
        </button>
      </div>
    </div>
  );

  // Render payment success
  const renderPaymentSuccess = () => (
    <div className="text-center space-y-4">
      <FiCheck className="w-16 h-16 text-green-500 mx-auto" />
      <h3 className="text-xl font-semibold text-green-600">Payment Successful!</h3>
      <p className="text-gray-600">Your payment of ₹{amount} has been processed successfully.</p>
      
      <div className="bg-gray-50 p-4 rounded-lg text-left">
        <h4 className="font-medium mb-2">Transaction Details</h4>
        <div className="space-y-1 text-sm">
          <p><span className="font-medium">Service:</span> {serviceDetails?.title || 'Service Payment'}</p>
          <p><span className="font-medium">Amount:</span> ₹{amount}</p>
          <p><span className="font-medium">Method:</span> {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}</p>
          <p><span className="font-medium">Status:</span> <span className="text-green-600">Completed</span></p>
        </div>
      </div>
      
      <button
        onClick={onPaymentCancel}
        className="btn-primary w-full"
      >
        Done
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Secure Payment</h2>
        <div className="flex items-center text-sm text-gray-600">
          <FiLock className="w-4 h-4 mr-1" />
          Secure Checkout
        </div>
      </div>
      
      {errors.payment && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          <div className="flex items-center">
            <FiAlertCircle className="w-5 h-5 mr-2" />
            {errors.payment}
          </div>
        </div>
      )}
      
      {paymentStep === 1 && renderPaymentMethod()}
      {paymentStep === 2 && paymentMethod === 'card' && renderCardPayment()}
      {paymentStep === 2 && paymentMethod === 'upi' && renderUpiPayment()}
      {paymentStep === 2 && paymentMethod === 'wallet' && renderWalletPayment()}
      {paymentStep === 3 && renderPaymentSuccess()}
      
      {onPaymentCancel && paymentStep !== 3 && (
        <button
          onClick={onPaymentCancel}
          className="text-gray-600 hover:text-gray-800 text-sm mt-4 block mx-auto"
        >
          Cancel Payment
        </button>
      )}
    </div>
  );
};

export default PaymentSystem;
