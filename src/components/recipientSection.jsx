// src/components/RecipientSection.jsx
export default function RecipientSection({ formData, onChange, inputStyle, panelStyle }) {
  return (
    <div style={panelStyle}>
      <h3 style={{ color: '#2f855a', marginTop: 0, marginBottom: '16px', borderBottom: '2px solid #edf2f7', paddingBottom: '8px', fontSize: '18px' }}>2. Recipient Credentials</h3>
      <div style={{ marginBottom: '14px' }}>
        <label style={{ fontSize: '14px', fontWeight: '600' }}>Full Name *</label>
        <input type="text" name="recipientName" value={formData.recipientName} onChange={onChange} required minLength={3} maxLength={100} style={inputStyle} placeholder="Jane Smith" />
      </div>
      <div style={{ marginBottom: '14px' }}>
        <label style={{ fontSize: '14px', fontWeight: '600' }}>Phone Number (Kenyan Format) *</label>
        <input type="tel" name="recipientPhone" value={formData.recipientPhone} onChange={onChange} required pattern="^(?:\+254|254|07\01)\d{8}$" style={inputStyle} placeholder="e.g., 0787654321" />
      </div>
      <div>
        <label style={{ fontSize: '14px', fontWeight: '600' }}>National ID Number (7-9 Digits) *</label>
        <input type="text" name="recipientId" value={formData.recipientId} onChange={onChange} required pattern="^\d{7,9}$" style={inputStyle} placeholder="87654321" />
      </div>
    </div>
  );
}
