import { useState } from "react";
import { useStore } from "../services/zustand";
import { Save, X} from "lucide-react";
import { useNavigate } from "react-router";

export const CreateCategoryScreen = () => {
  const navigate = useNavigate();
  const {createCategory, categories} = useStore();

  const [name, setName] = useState<string>("");
  const [parendCategoryId, setParentCategoryId] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      alert("Please enter a valid name.");
      return;
    }

    const newCategory: CategoryDto = {
      name,
      parent: categories[parendCategoryId],
    };

    createCategory(newCategory);

    // Reset form
    setName("");
    setParentCategoryId("");
  };


  return (
    <form onSubmit={handleSubmit} className="px-4 h-full flex flex-col font-light">
        <input
          autoFocus
          autoComplete="off"
          autoCorrect="none"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 text-right focus:outline-0 text-2xl placeholder:text-gray-500"
          required
        />

        <select
          value={parendCategoryId}
          onChange={(e) => setParentCategoryId(e.target.value)}
          className="w-full p-2 text-right focus:outline-0 text-2xl placeholder:text-gray-500"
        >
          <option value="" disabled>select parent</option>
          {Object.values(categories).map(({name, id}) => (

            <option key={id} value={id}>{name}</option>
          
          ))}
        </select>

      
      <div className="mt-auto w-full border-t flex justify-evenly">
        <X onClick={() => navigate(-1)} size={28} strokeWidth={1} className="flex-1 py-4 box-content"/>
        <button type="submit" className="flex-1 py-4 box-content flex justify-center">
          <Save size={28} strokeWidth={1} />
        </button>
      </div>

    </form>
  );
};
