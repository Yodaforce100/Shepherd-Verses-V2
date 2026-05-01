export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F6F4' }}>
      <div className="text-center">
        <h1 style={{ color: '#001C5F', fontSize: '32px', marginBottom: '16px' }}>
          ✓ Payment Successful
        </h1>
        <p style={{ color: '#666', fontSize: '16px', marginBottom: '24px' }}>
          Welcome to Shepherd Verses! Your subscription is active.
        </p>
        <p style={{ color: '#999', fontSize: '14px', marginBottom: '32px' }}>
          Your first message will arrive tomorrow morning.
        </p>
        <a 
          href="/" 
          style={{
            display: 'inline-block',
            background: 'linear-gradient(90deg, #D9B86A 0%, #F5E9A4 35%, #E8D48B 60%, #D9B86A 100%)',
            color: '#001C5F',
            padding: '12px 32px',
            borderRadius: '24px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Return Home
        </a>
      </div>
    </div>
  )
}
