'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      router.push('/');
    }, 1500);
  };

  const socialLogins = [
    { name: 'Google', icon: 'ri-google-line', color: 'bg-red-500' },
    { name: 'Facebook', icon: 'ri-facebook-line', color: 'bg-blue-600' },
    { name: 'Apple', icon: 'ri-apple-line', color: 'bg-gray-900' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4CAF50]/5 to-white">
      <Header 
        title="Welcome Back" 
        showBack 
        onBack={() => router.push('/welcome')} 
      />
      
      <main className="pt-20 px-4 flex flex-col justify-center min-h-screen">
        <div className="w-full max-w-sm mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-pacifico text-[#4CAF50] mb-2">EcoKonek PH</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <Card shadow="lg" className="mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                icon={<i className="ri-mail-line"></i>}
                required
              />
              
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                icon={<i className="ri-lock-line"></i>}
                required
              />
              
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded text-[#4CAF50]" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <Link href="/auth/forgot-password" className="text-[#4CAF50] hover:underline">
                  Forgot password?
                </Link>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </Card>

          {/* Social Login */}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {socialLogins.map((social) => (
                <Button
                  key={social.name}
                  variant="outline"
                  className="!p-3"
                  onClick={() => console.log(`Login with ${social.name}`)}
                >
                  <i className={`${social.icon} text-xl`}></i>
                </Button>
              ))}
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-[#4CAF50] font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}