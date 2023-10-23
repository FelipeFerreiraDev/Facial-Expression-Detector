// import { renderToString } from "react-dom/server";

const server = Bun.serve({
  hostname: "localhost",
  port: 3333,
  fetch: fetchHandler,
});


console.log(`Bun Todo running on ${server.hostname}:${server.port}`);

async function fetchHandler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  // Add a static file public to the server
  if (url.pathname === "" || url.pathname === "/public") {
    return new Response(Bun.file("public/styles.css"));
  }

  if (url.pathname === "" || url.pathname === "/face_expression_model-shard1") {
    return new Response(Bun.file("src/models/face_expression_model-shard1"));
  }

  if (url.pathname === "" || url.pathname === "/face_expression_model-weights_manifest.json") {
    return new Response(Bun.file("src/models/face_expression_model-weights_manifest.json"));
  }

  if (url.pathname === "" || url.pathname === "/tiny_face_detector_model-weights_manifest.json") {
    return new Response(Bun.file("src/models/tiny_face_detector_model-weights_manifest.json"));
  }

  if (url.pathname === "" || url.pathname === "/tiny_face_detector_model-shard1") {
    return new Response(Bun.file("src/models/tiny_face_detector_model-shard1"));
  }

  if (url.pathname === "" || url.pathname === "/public/js/face-api.js") {
    return new Response(Bun.file("dist/face-api.js"));
  }

  if (url.pathname === "" || url.pathname === "/public/js/commons.js") {
    return new Response(Bun.file("public/js/commons.js"));
  }

  if (url.pathname === "" || url.pathname === "/public/js/faceDetectionControls.js") {
    return new Response(Bun.file("public/js/faceDetectionControls.js"));
  }

  if (url.pathname === "" || url.pathname === "/") {
    return new Response(Bun.file("src/index.html"));
  }

  return new Response("Not Found", { status: 404 });
}