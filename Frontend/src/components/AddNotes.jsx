import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNote } from '../services/noteServices.js';
import toast from "react-hot-toast";

function AddNotes() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const noteData = {
        title,
        description: content,
      };

      console.log(noteData);
      const newNote = await createNote(noteData);
      toast.success('note created');
      nav('/notes');
    } catch (error) {
      toast.error(error.message || 'note creation failed')
    }


  };

  return (
    <div className="min-h-screen bg-indigo-200 p-6">
      <div className="mx-auto max-w-3xl rounded-xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg p-8">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">
          Add New Note
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              className="w-full rounded border border-gray-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Note
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              rows={8}
              className="w-full resize-none rounded border border-gray-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="rounded border border-gray-400 px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => nav('/notes')}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
            >
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNotes;
