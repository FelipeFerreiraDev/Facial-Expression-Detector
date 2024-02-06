import Bun from 'bun';
import db from "./src/db";
import { ExpressionPropsTimestamp, generateExcelData } from './src/functions';

const server = Bun.serve({
  hostname: "localhost",
  port: 3333,
  fetch: fetchHandler,
});


console.log(`Bun Todo running on ${server.hostname}:${server.port}`);

async function fetchHandler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  // Add a static file public to the server
  if (url.pathname === "/public") {
    return new Response(Bun.file("public/styles.css"));
  }

  if (url.pathname === "/face_expression_model-shard1") {
    return new Response(Bun.file("src/models/face_expression_model-shard1"));
  }

  if (url.pathname === "/face_expression_model-weights_manifest.json") {
    return new Response(Bun.file("src/models/face_expression_model-weights_manifest.json"));
  }

  if (url.pathname === "/tiny_face_detector_model-weights_manifest.json") {
    return new Response(Bun.file("src/models/tiny_face_detector_model-weights_manifest.json"));
  }

  if (url.pathname === "/tiny_face_detector_model-shard1") {
    return new Response(Bun.file("src/models/tiny_face_detector_model-shard1"));
  }

  if (url.pathname === "/public/js/face-api.js") {
    return new Response(Bun.file("dist/face-api.js"));
  }

  if (url.pathname === "/public/js/commons.js") {
    return new Response(Bun.file("public/js/commons.js"));
  }

  if (url.pathname === "/public/js/faceDetectionControls.js") {
    return new Response(Bun.file("public/js/faceDetectionControls.js"));
  }

  // if (url.pathname === "/public/js/jquery-2.1.1.min.map") {
  //   return new Response(Bun.file("public/js/jquery-2.1.1.min.map"));
  // }

  if (url.pathname === "/") {
    return new Response(Bun.file("src/index.html"));
  }

  if (url.pathname === "/register-expression") {
    const data = await request.json();
    let { expression } = data;

    const insertQuery = `INSERT INTO expressions (timestamp, neutral, happy, sad, angry, fearful, disgusted, surprised) VALUES 
    ${expression.map((data: ExpressionPropsTimestamp) => `(${data.timestamp}, ${data.neutral}, ${data.happy}, ${data.sad}, ${data.angry}, ${data.fearful}, ${data.disgusted}, ${data.surprised})`).join(', ')}`;

    db.run(insertQuery);

    return new Response("OK");
  }

  if (url.pathname === "/post-generate-infos") {
    generateExcelData();
    return new Response("OK");
  }

  return new Response("Not Found", { status: 404 });
}

db