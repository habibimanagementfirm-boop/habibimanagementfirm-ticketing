export default function Home() {
  return (
    <div style={{
      background: "black",
      color: "white",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial"
    }}>
      <h1 style={{ fontSize: "3rem" }}>
        HABIBIMANAGEMENTFIRM
      </h1>

      <p>Official Ticketing Platform</p>

      <a href="https://t.me/Habibimanagementfirm">
        <button style={{
          marginTop: "20px",
          padding: "12px 24px",
          background: "pink",
          border: "none",
          cursor: "pointer"
        }}>
          Get Tickets via Telegram
        </button>
      </a>
    </div>
  );
}
