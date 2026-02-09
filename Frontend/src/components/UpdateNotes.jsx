import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function UpdateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
    const nav = useNavigate();
  // later: fetch note by id
  useEffect(() => {
    // simulate backend data
    const noteFromApi = {
      title: "Daily Plan",
      content: "Finish UI and connect backend APIs.",
    };

    setTitle(noteFromApi.title);
    setContent(noteFromApi.content);
    setLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedNote = {
      title,
      content,
    };

    console.log(updatedNote);
    // later: PUT /api/notes/:id
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading note...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-200 p-6">
      <div className="mx-auto max-w-3xl rounded-xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg p-8">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">
          Update Note
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Note
            </label>
            <textarea
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full resize-none rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="rounded border border-gray-400 px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={()=>nav('/notes')}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
            >
              Update Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateNote;
