import React from 'react';

function Verify() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-8 py-12 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Email Verification</h2>
        <p className="text-gray-700 text-center mb-4">An email has been sent to your mailbox for verification.</p>
        {/* <div className="flex justify-center">
          <button
            onClick={() => {}}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md transition-colors duration-300 ease-in-out"
          >
            Resend Email
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default Verify;
