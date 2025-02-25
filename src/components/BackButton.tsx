import { X } from "lucide-react";
import { useNavigate } from "react-router";

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <X
      onClick={() => navigate(-1)}
      size={28}
      strokeWidth={1}
      className="flex-1 py-4 box-content text-gray-400 active:text-white"
    />
  );
};
