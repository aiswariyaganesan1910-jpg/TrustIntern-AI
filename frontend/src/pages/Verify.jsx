import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Globe, FileText, Upload, MessageSquare, Search, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { verifyInternshipAPI } from '../services/api';

export default function Verify() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    website: '',
    offerText: '',
    additionalInfo: '',
    offerFile: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, offerFile: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const result = await verifyInternshipAPI(formData);
      navigate('/result', { state: { resultData: result } });
    } catch (error) {
      setErrorMessage('Failed to connect to verification server. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <ShieldCheck color="#4f46e5" size={28} />
          <h2 style={{ fontSize: '1.5rem', color: '#0f172a', margin: 0 }}>Verify Internship Offer</h2>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.925rem', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
          Provide the internship offer details below. Upload your offer letter document and paste offer communications for AI audit.
        </p>

        {errorMessage && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fca5a5',
            color: '#dc2626',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.25rem'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Company Name */}
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building2 size={18} color="#4f46e5" />
              Company Name <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              className="form-input"
              type="text"
              name="companyName"
              placeholder="e.g. Acme Tech Solutions"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Sender Email */}
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={18} color="#4f46e5" />
              Recruiter / Sender Email <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="e.g. hr@acmetech.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Company Website */}
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Globe size={18} color="#4f46e5" />
              Company Website URL
            </label>
            <input
              className="form-input"
              type="url"
              name="website"
              placeholder="e.g. https://acmetech.com"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          {/* Offer Letter File Upload */}
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Upload size={18} color="#4f46e5" />
              Upload Offer Letter (PDF / Document / Image)
            </label>
            <input
              className="form-file"
              type="file"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={handleFileChange}
            />
            {formData.offerFile && (
              <p style={{ fontSize: '0.8rem', color: '#16a34a', marginTop: '0.35rem', fontWeight: '500' }}>
                Selected file: {formData.offerFile.name}
              </p>
            )}
          </div>

          {/* Separate Additional Info Area */}
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={18} color="#4f46e5" />
              Additional Info / Notes
            </label>
            <textarea
              className="form-textarea"
              name="additionalInfo"
              rows={3}
              placeholder="Any additional details (e.g. communication method, stipend details requested, interview format)..."
              value={formData.additionalInfo}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            className="btn-primary"
            type="submit"
            disabled={loading}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '1.5rem'
            }}
          >
            {loading ? (
              <>
                <Loader2 className="spin-animation" size={20} />
                Executing Deep Audit...
              </>
            ) : (
              <>
                <Search size={20} />
                Verification
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}