import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import Landing from "./pages/Landing";
import { Blogs } from "./pages/Blogs";
import Publish from "./pages/Publish";
import Profile from "./pages/Profile";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <div className="dark bg-neutral-900">
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
          <Route
            path="/blog/:id"
            element={
              <PageTransition>
                <Blog />
              </PageTransition>
            }
          />
          <Route
            path="/blogs"
            element={
              <PageTransition>
                <Blogs />
              </PageTransition>
            }
          />
          <Route
            path="/publish"
            element={
              <PageTransition>
                <Publish />
              </PageTransition>
            }
          />
          <Route
            path="/me"
            element={
              <PageTransition>
                <Profile />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default WrappedApp;
