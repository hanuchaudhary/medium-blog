import { motion } from "framer-motion";
import { useTheme } from "../provider/ThemeProvider";
import { MoonIcon, SunIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { name: "Our story", link: null },
    { name: "Membership", link: null },
    { name: "Write", link: null },
    { name: "Sign In", link: "/signin" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center transition-all duration-300 bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-80 text-black dark:text-white"
      style={{
        backgroundImage:
          "url('https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png')",
      }}
    >
      <header className="p-4 md:p-6 dark:bg-black dark:bg-opacity-10 rounded-b-2xl border-b dark:border-black border-neutral-400 backdrop-blur-lg">
        <nav className="flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold"
          >
            Medium
          </motion.h1>
          <div className="flex items-center space-x-8">
            <ul className="hidden md:flex space-x-6">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  className="cursor-pointer hover:underline"
                >
                  {item.link ? (
                    <Link className="text-green-500" to={item.link}>{item.name}</Link>
                  ) : (
                    item.name
                  )}
                </motion.li>
              ))}
            </ul>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <SunIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
              ) : (
                <MoonIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center text-center p-6">
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Stay curious.
        </motion.h2>
        <motion.p
          className="text-xl md:text-2xl max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Discover stories, thinking, and expertise from writers on any topic.
        </motion.p>
        <Link to={"/signup"}>
          <motion.button
            className="px-6 py-3 text-lg rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-opacity duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start reading
          </motion.button>
        </Link>
      </main>
    </div>
  );
}
