// src/components/ScheduleSection.jsx
export default function ScheduleSection({ formData, onChange, inputStyle, panelStyle }) {
  return (
    <div style={panelStyle}>
      <h3 style={{ color: '#e53e3e', marginTop: 0, marginBottom: '16px', fontSize: '18px' }}>5. Schedule & Billing Config</h3>
      <div style={{ marginBottom: '14px', display: 'flex', gap: '12px' }}>
        <div style={{ flex: '1' }}>
          <label style={{ fontSize: '14px', fontWeight: '600' }}>Pickup Date *</label>
          <input type="date" name="pickupDate" value={formData.pickupDate} onChange={onChange} required style={inputStyle} />
        </div>
        <div style={{ flex: '1' }}>
          <label style={{ fontSize: '14px', fontWeight: '600' }}>Time (24h Format) *</label>
          <input type="time" name="pickupTime" value={formData.pickupTime} onChange={onChange} required style={inputStyle} />
        </div>
      </div>
      <div style={{ marginBottom: '14px' }}>
        <label style={{ fontSize: '14px', fontWeight: '600' }}>Payment Selection Option</label>
        <select name="paymentMethod" value={formData.paymentMethod} onChange={onChange} style={inputStyle}>
          <option value="Cash">Cash On Delivery</option>
          <option value="M-Pesa">M-Pesa Transaction</option>
          <option value="Card">Credit/Debit Card</option>
        </select>
      </div>
      <div>
        <label style={{ fontSize: '14px', fontWeight: '600' }}>Special Instructions / Delivery Notes</label>
        <input type="text" name="notes" value={formData.notes} onChange={onChange} maxLength={1000} style={inputStyle} placeholder="e.g. Fragile glass item, handle with care" />
      </div>
    </div>
  );
}
