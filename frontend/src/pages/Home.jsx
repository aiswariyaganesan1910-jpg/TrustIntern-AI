import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Cpu, Globe, ArrowRight, ShieldAlert } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <div className="card" style={{
        textAlign: 'center',
        padding: '3.5rem 1.5rem',
        background: 'linear-gradient(135deg, #feeeff, #e0f2fe, #f3e8ff)',
        borderColor: '#cbd5e1'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          color: '#4f46e5',
          padding: '0.35rem 0.85rem',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: '600',
          marginBottom: '1.25rem',
          border: '1px solid rgba(79, 70, 229, 0.2)'
        }}>
          <ShieldAlert size={16} /> AI-Powered Internship Verification
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '1rem', color: '#0f172a' }}>
          Stop Internship Scams <br />
          <span style={{ color: '#4f46e5' }}>Before You Apply</span>
        </h1>

        <p style={{ color: '#475569', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
          TrustIntern uses automated WHOIS domain checks, email domain validation, and NLP AI text analysis to audit internship offers in seconds.
        </p>

        <button
          className="btn-primary"
          style={{
            maxWidth: '280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            fontSize: '1.05rem'
          }}
          onClick={() => navigate('/verify')}
        >
          <span>Verify Offer Now</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Feature Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
        <div className="card card-interactive">
          <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', padding: '0.75rem', width: 'fit-content', borderRadius: '8px', marginBottom: '1rem' }}>
            <Globe color="#4f46e5" size={28} />
          </div>
          <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.5rem' }}>Domain Intelligence</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>
            Extracts WHOIS registration dates, domain ownership records, and security SSL certificates to flag disposable websites.
          </p>
        </div>

        <div className="card card-interactive">
          <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', padding: '0.75rem', width: 'fit-content', borderRadius: '8px', marginBottom: '1rem' }}>
            <Cpu color="#4f46e5" size={28} />
          </div>
          <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.5rem' }}>AI NLP Analysis</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>
            Scans offer letter text and uploaded documents for illegal fee demands, suspicious urgency, telegram recruiters, and phishing triggers.
          </p>
        </div>

        <div className="card card-interactive">
          <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', padding: '0.75rem', width: 'fit-content', borderRadius: '8px', marginBottom: '1rem' }}>
            <Search color="#4f46e5" size={28} />
          </div>
          <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.5rem' }}>Instant Safety Score</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>
            Calculates a weighted 0–100% confidence rating backed by detailed pass/fail audit flags for complete transparency.
          </p>
        </div>
      </div>
    </div>
  );
}