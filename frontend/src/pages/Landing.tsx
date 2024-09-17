import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Component() {
  return (
    <div className="min-h-screen dark:bg-neutral-900 dark:text-white bg-[#f5f5f5] text-[#1a1a1a] font-mono">
      <header className="flex items-center justify-between px-8 py-4 dark:border-neutral-600 border-b">
        <div className="text-2xl font-bold">Medium.</div>
        <nav className="flex items-center gap-6">
          <Link to="#" className="text-sm hidden md:block font-medium">
            Our story
          </Link>
          <Link to="#" className="text-sm hidden md:block font-medium">
            Membership
          </Link>
          <Link to={"/signup"}>
            <Button text="Get Started" />
          </Link>
        </nav>
      </header>
      <main className="flex select-none flex-col h-full items-center justify-center flex-1 px-8 py-16 text-center">
        <h1 className="md:text-6xl text-4xl font-bold leading-tight">
          Human <br /> stories & ideas
        </h1>
        <p className="mt-4 text-lg">
          A place to read, write, and deepen your understanding
        </p>
        <Link to={"/signup"} className="py-20 ">
          <Button text="Get Started" />
        </Link>
      </main>
      <footer className="flex fixed bottom-0 w-full justify-center px-8 py-4 dark:border-neutral-600  border-t">
        <nav className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-4 text-sm">
          <Link to={"#"} className="text-muted-foreground">
            Help
          </Link>
          <Link to={"#"} className="text-muted-foreground">
            Status
          </Link>
          <Link to={"#"} className="text-muted-foreground">
            About
          </Link>
          <Link to={"#"} className="text-muted-foreground">
            Careers
          </Link>
          <Link to={"#"} className="text-muted-foreground">
            Blog
          </Link>
          <Link to={"#"} className="text-muted-foreground">
            Privacy
          </Link>
          <Link to={"#"} className="text-muted-foreground">
            Terms
          </Link>
          <Link to={"#"} className="text-muted-foreground">
            Teams
          </Link>
        </nav>
      </footer>
    </div>
  );
}
