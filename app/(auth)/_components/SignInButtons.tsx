import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

interface SignInButtonsProps {
  signInGithub: () => void;
  signInGoogle: () => void;
}

const SignInButtons = ({ signInGithub, signInGoogle }: SignInButtonsProps) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Button variant="outline" onClick={signInGithub}>
        <Github className="mr-2 h-4 w-4" />
        Github
      </Button>
      <Button variant="outline" onClick={signInGoogle}>
        <FaGoogle className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
};

export default SignInButtons;
