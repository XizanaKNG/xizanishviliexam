"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (confirmed) {
      const timer = setTimeout(() => {
        router.push("/books");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [confirmed, router]);

  const handleConfirmation = (value: boolean) => {
    setShowPopup(false);
    if (value) setConfirmed(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Book Library</h1>
        <p className="text-gray-700 mb-6">
          Here is some text explaining the library and its purpose. Please read
          all the text before proceeding.
        </p>
        <button
          onClick={() => setShowPopup(true)}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition"
        >
          I Read All Text
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <p className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you’ve read all the text?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handleConfirmation(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                No
              </button>
              <button
                onClick={() => handleConfirmation(true)}
                className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Redirect Message */}
      {confirmed && (
        <p className="mt-6 text-lg font-semibold text-green-600">
          You will be redirected to the books page in 3 seconds...
        </p>
      )}
    </div>
  );
}
