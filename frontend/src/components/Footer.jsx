import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #feeeff, #e0f2fe, #f3e8ff)',
      borderTop: '1px solid #e2e8f0',
      padding: '1.5rem 1rem',
      marginTop: 'auto',
      textAlign: 'center',
      color: '#64748b',
      fontSize: '0.875rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
        <ShieldCheck size={18} color="#4f46e5" />
        <span style={{ fontWeight: '700', color: '#0f172a' }}>TrustIntern AI</span>
      </div>
      <p>© {new Date().getFullYear()} TrustIntern Platform. Dedicated to Student Employment Protection.</p>
    </footer>
  );
}