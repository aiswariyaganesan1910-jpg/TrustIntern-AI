import React from 'react';
import { HelpCircle, DollarSign, Mail, Calendar } from 'lucide-react';

export default function About() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <HelpCircle color="#4f46e5" size={32} />
          <h2 style={{ fontSize: '1.75rem', color: '#0f172a', margin: 0 }}>About TrustIntern</h2>
        </div>
        
        <p style={{ color: '#334155', lineHeight: '1.7', fontSize: '1rem', marginBottom: '1.5rem' }}>
          <strong>TrustIntern</strong> was designed to protect students and recent graduates from financial exploitation, fake job postings, and phishing scams disguised as remote internship opportunities.
        </p>

        <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
          Top 3 Internship Scam Indicators
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #f8c4fcff, #a0e2fcff, #ddf0ffff)', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', gap: '0.85rem' }}>
            <DollarSign color="#dc2626" size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ color: '#b91c1c', fontSize: '1rem', margin: 0 }}>1. Upfront Payment Demands</h4>
              <p style={{ color: '#39629cff', fontSize: '0.9rem', margin: '0.25rem 0 0 0', lineHeight: '1.5' }}>
                Legitimate employers never ask candidates to pay for training, laptop dispatch fees, or onboarding software keys via UPI or wire transfer.
              </p>
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg,#f8c4fcff, #a0e2fcff, #ddf0ffff)', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', gap: '0.85rem' }}>
            <Mail color="#dc2626" size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ color: '#b91c1c', fontSize: '1rem', margin: 0 }}>2. Public Domain Recruiter Emails</h4>
              <p style={{ color: '#39629cff', fontSize: '0.9rem', margin: '0.25rem 0 0 0', lineHeight: '1.5' }}>
                Official HR communications originate from company domain addresses (`hr@company.com`), not generic free webmail services like `@gmail.com` or `@yahoo.com`.
              </p>
            </div>
          </div>

          <div style={{background: 'linear-gradient(135deg,#f8c4fcff, #a0e2fcff, #ddf0ffff)', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', gap: '0.85rem' }}>
            <Calendar color="#dc2626" size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ color: '#b91c1c', fontSize: '1rem', margin: 0 }}>3. Brand New Web Domains</h4>
              <p style={{ color: '#39629cff', fontSize: '0.9rem', margin: '0.25rem 0 0 0', lineHeight: '1.5' }}>
                Fraudulent hiring syndicates frequently create disposable lookalike websites that have been registered for fewer than 30 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}