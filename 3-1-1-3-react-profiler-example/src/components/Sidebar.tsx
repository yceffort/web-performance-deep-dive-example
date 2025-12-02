interface SidebarProps {
  onNavigate: () => void
}

function heavyComputation(iterations: number) {
  let result = 0
  for (let i = 0; i < iterations; i++) {
    result += Math.sqrt(i) * Math.sin(i)
  }
  return result
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  heavyComputation(50000)

  const menuItems = ['대시보드', '분석', '리포트', '설정']

  return (
    <aside
      style={{
        width: '200px',
        backgroundColor: '#1a1a2e',
        color: 'white',
        padding: '20px',
      }}
    >
      <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>메뉴</h2>
      <nav>
        {menuItems.map((item) => (
          <MenuItem key={item} label={item} onClick={onNavigate} />
        ))}
      </nav>
    </aside>
  )
}

function MenuItem({ label, onClick }: { label: string; onClick: () => void }) {
  heavyComputation(10000)

  return (
    <button
      onClick={onClick}
      style={{
        display: 'block',
        width: '100%',
        padding: '10px',
        marginBottom: '8px',
        backgroundColor: 'transparent',
        border: '1px solid #333',
        color: 'white',
        borderRadius: '4px',
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      {label}
    </button>
  )
}
