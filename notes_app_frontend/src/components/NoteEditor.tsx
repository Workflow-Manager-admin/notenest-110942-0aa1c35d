import React, { useState, useEffect } from "react";
import { Note } from "./NoteList";
import Modal from "./Modal";

type Props = {
  note: Note;
  onSave: (n: Note) => void;
  onDelete: (id: string) => void;
};

export default function NoteEditor({ note, onSave, onDelete }: Props) {
  const [title, setTitle] = useState(note.title ?? "");
  const [content, setContent] = useState(note.content ?? "");
  const [showDel, setShowDel] = useState(false);

  useEffect(() => {
    setTitle(note.title ?? "");
    setContent(note.content ?? "");
  }, [note.id, note.title, note.content]);

  return (
    <div className="flex flex-col h-full">
      <input
        className="text-xl mb-2 font-semibold border-none focus:outline-primary bg-transparent py-1"
        placeholder="Title"
        value={title}
        aria-label="Note title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="resize-none flex-1 border-none focus:outline-primary bg-transparent mb-2"
        placeholder="Type your note..."
        value={content}
        aria-label="Note content"
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <button
          className="bg-primary text-white px-4 py-1 rounded"
          onClick={() => onSave({ ...note, title, content })}
        >
          Save
        </button>
        <button
          className="bg-red-50 text-red-400 px-4 py-1 rounded"
          onClick={() => setShowDel(true)}
        >
          Delete
        </button>
      </div>
      {showDel && (
        <Modal onClose={() => setShowDel(false)}>
          <div className="p-4">
            <p>Delete this note?</p>
            <div className="flex gap-3 mt-4">
              <button
                className="bg-red-400 text-white px-3 py-1 rounded"
                onClick={() => {
                  setShowDel(false);
                  onDelete(note.id);
                }}
              >
                Yes, Delete
              </button>
              <button className="bg-gray-100 px-3 py-1 rounded" onClick={() => setShowDel(false)}>
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
