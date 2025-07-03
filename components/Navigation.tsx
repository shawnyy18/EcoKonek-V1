'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/', icon: 'ri-home-line', label: 'Home' },
    { href: '/schedule', icon: 'ri-calendar-line', label: 'Schedule' },
    { href: '/donate', icon: 'ri-gift-line', label: 'Donate' },
    { href: '/learn', icon: 'ri-book-line', label: 'Learn' },
    { href: '/profile', icon: 'ri-user-line', label: 'Profile' }
  ];
  
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-5 h-20">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                isActive 
                  ? 'text-[#4CAF50] bg-[#4CAF50]/5' 
                  : 'text-gray-500 hover:text-[#4CAF50] hover:bg-[#4CAF50]/5'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <i className={`${item.icon} text-xl`}></i>
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}