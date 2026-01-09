import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProjectsManager from "./pages/admin/ProjectsManager";
import SkillsManager from "./pages/admin/SkillsManager";
import TimelineManager from "./pages/admin/TimelineManager";
import ProfileManager from "./pages/admin/ProfileManager";
import AuditLogs from "./pages/admin/AuditLogs";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import { ReactLenis } from "lenis/react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { CustomCursor } from "./components/ui/CustomCursor";
import { Background } from "./components/Background";
import { Navbar } from "./components/Navbar";
import SEO from "./components/SEO";

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

const PublicLayout = ({ children }) => {
  const location = useLocation();
  return (
    <>
      <ReactLenis root>
        <ScrollProgress />
        <CustomCursor />
        <Background />
        <Navbar />
        <AnimatePresence mode="fan">
          <Routes location={location} key={location.pathname}>
            <Route index element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </ReactLenis>
    </>
  );
};

function App() {
  return (
    <>
      <SEO />
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<ProjectsManager />} />
              <Route path="skills" element={<SkillsManager />} />
              <Route path="timeline" element={<TimelineManager />} />
              <Route path="profile" element={<ProfileManager />} />
              <Route path="audit-logs" element={<AuditLogs />} />
            </Route>
          </Route>

          {/* Public Routes */}
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;