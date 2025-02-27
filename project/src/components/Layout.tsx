import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Activity, Brain, Guitar as Hospital, Shield, Users, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

const navigation = [
  { name: 'Symptom Checker', href: '/', icon: Brain },
  { name: 'Health Dashboard', href: '/dashboard', icon: Activity },
  { name: 'Virtual Clinic', href: '/clinic', icon: Hospital },
  { name: 'Preventive Care', href: '/preventive', icon: Shield },
  { name: 'Provider Portal', href: '/provider', icon: Users },
];

export function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-blue-100">
      <nav className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-health" />
              
                <span className="ml-2 text-xl font-bold">MediConnect Pro</span>
              
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        location.pathname === item.href
                          ? 'bg-health text-white'
                          : 'text-gray-300 hover:bg-health/80 hover:text-white'
                      )}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none focus:text-white transition duration-150"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} px-2 pt-2 pb-3`}>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  location.pathname === item.href
                    ? 'bg-health text-white'
                    : 'text-gray-300 hover:bg-health/80 hover:text-white'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
