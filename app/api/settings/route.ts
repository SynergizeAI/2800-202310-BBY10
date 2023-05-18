/**
 * @file This file contains the POST function, which is used to update the user's name and image.
 */

import { NextResponse } from "next/server";
import getCurrentUser from "@/app/_actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

/**
 * The POST function handles the process of updating the user's name and image.
 *
 * @async
 * @param {Request} request - The request object.
 * @returns {Promise<NextResponse>} The NextResponse with the updated user or an error message.
 */
export async function POST(request: Request) {
  try {
    // Get the current user and request body
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { name, image } = body;

    // If the user is not authenticated, return an unauthorized response
    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Update the user in the database
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image: image,
        name: name,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error, 'ERROR_MESSAGES');
    return new NextResponse('Error', { status: 500 });
  }
}
