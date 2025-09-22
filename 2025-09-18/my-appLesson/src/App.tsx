import { Link, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div>
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/about">Card</Link>
        <Link to="/something">Profile</Link>
      </nav>
      <Outlet />
    </div>
  )
}
