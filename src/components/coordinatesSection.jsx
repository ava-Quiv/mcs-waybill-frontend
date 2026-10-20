// src/components/CoordinatesSection.jsx
export default function CoordinatesSection({ formData, onChange, inputStyle, panelStyle }) {
  return (
    <div style={{ ...panelStyle, backgroundColor: '#edf2f7' }}>
      <h3 style={{ color: '#4a5568', marginTop: 0, marginBottom: '12px', fontSize: '18px' }}>3. Fulfillment Coordinates</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ flex: '1', minWidth: '260px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600' }}>Pickup Physical Address *</label>
          <input type="text" name="pickupAddress" value={formData.pickupAddress} onChange={onChange} required maxLength={300} style={inputStyle} placeholder="Street Name, Office Room, City Hub" />
        </div>
        <div style={{ flex: '1', minWidth: '260px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600' }}>Destination Delivery Address *</label>
          <input type="text" name="destination" value={formData.destination} onChange={onChange} required maxLength={300} style={inputStyle} placeholder="Building Name, Terminal, Town Center" />
        </div>
      </div>
    </div>
  );
}
