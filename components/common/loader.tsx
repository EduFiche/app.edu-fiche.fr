import * as React from "react";
import { Loader2 } from "lucide-react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
    </div>
  );
};

export default Loader;
