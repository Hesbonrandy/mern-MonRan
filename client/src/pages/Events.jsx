export default function Events() {
  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <h1>Events & Space Booking</h1>
      <div style={{ marginTop: '2rem', display: 'grid', gap: '2rem' }}>
        <div className="menu-item">
          <h3>Freelancer Fridays</h3>
          <p>Every Friday, 2PM–5PM. Free coffee for remote workers!</p>
        </div>
        <div className="menu-item">
          <h3>Latte Art Workshop</h3>
          <p>Learn from our head barista. Next session: December 15, 2025.</p>
        </div>
        <div className="menu-item">
          <h3>Book Our Space</h3>
          <p>Email us at hello@monran.coffee to reserve for your event.</p>
        </div>
      </div>
    </div>
  );
}