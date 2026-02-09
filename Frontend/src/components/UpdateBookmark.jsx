import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function UpdateBookmark() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
    const nav = useNavigate();
  // later: fetch bookmark by id
  useEffect(() => {
    const bookmarkFromApi = {
      url: "https://react.dev",
      title: "React – A JavaScript library for building UIs",
      description: "React makes it painless to create interactive UIs.",
    };

    setUrl(bookmarkFromApi.url);
    setTitle(bookmarkFromApi.title);
    setDescription(bookmarkFromApi.description);
    setLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBookmark = {
      url,
      title,
      description,
    };

    console.log(updatedBookmark);
    // later: PUT /api/bookmarks/:id
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading bookmark...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-200 p-6">
      <div className="mx-auto max-w-3xl rounded-xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg p-8">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">
          Update Bookmark
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Website URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

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

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="rounded border border-gray-400 px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={()=>nav('/bookmark')}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
            >
              Update Bookmark
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateBookmark;
