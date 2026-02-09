import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBookmark } from "../services/bookmarkServices";

function AddBookmark() {
  const nav = useNavigate();

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [metaLoading, setMetaLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMetadata = async () => {
    if (!url) return;

    setMetaLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://api.microlink.io/?url=${encodeURIComponent(url)}`
      );
      const data = await res.json();

      if (data.status !== "success") {
        throw new Error();
      }

      setTitle(data.data.title || "");
      setDescription(data.data.description || "");
    } catch {
      setError("Could not fetch metadata for this URL");
    } finally {
      setMetaLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await addBookmark({
        url,
        title,
        description,
      });

      nav("/bookmark");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add bookmark");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-200 p-6">
      <div className="mx-auto max-w-3xl rounded-xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg p-8">

        <h1 className="mb-6 text-2xl font-semibold text-gray-800">
          Add Bookmark
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Website URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onBlur={fetchMetadata}
              placeholder="https://example.com"
              className="w-full rounded border border-gray-700 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Click anywhere and Title and description will be fetched automatically
            </p>
          </div>

          <div className="rounded-lg border bg-white p-4">
            {metaLoading ? (
              <p className="text-sm text-gray-500">Fetching metadata…</p>
            ) : error ? (
              <p className="text-sm text-red-600">{error}</p>
            ) : (
              <>
                <h2 className="mb-1 text-lg font-semibold text-gray-800">
                  {title || "click to get Title here"}
                </h2>
                <p className="mb-2 text-sm text-gray-600">
                  {description || "Description will appear here"}
                </p>
                <p className="text-xs text-blue-600 break-all">
                  {url || "URL"}
                </p>
              </>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="rounded border border-gray-400 px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => nav("/bookmark")}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || metaLoading}
              className="rounded bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Bookmark"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddBookmark;
