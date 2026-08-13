import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #feeeff, #e0f2fe, #f3e8ff)',
      borderBottom: '1px solid #e2e8f0',
      padding: '1rem 1.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo Branding */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)',
            padding: '0.4rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldCheck color="#ffffff" size={24} />
          </div>
          <span style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a', tracking: '-0.02em' }}>
            Trust<span style={{ color: '#4f46e5' }}>Intern</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: isActive('/') ? '#4f46e5' : '#64748b',
              fontWeight: isActive('/') ? '700' : '500',
              fontSize: '0.95rem'
            }}
          >
            Home
          </Link>
          <Link
            to="/verify"
            style={{
              textDecoration: 'none',
              color: isActive('/verify') ? '#4f46e5' : '#64748b',
              fontWeight: isActive('/verify') ? '700' : '500',
              fontSize: '0.95rem'
            }}
          >
            Verify Offer
          </Link>
          <Link
            to="/about"
            style={{
              textDecoration: 'none',
              color: isActive('/about') ? '#4f46e5' : '#64748b',
              fontWeight: isActive('/about') ? '700' : '500',
              fontSize: '0.95rem'
            }}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}