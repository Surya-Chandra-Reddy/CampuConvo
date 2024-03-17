import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { verifyUser } from "../apis/auth";

const EmailVerify = () => {
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(null);
  const { id, token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const url = `${process.env.REACT_APP_SERVER_URL}/auth/verify/${id}/${token}`;
        const response = await verifyUser(url); 

        if (response && response.data && response.data.message === "Email Verified Successully") {
          setIsValid(true);
        } else {
          setError("Invalid Verification Link");
        }
      } catch (error) {
        setError("Error verifying email"); 
      }
    };

    verifyEmail();
  }, [id, token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-8 py-12 bg-white shadow-lg rounded-md text-center">
        {isValid ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Email Verified Successfully!</h2>
            <Link to="/login" className="text-blue-500 hover:underline">
              Proceed to Login
            </Link>
          </>
        ) : (
          <h2 className="text-2xl font-semibold">{error || "Verifying Email..."}</h2>
        )}
      </div>
    </div>
  );
};

export default EmailVerify;
