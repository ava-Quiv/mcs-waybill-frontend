// src/components/SummaryFooter.jsx
export default function SummaryFooter({ deliveryFee, isLoading }) {
  return (
    <div style={{ backgroundColor: '#ebf8ff', padding: '24px', borderRadius: '8px', border: '1px solid #bee3f8', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
      <div>
        <span style={{ color: '#2b6cb0', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: '600' }}>Total Estimated Delivery Fee</span>
        <h2 style={{ margin: '4px 0 0 0', color: '#2b6cb0', fontSize: '32px', fontWeight: '700' }}>KSh {deliveryFee.toLocaleString()}</h2>
      </div>
      <button 
        type="submit" 
        disabled={isLoading}
        style={{ 
          padding: '16px 40px', 
          backgroundColor: isLoading ? '#a0aec0' : '#2b6cb0', 
          color: '#ffffff', 
          border: 'none', 
          borderRadius: '6px', 
          fontSize: '16px', 
          fontWeight: '700', 
          cursor: isLoading ? 'not-allowed' : 'pointer', 
          boxShadow: '0 4px 6px -1px rgba(43, 108, 176, 0.2)'
        }}
      >
        {isLoading ? 'Processing Waybill...' : 'Confirm & Book Shipment'}
      </button>
    </div>
  );
}
