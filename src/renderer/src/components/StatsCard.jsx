export default function StatsCard({ title, children }) {
  return (
    <div
      style={{
        margin: 'auto',
        border: '1px solid #ddd'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          // backgroundColor: "grey",
          paddingInline: 4
        }}
      >
        <h3 style={{ letterSpacing: 2, color: 'lightGrey' }}>{title}</h3>
      </div>
      {/* <Divider sx={{ backgroundColor: "#525252" }} /> */}

      <div style={{ paddingInline: 4, paddingTop: 4, minHeight: 142 }}>{children}</div>
    </div>
  )
}
