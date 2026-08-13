
import React from 'react';
import GaugeChartLib from 'react-gauge-chart';

export default function GaugeChart({ score = 0 }) {
  // Convert 0-100 score to 0-1 range required by react-gauge-chart
  const percent = Math.min(Math.max(score / 100, 0), 1);

  let scoreColor = '#ef4444'; // Red
  let statusText = 'Critical Risk Detected';

  if (score >= 70) {
    scoreColor = '#22c55e'; // Green
    statusText = 'High Safety Rating';
  } else if (score >= 35) {
    scoreColor = '#eab308'; // Yellow
    statusText = 'Moderate Risk / Caution';
  }

  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <h3 style={{ fontSize: '1.1rem', color: '#131e2cff', marginBottom: '0.5rem' }}>
        Authenticity Safety Index
      </h3>

      <div style={{ maxWidth: '360px', margin: '0 auto' }}>
        <GaugeChartLib
          id="safety-gauge-chart"
          nrOfLevels={3}
          colors={["#ef4444", "#eab308", "#22c55e"]}
          arcWidth={0.22}
          percent={percent}
          textColor="#5c3b3bff"
          needleColor="#94a3b8"
          needleBaseColor="#94a3b8"
          animate={true}
          animDelay={100}
        />
      </div>

      <div style={{ marginTop: '0.25rem' }}>
        <span style={{ fontSize: '2rem', fontWeight: 'bold', color: scoreColor }}>
          {score}%
        </span>
        <p style={{ color: '#0e0f11ff', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Assessment: <strong style={{ color: scoreColor }}>{statusText}</strong>
        </p>
      </div>
    </div>
  );
}