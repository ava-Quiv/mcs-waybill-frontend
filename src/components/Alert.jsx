// src/components/Alert.jsx
export default function Alert({ type, data, message }) {
  if (type === 'success' && data) {
    return (
      <div style={{ backgroundColor: '#f0fff4', border: '1px solid #c6f6d5', color: '#22543d', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>🎉 Booking Confirmed Successfully!</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '15px' }}>
          <p style={{ margin: 0 }}><strong>Waybill Ref:</strong> <span style={{ color: '#2b6cb0', fontFamily: 'monospace', fontSize: '16px', fontWeight: 'bold' }}>{data.bookingNumber}</span></p>
          <p style={{ margin: 0 }}><strong>Calculated Fee:</strong> KSh {data.deliveryFee?.toLocaleString()}</p>
          <p style={{ margin: 0 }}><strong>Status:</strong> <span style={{ background: '#feebc8', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', color: '#c05621' }}>{data.status}</span></p>
          <p style={{ margin: 0 }}><strong>Payment Profiles:</strong> {data.paymentStatus} ({data.paymentMethod})</p>
        </div>
      </div>
    );
  }

  if (type === 'error' && message) {
    return (
      <div style={{ backgroundColor: '#fff5f5', border: '1px solid #fed7d7', color: '#9b2c2c', padding: '16px', borderRadius: '8px', marginBottom: '30px', fontSize: '15px' }}>
        <strong style={{ display: 'block', marginBottom: '4px' }}>Submission Failure:</strong> 
        {message}
      </div>
    );
  }

  return null;
}
