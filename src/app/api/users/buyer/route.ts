import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const response = {
    status: 500,
    message: "Internal Server Error",
    data: null as any,
  };

  try {
    // Parse the form data
    const formData = await req.formData();

    const formValues: { [key: string]: any } = {};

    // Convert FormData into a JSON-like object for easier access
    formData.forEach((value, key) => {
      formValues[key] = value;
    });

    console.log(`SERVER GOT DATA FROM USER`);
    console.log(formValues);
    console.log(`------`);

    response.status = 200;
    response.message = "Success";
    response.data = formValues; // returning the form data for confirmation
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error: any) {
    console.log("[SERVER ERROR]: " + error.message);
    response.status = 500;
    response.message = error.message;
    response.data = null;
    return new Response(JSON.stringify(response), { status: 500 });
  }
}
