import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import Landing from "./pages/Landing";
import Blogs from "./pages/Blogs";
import Publish from "./pages/Publish";
import Profile from "./pages/Profile";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "./provider/ThemeProvider";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Landing />
            </PageTransition>
          }
        />
        <Route
          path="/signup"
          element={
            <PageTransition>
              <Signup />
            </PageTransition>
          }
        />
        <Route
          path="/signin"
          element={
            <PageTransition>
              <Signin />
            </PageTransition>
          }
        />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/me" element={<Profile />} />
      </Routes>
    </AnimatePresence>
  );
}

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

const WrappedApp = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default WrappedApp;
