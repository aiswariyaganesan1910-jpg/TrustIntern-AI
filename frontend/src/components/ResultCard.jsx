
import React from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ResultCard({ score = 0, verdict = 'Pending Analysis' }) {
  let statusColor = '#22c55e'; // Green (Safe)
  let IconComponent = CheckCircle2;
  let bgGradient = 'rgba(34, 197, 94, 0.1)';

  if (score < 35) {
    statusColor = '#ef4444'; // Red (Fraud / High Risk)
    IconComponent = ShieldAlert;
    bgGradient = 'rgba(239, 68, 68, 0.1)';
  } else if (score < 70) {
    statusColor = '#eab308'; // Yellow (Caution)
    IconComponent = AlertTriangle;
    bgGradient = 'rgba(234, 179, 8, 0.1)';
  }

  return (
    <div className="card" style={{
      borderLeft: `6px solid ${statusColor}`,
      backgroundColor: '#1e293b',
      backgroundImage: `linear-gradient(to right, ${bgGradient}, transparent)`,
      display: 'flex',
      alignItems: 'center',
      gap: '1.25rem',
      padding: '1.5rem'
    }}>
      <div style={{
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        padding: '0.75rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <IconComponent size={36} color={statusColor} />
      </div>

      <div>
        <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: statusColor, fontWeight: '700' }}>
          Verification Status
        </div>
        <h2 style={{ fontSize: '1.6rem', color: '#f8fafc', margin: '0.1rem 0 0.3rem 0' }}>
          {verdict}
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.925rem', margin: 0 }}>
          Cross-reference verification completed with a total safety confidence score of <strong>{score}/100</strong>.
        </p>
      </div>
    </div>
  );
}