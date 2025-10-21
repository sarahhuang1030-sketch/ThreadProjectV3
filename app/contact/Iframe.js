export default function Iframe() {
  return (
    <div className="iframe-container" style={{ marginTop: "1rem" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.372421737778!2d-114.08863112377513!3d51.06467487171598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53716f0056f4cc83%3A0xf8a35d39cfc7c508!2sSAIT%20Polytechnic%20-%20Parking%20P9!5e0!3m2!1sen!2sca!4v1757892122114!5m2!1sen!2sca"
        width="100%"
        height="400"
        allowFullScreen
        loading="lazy"
        style={{
          border: "2px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
        title="SAIT Parking P9 Map"
      />
    </div>
  );
}
