import React, { useState, useEffect, useRef } from "react";
import { Pencil, Trash2, ArrowBigLeftDash, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getAllBookmarks, deleteBookmark } from "../services/bookmarkServices.js";
import { getNotes, updateNote, deleteNote } from "../services/noteServices.js";
import { useAuth } from "../Context/AuthContext.jsx";

function Manager({ type }) {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const lastEditingId = useRef(null);
  const editRef = useRef(null);

  const [editValues, setEditValues] = useState({
    title: "",
    description: ""
  });

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (editRef.current && !editRef.current.contains(e.target)) {
        setEditingId(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () =>
      document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (loading || !user) return;
    if(type==='note'){
      const fetchNotes = async () => {
        try {
          const res = await getNotes();
          setNotes(res.notes);
        } catch (err) {
          console.error("Failed to fetch notes", err);
        }
      };
      fetchNotes();
    }
    else{
      const fetchBookmarks = async () => {
        try {
          const res = await getAllBookmarks();
          setNotes(res);
        } catch (err) {
          console.error("Failed to fetch bookmarks", err);
        }
      };

      fetchBookmarks();
    }
    
  }, [loading, user, type]);

  useEffect(() => {
    if (editingId !== null) return;
    if (!lastEditingId.current) return;

    const noteId = lastEditingId.current; // capture once

    const saveUpdate = async () => {
      try {
        await updateNote(noteId, editValues);

        setNotes(prev =>
          prev.map(n =>
            n._id === noteId
              ? { ...n, ...editValues }
              : n
          )
        );

        lastEditingId.current = null;
      } catch (err) {
        console.error("Update failed", err);
      }
    };

    saveUpdate();
  }, [editingId]);

  const handleEditStart = (note) => {
    setEditingId(note._id);
    lastEditingId.current = note._id;

    setEditValues({
      title: note.title,
      description: note.description
    });
  };
  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    try {
      if (type === "note") {
        await deleteNote(itemId);
      } else {
        await deleteBookmark(itemId);
      }
      setNotes(prev => prev.filter(item => item._id !== itemId));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-200 p-6">
      <div className="mx-auto max-w-5xl border-2 border-black bg-white/30 backdrop-blur-lg">
        {/* Header */}
        <div className="flex items-center justify-between bg-black px-4 py-2">
          <h1 className="text-sm font-semibold text-white">
            {type === "note" ? "Note Manager" : "Bookmark Manager"}
          </h1>
          <ArrowBigLeftDash
            className="cursor-pointer text-white"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 p-4">
          {type==='note'?(
            <button
            className="rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
            onClick={() =>navigate("/addNote")}
          >
            + Create Note
          </button>
          ):(
            <button
            className="rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
            onClick={() =>navigate("/addbookmark")}
          >
            + Create Bookmark
          </button>
          )}
          

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 rounded border border-black px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        {/* Notes Grid */}
        <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes
            .map((note) => {
              const isEditing = (editingId === note._id && type==='note');

              return (
                <div
                  key={note._id}
                  ref={isEditing &&(type==='note') ? editRef : null}
                  className={`relative h-48 border-2 border-black bg-indigo-200 p-3 ${isEditing ? "shadow-xl" : ""
                    }`}
                >
                  <div className="absolute right-2 top-2 flex gap-2">
                    {type==='note' && <button
                      className="hover:text-blue-700"
                      onClick={() => handleEditStart(note)}
                    >
                      <Pencil size={16} />
                    </button>
                    }
                    <button className="hover:text-red-600" onClick={() => handleDelete(note._id)}>
                      <Trash2 size={16} />
                    </button>
                    {
                      type=='bookmark' && (
                        <button
                          className="hover:text-blue-700"
                          onClick={() => window.open(note.url)}
                        >
                          <ArrowUpRight size={16} />
                        </button>
                      )
                    }
                  </div>

                  {/* Title */}
                  <h2 className="mb-2 border-b border-black pb-1 text-sm font-semibold">
                    {isEditing ? (
                      <textarea
                        autoFocus
                        value={editValues.title}
                        onChange={(e) =>
                          setEditValues((prev) => ({
                            ...prev,
                            title: e.target.value
                          }))
                        }
                        className="w-full resize-none border-none bg-transparent focus:outline-none"
                      />
                    ) : (
                      <div>{note.title}</div>
                    )}
                  </h2>

                  {/* Description */}
                  {isEditing ? (
                    <textarea
                      value={editValues.description}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          description: e.target.value
                        }))
                      }
                      className="w-full resize-none border-none bg-transparent text-sm text-gray-800 focus:outline-none"
                    />
                  ) : (
                    <p className="text-sm text-gray-800">
                      {note.description}
                    </p>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Manager;
