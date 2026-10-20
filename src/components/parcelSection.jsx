// src/components/ParcelSection.jsx
export default function ParcelSection({ formData, onChange, inputStyle, panelStyle }) {
  return (
    <div style={panelStyle}>
      <h3 style={{ color: '#b7791f', marginTop: 0, marginBottom: '16px', fontSize: '18px' }}>4. Parcel Specifications</h3>
      <div style={{ marginBottom: '14px' }}>
        <label style={{ fontSize: '14px', fontWeight: '600' }}>Parcel Type Category *</label>
        <select name="parcelType" value={formData.parcelType} onChange={onChange} required style={inputStyle}>
          <option value="">-- Choose Category --</option>
          <option value="Documents">Documents</option>
          <option value="Clothes">Clothes</option>
          <option value="Electronics">Electronics</option>
          <option value="Food">Food</option>
          <option value="Small Package">Small Package</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div style={{ marginBottom: '14px' }}>
        <label style={{ fontSize: '14px', fontWeight: '600' }}>Weight Metrics Bracket *</label>
        <select name="weight" value={formData.weight} onChange={onChange} required style={inputStyle}>
          <option value="">-- Choose Weight Class --</option>
          <option value="Below 1 kg">Below 1 kg (KSh 250)</option>
          <option value="1 - 5 kg">1 - 5 kg (KSh 450)</option>
          <option value="5 - 10 kg">5 - 10 kg (KSh 750)</option>
          <option value="10 - 20 kg">10 - 20 kg (KSh 1,200)</option>
          <option value="Above 20 kg">Above 20 kg (KSh 2,000)</option>
        </select>
      </div>
      <div>
        <label style={{ fontSize: '14px', fontWeight: '600' }}>Detailed Content Description</label>
        <textarea name="description" value={formData.description} onChange={onChange} maxLength={1000} style={{ ...inputStyle, height: '76px', resize: 'vertical' }} placeholder="Provide specific package details..." />
      </div>
    </div>
  );
}
