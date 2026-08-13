import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Info, ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';
import GaugeChart from '../components/GaugeChart';
import Checklist from '../components/Checklist';

export default function Result() {
  const location = useLocation();

  const resultData = location.state?.resultData || {
    safety_score: 65,
    verdict: "Moderate Risk / Caution Advised",
    confidence: "Medium",
    audit_checks: [
      { id: 1, title: "Domain Age", status: "fail", detail: "Recently registered domain." },
      { id: 2, title: "Email Authenticity", status: "fail", detail: "Uses Gmail instead of company domain." },
      { id: 3, title: "SSL Security", status: "pass", detail: "HTTPS secure connection detected." },
      { id: 4, title: "AI Scam Detection", status: "pass", detail: "No major scam keywords found." }
    ]
  };

  const score =resultData.safety_score;

  // ⏱️ State to control card background blinking (stops after 3.5 seconds)
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBlinking(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [score]);

  // Dynamic values helper function
  const getVerdictDetails = (score) => {
    if (score >= 75) {
      return {
        title: resultData.verdict || "Legitimate / Low Risk",
        subtitle: "This internship offer appears safe and verified.",
        badgeText: "Low Risk / Safe",
        gradient: "linear-gradient(135deg, #059669, #10b981)",
        badgeBg: "#dcfce7",
        badgeColor: "#15803d",
        bgBlinkClass: "gauge-card-blink-safe", // 🟢 Green background blink
        Icon: ShieldCheck,
        actionTitle: "✅ Recommended Action:",
        actionText: "Looks good! You can safely apply or respond to this offer."
      };
    } else if (score >= 45) {
      return {
        title: resultData.verdict || "Moderate Risk / Caution Advised",
        subtitle: "This internship shows some suspicious indicators. Proceed carefully.",
        badgeText: "Moderate Risk",
        gradient: "linear-gradient(135deg, #d97706, #f59e0b)",
        badgeBg: "#fef3c7",
        badgeColor: "#b45309",
        bgBlinkClass: "gauge-card-blink-moderate", // 🟧 Amber background blink
        Icon: AlertTriangle,
        actionTitle: "⚠️ Recommended Action:",
        actionText: "Verify the company website, avoid paying upfront fees, and confirm recruiter identity."
      };
    } else {
      return {
        title: resultData.verdict || "High Risk / Potential Scam",
        subtitle: "Critical warning signs detected. Extreme caution advised.",
        badgeText: "High Risk",
        gradient: "linear-gradient(135deg, #dc2626, #ef4444)",
        badgeBg: "#fee2e2",
        badgeColor: "#b91c1c",
        bgBlinkClass: "gauge-card-blink-danger", // 🔴 Red background blink
        Icon: ShieldAlert,
        actionTitle: "🚨 Recommended Action:",
        actionText: "Do not share sensitive personal information or pay any money to this offer."
      };
    }
  };

  const verdictInfo = getVerdictDetails(score);
  const VerdictIcon = verdictInfo.Icon;

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '20px'
    }}>

      {/* 🔥 Dynamic Verdict Banner */}
      <div style={{
        background: verdictInfo.gradient,
        color: 'white',
        padding: '20px',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}>
        <VerdictIcon size={32} />
        <div>
          <h2 style={{ margin: 0 }}>{verdictInfo.title}</h2>
          <p style={{ margin: '5px 0 0', opacity: 0.9 }}>
            {verdictInfo.subtitle}
          </p>
        </div>
      </div>

      {/* 🎯 Gauge Meter Card (CARD BACKGROUND BLINKS IN COLOR FOR 3.5s) */}
      <div 
        className={`card ${isBlinking ? verdictInfo.bgBlinkClass : ''}`} 
        style={{
          marginTop: '20px',
          padding: '25px',
          borderRadius: '14px',
          textAlign: 'center',
          // Normal background state when blinking stops:
          background: isBlinking ? undefined : 'linear-gradient(135deg, #feeeff, #e0f2fe, #f3e8ff)',
          transition: 'background 0.5s ease',
          boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
        }}
      >
        <GaugeChart score={score} />

        <h2 style={{ marginTop: '10px', color: '#0f172a' }}>
          {score}% — <span style={{ color: verdictInfo.badgeColor }}>{verdictInfo.badgeText}</span>
        </h2>
        <p style={{ color: '#64748b' }}>
          AI Confidence: <strong style={{ color: '#0f172a' }}>{resultData.confidence}</strong>
        </p>
      </div>

      {/* 📊 Action Suggestion */}
      <div className="card" style={{
        marginTop: '20px',
        padding: '20px',
        borderRadius: '12px',
        background: verdictInfo.badgeBg,
        border: `1px solid ${verdictInfo.badgeColor}40`
      }}>
        <strong style={{ color: verdictInfo.badgeColor }}>{verdictInfo.actionTitle}</strong>
        <p style={{ marginTop: '5px', color: '#1e293b' }}>
          {verdictInfo.actionText}
        </p>
      </div>

      {/* 📋 Checklist */}
      <Checklist auditItems={resultData.audit_checks} />

      {/* ℹ️ Disclaimer */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        borderRadius: '10px',
        background: 'linear-gradient(135deg, #feeeff, #e0f2fe, #f3e8ff)',
        display: 'flex',
        gap: '10px'
      }}>
        <Info size={18} />
        <p style={{ fontSize: '14px', margin: 0, color: '#334155' }}>
          AI provides suggestions only. Always verify independently.
        </p>
      </div>

      {/* 🔁 Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '25px'
      }}>
        <Link to="/verify" style={{ color: '#0f0311ff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
          <RotateCcw size={18} /> Verify Another
        </Link>

        <Link to="/" style={{ color: '#040910ff', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
          <ArrowLeft size={18} /> Home
        </Link>
      </div>
    </div>
  );
}