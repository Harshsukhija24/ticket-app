// api/userExist.js

import { connectDb } from "@/app/lib/mongodb";
import User from "../../(models)/User"
import { NextResponse } from "next/server";

export async function Post(req) {
  try {
    await connectDb();
    const { email } = await req.json();

    // Assuming User model has a method to find a user by email
    const user = await User.findOne({ email });

    if (user) {
      return new NextResponse({
        status: 200,
        json: { user },
      });
    } else {
      return new NextResponse({
        status: 200,
        json: { user: null },
      });
    }
  } catch (error) {
    console.error("Error checking user existence:", error); // Log the specific error message
    return new NextResponse({
      status: 500,
      json: { error: "Internal Server Error" },
    });
  }
}