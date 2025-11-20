import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>

      {/* HERO SECTION */}
      <section style={{ backgroundColor: '#6F4E37', color: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '0.8rem' }}>
            ☕ MonRan Coffee House
          </h1>
          <p style={{ fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            Nairobi’s community brew for remote workers in Kinoo.
          </p>

          <div>
            <Link
              to="/menu"
              style={{
                padding: '0.85rem 1.8rem',
                backgroundColor: '#E6C588',
                color: '#6F4E37',
                textDecoration: 'none',
                borderRadius: '25px',
                marginRight: '1rem',
                fontWeight: '600'
              }}
            >
              View Menu
            </Link>

            <Link
              to="/events"
              style={{
                padding: '0.85rem 1.8rem',
                backgroundColor: 'white',
                color: '#6F4E37',
                textDecoration: 'none',
                borderRadius: '25px',
                fontWeight: '600'
              }}
            >
              Events & Space
            </Link>
          </div>
        </div>
      </section>


      {/* FEATURED DRINK */}
      <section style={{ padding: '3rem 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#6F4E37' }}>Barista’s Pick</h2>
        
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            maxWidth: '1000px',
            margin: '0 auto'
          }}
        >
          <img
            src="/images/oat-milk-honey-latte.jpg"
            alt="images of Oat Milk Honey Latte"
            style={{ width: '260px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />

          <div style={{ maxWidth: '420px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.8rem', color: '#6F4E37' }}>
              Oat Milk Honey Latte
            </h3>
            <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
              Smooth espresso with house-made honey syrup infused with Kinoo lemons and Kenyan ginger.
            </p>
            <p style={{ fontWeight: '700', fontSize: '1.2rem', marginBottom: '1.5rem', color: '#6F4E37' }}>
              KSh 750
            </p>

            <Link
              to="/menu"
              style={{
                padding: '0.7rem 1.6rem',
                backgroundColor: '#6F4E37',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '25px',
                fontWeight: '600'
              }}
            >
              Try It Today
            </Link>
          </div>
        </div>
      </section>


      {/* TESTIMONIAL SECTION */}
      <section style={{ padding: '3rem 1rem', backgroundColor: '#f8f5f0', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#6F4E37' }}>
            “MonRan is my second office.”
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#6F4E37' }}>— Randy, Freelance UX Designer</p>
        </div>
      </section>


      {/* VISIT CTA SECTION */}
      <section style={{ padding: '3.5rem 1rem', backgroundColor: '#E6C588', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ color: '#6F4E37', fontSize: '2rem', marginBottom: '1rem' }}>
            Ready to Visit?
          </h2>

          <p
            style={{
              marginBottom: '1.8rem',
              maxWidth: '600px',
              margin: '0 auto 1.8rem',
              fontSize: '1.1rem',
              lineHeight: '1.6',
              color: '#6F4E37'
            }}
          >
            We're located in the heart of Kinoo with free parking, fast Wi-Fi, and the best coffee in Nairobi.
          </p>

          <Link
            to="/visit"
            style={{
              padding: '0.9rem 2.4rem',
              backgroundColor: '#6F4E37',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '30px',
              fontWeight: '600',
              fontSize: '1rem'
            }}
          >
            Get Directions
          </Link>
        </div>
      </section>

    </>
  );
}
