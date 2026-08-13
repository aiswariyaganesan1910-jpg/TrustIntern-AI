
import React from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function Checklist({ auditItems = [] }) {
  if (!auditItems || auditItems.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>
        <AlertCircle size={32} style={{ marginBottom: '0.5rem', opacity: 0.7 }} />
        <p>No audit details available for this check.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 style={{
        fontSize: '1.15rem',
        color: '#0f1216ff',
        marginBottom: '1rem',
        borderBottom: '1px solid #334155',
        paddingBottom: '0.75rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>Audit Inspection Summary</span>
        <span style={{ fontSize: '0.85rem', color: '#121416ff', fontWeight: 'normal' }}>
          {auditItems.length} Checks Executed
        </span>
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {auditItems.map((item) => {
          const isPassed = item.status === 'pass';
          return (
            <div
              key={item.id || item.title}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem',
                backgroundColor: '#0f172a',
                padding: '0.9rem 1rem',
                borderRadius: '8px',
                border: '1px solid #334155'
              }}
            >
              {isPassed ? (
                <CheckCircle2 color="#22c55e" size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
              ) : (
                <XCircle color="#ef4444" size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
              )}

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '0.975rem', margin: 0, color: isPassed ? '#4ade80' : '#f87171', fontWeight: '600' }}>
                    {item.title}
                  </h4>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    backgroundColor: isPassed ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: isPassed ? '#22c55e' : '#ef4444'
                  }}>
                    {isPassed ? 'PASS' : 'FAIL'}
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: '0.35rem 0 0 0', lineHeight: '1.4' }}>
                  {item.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}