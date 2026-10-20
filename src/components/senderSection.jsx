// src/components/SenderSection.jsx
export default function SenderSection({ formData, onChange, inputStyle, panelStyle }) {
  return (
    <div style={panelStyle}>
      <h3 style={{ color: '#2b6cb0', marginTop: 0, marginBottom: '16px', borderBottom: '2px solid #edf2f7', paddingBottom: '8px', fontSize: '18px' }}>1. Sender Credentials</h3>
      <div style={{ marginBottom: '14px' }}>
        <label style={{ fontSize: '14px', fontWeight: '600' }}>Full Name *</label>
        <input type="text" name="senderName" value={formData.senderName} onChange={onChange} required minLength={3} maxLength={100} style={inputStyle} placeholder="John Doe" />
      </div>
      <div style={{ marginBottom: '14px' }}>
        <label style={{ fontSize: '14px', fontWeight: '600' }}>Phone Number (Kenyan Format) *</label>
        <input type="tel" name="senderPhone" value={formData.senderPhone} onChange={onChange} required pattern="^(?:\+254|254|07|01S)\d{8}$" style={inputStyle} placeholder="e.g., 0712345678" />
      </div>
      <div style={{ marginBottom: '14px' }}>
        <label style={{ fontSize: '14px', fontWeight: '600' }}>Email Address *</label>
        <input type="email" name="senderEmail" value={formData.senderEmail} onChange={onChange} required style={inputStyle} placeholder="sender@example.com" />
      </div>
      <div>
        <label style={{ fontSize: '14px', fontWeight: '600' }}>National ID Number (7-9 Digits) *</label>
        <input type="text" name="senderId" value={formData.senderId} onChange={onChange} required pattern="^\d{7,9}$" style={inputStyle} placeholder="12345678" />
      </div>
    </div>
  );
}
