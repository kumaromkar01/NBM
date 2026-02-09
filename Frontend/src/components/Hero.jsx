import React from 'react'

function Hero() {
    return (
        <div className="bg-white px-6 py-20">
            <div className="mx-auto max-w-6xl space-y-24">

                {/* Notes Manager */}
                <div className="grid items-center gap-12 md:grid-cols-2">
                    {/* Text */}
                    <div>
                        <h2 className="mb-4 text-3xl font-semibold text-gray-800">
                            Notes Manager
                        </h2>
                        <p className="mb-6 text-gray-600">
                            Write, edit and organize your notes in a clean and distraction-free
                            interface. Quickly search your thoughts and keep everything
                            structured in one place.
                        </p>

                        <ul className="space-y-3 text-gray-700">
                            <li>• Create and edit notes easily</li>
                            <li>• Fast search across all notes</li>
                            <li>• Clean square-card layout</li>
                            <li>• Edit and delete anytime</li>
                        </ul>
                    </div>

                    {/* Image */}
                    <div className="rounded-xl border bg-gray-100 p-4 shadow">
                        <img
                            src="/Notes.png"
                            alt="Notes Manager Preview"
                            className="rounded-lg"
                        />
                    </div>
                </div>

                {/* Bookmark Manager */}
                <div className="grid items-center gap-12 md:grid-cols-2">
                    {/* Image */}
                    <div className="order-2 md:order-1 rounded-xl border bg-gray-100 p-4 shadow">
                        <img
                            src="/Bookmark.png"
                            alt="Bookmark Manager Preview"
                            className="rounded-lg"
                        />
                    </div>

                    {/* Text */}
                    <div className="order-1 md:order-2">
                        <h2 className="mb-4 text-3xl font-semibold text-gray-800">
                            Bookmark Manager
                        </h2>
                        <p className="mb-6 text-gray-600">
                            Save useful links, organize them and access your resources
                            instantly without clutter or browser overload.
                        </p>

                        <ul className="space-y-3 text-gray-700">
                            <li>• Save and manage important links</li>
                            <li>• Organized and searchable</li>
                            <li>• Quick access anytime</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Hero
