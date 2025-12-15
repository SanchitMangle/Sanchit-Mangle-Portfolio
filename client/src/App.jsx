import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { ReactLenis } from "lenis/react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { CustomCursor } from "./components/ui/CustomCursor";
import { Background } from "./components/Background";
import { Navbar } from "./components/Navbar";

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="fan">
      <Routes location={location} key={location.pathname}>
        <Route index element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

import SEO from "./components/SEO";

function App() {
  return (
    <ReactLenis root>
      <SEO />
      <BrowserRouter>
        <Toaster />
        <ScrollProgress />
        <CustomCursor />
        <Background />
        <Navbar />
        <AnimatedRoutes />
      </BrowserRouter>
    </ReactLenis>
  );
}

export default App;