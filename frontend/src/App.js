import "@/App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider, useTheme } from "@/context/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Portfolio from "@/pages/Portfolio";
import Resume from "@/pages/Resume";
import Messages from "@/pages/Messages";

// Handle in-page anchor scroll when navigating with a hash
const ScrollToHash = () => {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);
  return null;
};

const PortfolioLayout = () => (
  <>
    <Navbar />
    <main>
      <Portfolio />
    </main>
    <Footer />
  </>
);

const ThemedToaster = () => {
  const { theme } = useTheme();
  return <Toaster position="bottom-right" richColors closeButton theme={theme} />;
};

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
          <ScrollToHash />
          <Routes>
            <Route path="/" element={<PortfolioLayout />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
          <ThemedToaster />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
