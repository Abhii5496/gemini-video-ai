import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API,
});

export async function GET(req, { params }) {
  // console.log(params);
  const prediction = await replicate.predictions.get(params);
  console.log(prediction.json());
  if (prediction?.error) {
    // Response.error  500;
    Response.json({ detail: prediction.error, status: 500 });
    return;
  }

  console.log(prediction);
  Response.json({ ...prediction, status: 200 });
}
