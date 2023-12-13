"use client";

import { useSession } from "next-auth/react";
import EditTicketForm from "../../(components)/Editticket"
import { useRouter } from "next/navigation"; // Fix: use "next/router" instead of "next/navigation"

const getTicketById = async (id) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/Login");
    return null; // Fix: Return null to indicate that there is no session
  }

  try {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const TicketPage = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const EDITMODE = params.id !== "new"; // Fix: Change the condition for EDITMODE

  // Use the getTicketById function to fetch ticket data
  const updateTicketData = EDITMODE ? getTicketById(params.id) : { _id: "new" };

  if (!session) {
    // If there's no session, redirect to the login page
    router.push("/Login");
    return null; // Fix: Return null to prevent rendering the component
  }

  // Render the EditTicketForm component with the fetched ticket data
  return <EditTicketForm ticket={updateTicketData} />;
};

export default TicketPage;
