
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleResendEmail = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="pt-16 px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8 pt-12">
              <Link href="/auth/login" className="inline-flex items-center text-gray-600 mb-6">
                <i className="ri-arrow-left-line mr-2"></i>
                Back to Login
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-mail-check-line text-3xl text-green-600"></i>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h1>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to:
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="font-medium text-gray-900">{email}</p>
              </div>
              
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start">
                  <i className="ri-check-line text-green-500 mr-2 mt-0.5"></i>
                  <span>Click the link in your email to reset your password</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-500 mr-2 mt-0.5"></i>
                  <span>The link will expire in 24 hours for security</span>
                </div>
                <div className="flex items-start">
                  <i className="ri-check-line text-green-500 mr-2 mt-0.5"></i>
                  <span>Check your spam folder if you don't see it</span>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">Didn't receive the email?</p>
                <button
                  onClick={handleResendEmail}
                  disabled={isSubmitting}
                  className="text-green-600 text-sm font-medium hover:text-green-700 disabled:opacity-50 flex items-center justify-center mx-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-600 border-t-transparent mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="ri-refresh-line mr-2"></i>
                      Resend Email
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="text-center mt-6">
              <Link href="/auth/login" className="text-gray-600 text-sm">
                Remember your password? <span className="text-green-600 font-medium">Sign In</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 pt-12">
            <Link href="/auth/login" className="inline-flex items-center text-gray-600 mb-6">
              <i className="ri-arrow-left-line mr-2"></i>
              Back to Login
            </Link>
            
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-lock-unlock-line text-2xl text-green-600"></i>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h1>
            <p className="text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg flex items-center">
                <i className="ri-error-warning-line text-red-600 mr-2"></i>
                <span className="text-red-800 text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
              />

              <Button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="w-full !rounded-button"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Sending Reset Link...
                  </div>
                ) : (
                  <>
                    <i className="ri-mail-send-line mr-2"></i>
                    Send Reset Link
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <i className="ri-information-line text-blue-500 mr-2 mt-0.5"></i>
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Security Notice</p>
                  <p>For your security, password reset links expire after 24 hours. If you don't have access to your email, please contact our support team.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link href="/auth/signup" className="text-gray-600 text-sm">
              Don't have an account? <span className="text-green-600 font-medium">Sign Up</span>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link href="/profile/support" className="inline-flex items-center text-gray-600 text-sm hover:text-green-600">
              <i className="ri-customer-service-line mr-2"></i>
              Need help? Contact Support
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
