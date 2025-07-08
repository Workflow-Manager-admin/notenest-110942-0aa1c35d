import React, { useState } from "react";

export type Category = {
  id: string;
  name: string;
  color: string;
};

type Props = {
  categories: Category[];
  active: string;
  onSelect: (id: string) => void;
  onCreate: (name: string, color: string) => void;
  onDelete: (id: string) => void;
};

const palette = ["#0070f3", "#f5a623", "#1a202c", "#E6E6E6", "#7bc62d"];

export default function CategoryList({
  categories,
  active,
  onSelect,
  onCreate,
  onDelete,
}: Props) {
  const [adding, setAdding] = useState(false);
  const [input, setInput] = useState("");
  const [color, setColor] = useState("#0070f3");

  return (
    <nav className="flex-1">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="font-bold text-gray-700">Categories</h2>
        <button
          className="text-primary font-bold px-2 text-lg"
          title="Add category"
          onClick={() => setAdding(true)}
        >
          +
        </button>
      </div>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              className={`flex items-center w-full px-2 py-2 rounded text-left hover:bg-gray-100 ${
                active === cat.id ? "bg-gray-100 font-semibold" : ""
              }`}
              style={{ color: cat.color }}
              onClick={() => onSelect(cat.id)}
            >
              <span className="w-2 h-2 rounded-full mr-2" style={{ background: cat.color }} />
              {cat.name}
              {cat.id !== "default" && (
                <span
                  title="Delete"
                  className="ml-auto cursor-pointer text-xs text-gray-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(cat.id);
                  }}
                >
                  &#x1F5D1;
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      {adding && (
        <div className="mt-4 flex flex-col gap-2">
          <input
            className="border rounded px-2 py-1 text-sm"
            placeholder="Category name"
            autoFocus
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <div className="flex gap-2">
            {palette.map((c) => (
              <button
                key={c}
                className={`w-5 h-5 rounded-full ${
                  color === c ? "ring-2 ring-primary" : "border"
                }`}
                style={{ background: c }}
                onClick={() => setColor(c)}
                title={c}
                type="button"
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="bg-primary text-white px-3 py-1 rounded text-xs"
              disabled={!input.trim()}
              onClick={() => {
                onCreate(input.trim(), color);
                setInput("");
                setColor("#0070f3");
                setAdding(false);
              }}
            >
              Add
            </button>
            <button className="px-2 py-1 text-xs" onClick={() => setAdding(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
