import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Component() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] font-mono">
      
      <header className="flex items-center justify-between px-8 py-4 border-b">
        <div className="text-2xl font-bold">Medium</div>
        <nav className="flex items-center gap-6">
          <Link to="#" className="text-sm font-medium">
            Our story
          </Link>
          <Link to="#" className="text-sm font-medium">
            Membership
          </Link>
          <Link to="/signin" className="text-sm font-medium">
            Write
          </Link>
          <Link to="/signup" className="text-sm font-medium">
            Sign up
          </Link>
          <Button text="Get Started"/>
        </nav>
      </header>
      <main className="flex flex-col h-full items-center justify-center flex-1 px-8 py-16 text-center">
        <h1 className="text-6xl font-bold leading-tight">
          Human <br /> stories & ideas
        </h1>
        <p className="mt-4 text-lg">
          A place to read, write, and deepen your understanding
        </p>
        <div className="py-20">
          <Button text="Get Started"/>
        </div>
      </main>
      <footer className="flex absolute bottom-0 w-full justify-center px-8 py-4 border-t">
        <nav className="flex space-x-4 text-sm">
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
            Press
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
            Text to speech
          </Link>
          <Link to={"#"} className="text-muted-foreground">
            Teams
          </Link>
        </nav>
      </footer>
    </div>
  );
}
