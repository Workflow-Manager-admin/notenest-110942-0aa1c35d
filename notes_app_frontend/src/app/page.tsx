"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CategoryList, { Category } from "../components/CategoryList";
import NoteList, { Note } from "../components/NoteList";
import NoteEditor from "../components/NoteEditor";
import AuthForm from "../components/AuthForm";

type User = {
  name: string;
  avatar: string;
  email: string;
};

export default function NotesApp() {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState("default");
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // PUBLIC_INTERFACE
  // Authentication effect, retrieve current session
  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((u) => setUser(u));
  }, []);

  // PUBLIC_INTERFACE
  // Handle login form
  const handleLogin = (email: string) => {
    setAuthLoading(true);
    setAuthError("");
    fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then(async (r) => {
        if (!r.ok) throw new Error("Invalid credentials");
        return await r.json();
      })
      .then((u) => {
        setUser(u);
        setAuthLoading(false);
      })
      .catch(() => {
        setAuthError("Invalid login");
        setAuthLoading(false);
      });
  };

  // PUBLIC_INTERFACE
  // Handle logout
  const handleLogout = () => {
    fetch("/api/auth", { method: "DELETE" }).then(() => setUser(null));
  };

  // PUBLIC_INTERFACE
  // Get categories
  const fetchCategories = () =>
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories);

  useEffect(() => {
    if (user) fetchCategories();
  }, [user]);

  const addCategory = (name: string, color: string) => {
    fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({ name, color }),
      headers: { "Content-Type": "application/json" },
    }).then(() => fetchCategories());
  };

  const delCategory = (id: string) => {
    fetch(`/api/categories?id=${encodeURIComponent(id)}`, { method: "DELETE" }).then(() =>
      fetchCategories()
    );
    if (currentCategory === id) setCurrentCategory("default");
  };

  // PUBLIC_INTERFACE
  // Fetch notes
  const fetchNotes = () => {
    const params = new URLSearchParams();
    if (currentCategory && currentCategory !== "default") params.set("category", currentCategory);
    if (search) params.set("q", search);
    return fetch("/api/notes?" + params.toString())
      .then((r) => r.json())
      .then(setNotes);
  };

  useEffect(() => {
    if (user) fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, currentCategory, search]);

  // PUBLIC_INTERFACE
  // Create, update, delete notes handlers
  const addNote = () => {
    fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({
        title: "",
        content: "",
        categoryId: currentCategory,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((n) => {
        setNotes([n, ...notes]);
        setSelected(n.id);
      });
  };
  const updateNote = (updated: Note) => {
    fetch("/api/notes", {
      method: "PUT",
      body: JSON.stringify(updated),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((n) => {
        setNotes(notes.map((note) => (note.id === n.id ? n : note)));
      });
  };
  const removeNote = (id: string) => {
    fetch(`/api/notes?id=${encodeURIComponent(id)}`, { method: "DELETE" }).then(() => {
      setNotes(notes.filter((n) => n.id !== id));
      if (selected === id) setSelected(null);
    });
  };

  // Responsive sidebar
  const handleToggleSidebar = () => setShowSidebar((v) => !v);

  // PUBLIC_INTERFACE
  // Main render logic with user-login and main app UI
  if (!user) {
    return (
      <AuthForm onLogin={handleLogin} error={authError} loading={authLoading} />
    );
  }

  return (
    <div className="h-screen flex flex-col font-sans bg-lightBG text-lightText">
      <Header
        onSearch={setSearch}
        user={user}
        onLogout={handleLogout}
        toggleSidebar={handleToggleSidebar}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={showSidebar} toggleSidebar={handleToggleSidebar}>
          <div className="p-4 flex flex-col h-full">
            <CategoryList
              categories={categories}
              active={currentCategory}
              onSelect={(id) => {
                setCurrentCategory(id);
                setShowSidebar(false);
              }}
              onCreate={addCategory}
              onDelete={delCategory}
            />
          </div>
        </Sidebar>
        {/* Main: Notes list and note editor */}
        <div className="flex-1 flex flex-col xl:flex-row min-w-0 h-full bg-lightBG">
          <div className="w-full xl:w-[340px] xl:border-r min-h-0 flex-shrink-0">
            <div className="p-4 h-full">
              <NoteList
                notes={notes}
                selectedId={selected}
                onSelect={setSelected}
                onCreate={addNote}
              />
            </div>
          </div>
          {/* Editor panel */}
          <div className="flex-1 overflow-hidden max-h-full">
            <div className="p-4 h-full">
              {selected ? (
                <NoteEditor
                  note={notes.find((n) => n.id === selected)!}
                  onSave={updateNote}
                  onDelete={removeNote}
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-gray-400">
                  <span className="text-[44px] mb-3">&#9998;</span>
                  <p>Select or create a note to start editing.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
