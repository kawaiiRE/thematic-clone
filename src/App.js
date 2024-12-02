import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import PlaylistsPage from './pages/Playlists'
import PlaylistPreview from './pages/PlaylistPreview'


function App () {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/playlists" element={<PlaylistsPage />} />
          <Route path="/playlist/:id" element={<PlaylistPreview />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
