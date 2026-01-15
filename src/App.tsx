import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { FloatingHelp } from './components/layout/FloatingHelp';
import { Home } from './pages/Home';
import { ChefProfile } from './pages/ChefProfile';
import { SafetyGuidelines } from './pages/SafetyGuidelines';
import { FAQPage } from './pages/FAQPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:location/chef/:id" element={<ChefProfile />} />
          <Route path="/safety-guidelines" element={<SafetyGuidelines />} />
          <Route path="/faqs" element={<FAQPage />} />
        </Routes>
        <FloatingHelp />
      </div>
    </BrowserRouter>
  );
}

export default App;
