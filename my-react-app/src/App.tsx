import React from 'react'; //
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; //
import Navbar from './Components/Navbar'; //
import Home from './Page/Home'; //
import Profile from './Page/Profile'; //
import Writing from './Page/Writing'; //
import Login from './Page/Log_in'; //
import Register from './Page/Register'; //
import ForgotPassword from './Page/ForgotPassword'; //
import CreateNovel from './Page/CreateNovel'; //
import CreateManga from './Page/CreateManga'; //
import NovelDetail from './Page/NovelDetail'; //
import MangaDetail from './Page/MangaDetail'; //
import ReadNovel from './Page/ReadNovel'; //
import ReadManga from './Page/ReadManga'; //
import MyReading from './Page/MyReading'; //
import AuthorPage from './Page/AuthorPage'; // 
import BuildNovel from './Page/BuildNovel'; //
import BuildManga from './Page/BuildManga'; //
import AddChapterNovel from './Page/AddCapterNovel'; //
import AddChapterManga from './Page/AddChapterManga'; //

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          {/* กลุ่มหน้าที่ไม่มี Navbar (Auth Pages) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* กลุ่มหน้าที่ต้องมี Navbar */}
          <Route path="/*" element={
            <>
              <Navbar /> 
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/writing" element={<Writing />} />
                  <Route path="/create-novel" element={<CreateNovel />} />
                  <Route path="/create-manga" element={<CreateManga />} />
                  <Route path="/novel-detail" element={<NovelDetail />} />
                  <Route path="/manga-detail" element={<MangaDetail />} />
                  <Route path="/read-novel" element={<ReadNovel />} />
                  <Route path="/read-manga" element={<ReadManga />} />
                  <Route path="/my-reading" element={<MyReading />} />
                  <Route path="/author/:authorName" element={<AuthorPage />} /> {/* */}
                  <Route path="/build-novel/:id" element={<BuildNovel />} />
                  <Route path="/build-manga/:id" element={<BuildManga />} />
                  <Route path="/add-chapter-novel" element={<AddChapterNovel />} />
                  <Route path="/add-chapter-manga/:id" element={<AddChapterManga />} />
                </Routes>
              </main>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;