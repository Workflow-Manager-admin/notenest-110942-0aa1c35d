import React from "react";

export type Note = {
  id: string;
  title: string;
  content: string;
  created: string;
  updated: string;
  categoryId: string;
};

type NoteListProps = {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
};

export default function NoteList({ notes, selectedId, onSelect, onCreate }: NoteListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-gray-800 text-lg">Notes</h2>
        <button
          className="bg-primary text-white px-3 py-1 rounded hover:bg-primary/80 text-xs"
          onClick={onCreate}
        >
          + New Note
        </button>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {notes.map((note) => (
          <li key={note.id} className="mb-1">
            <button
              className={`p-2 block rounded w-full text-left ${
                selectedId === note.id ? "bg-gray-100 border border-primary" : "hover:bg-gray-50"
              }`}
              onClick={() => onSelect(note.id)}
            >
              <div className="font-semibold text-gray-900 truncate">{note.title || "(Untitled)"}</div>
              <div className="text-xs text-gray-400 truncate">
                {new Date(note.updated).toLocaleString()}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
