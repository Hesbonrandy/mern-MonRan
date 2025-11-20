export default function Visit() {
  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#6F4E37' }}>
        Visit MonRan Coffee House
      </h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '3rem', 
        alignItems: 'start',
        marginTop: '2rem'
      }}>
        {/* Map */}
        <div>
          <h3 style={{ color: '#6F4E37', marginBottom: '1rem' }}>Find Us in Kinoo</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!3m2!1sen!2ske!4v1763469342955!5m2!1sen!2ske!6m8!1m7!1sUbH28W1fUOqZlF-l8vQDgw!2m2!1d-1.256947345337924!2d36.69290897902764!3f255.89292631771843!4f-0.19026538924329373!5f0.7820865974627469" 
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            allowFullScreen=""
            loading="lazy"
            title="MonRan Coffee House Location"
          ></iframe>
        </div>

        {/* Info */}
        <div>
          <h3 style={{ color: '#6F4E37', marginBottom: '1rem' }}>Hours</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            <strong>Monday–Friday:</strong> 7AM–9PM<br />
            <strong>Saturday:</strong> 8AM–6PM<br />
            <strong>Sunday:</strong> 8AM–6PM
          </p>
          
          <h3 style={{ color: '#6F4E37', marginBottom: '1rem' }}>Contact Us</h3>
          <p>
            📧 <strong>Email:</strong> hello@monran.coffee<br />
            📞 <strong>Phone:</strong> +254 789 820 075
          </p>
          
          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#E6C588', borderRadius: '12px' }}>
            <h4 style={{ color: '#6F4E37', marginBottom: '0.5rem' }}>📍 We're Here For You</h4>
            <p>Walk-ins welcome! Free Wi-Fi, power outlets, and plenty of seating for remote work.</p>
          </div>
        </div>
      </div>
    </div>
  );
}