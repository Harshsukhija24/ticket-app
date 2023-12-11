// Import the necessary modules
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

const Login = () => {
  // State variables for form fields and error handling
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Next.js router instance
  const router = useRouter();

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      // Use signIn function from next-auth to authenticate
      const response = await signIn("credentials", {
        email,
        company,
        password,
      });

      // Log the response for debugging purposes
      console.log(response);

      // Check for errors in the response
      if (response.error) {
        setError("Invalid credentials");
        return;
      }

      // Redirect to the "/Home" page on successful login
      router.push("/Home");
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input fields for email, company, and password */}
        <input
          type="text"
          id="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          id="company"
          placeholder="Enter your company name"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Login button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Login
        </button>
        {/* Display error message if there's an issue */}
        {error && <div className="text-red-500">{error}</div>}
        {/* Link to registration page */}
        <p className="text-center">
          Don't have an account?{" "}
          <Link href="/Register" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

// Export the Login component
export default Login;
