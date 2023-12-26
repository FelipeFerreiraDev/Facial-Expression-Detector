import ChartJsImage from 'chartjs-to-image';
import Bun from 'bun';
import db from "./src/db";
import { generateExcelData } from './src/functions';

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

  if (url.pathname === "" || url.pathname === "/register-expression") {
    const data = await request.json();
    const { expression } = data;

    const insertQuery = `INSERT INTO expressions (timestamp, neutral, happy, sad, angry, fearful, disgusted, surprised) VALUES 
    ${expression.map((data: any) => `(${data.timestamp}, ${data.neutral}, ${data.happy}, ${data.sad}, ${data.angry}, ${data.fearful}, ${data.disgusted}, ${data.surprised})`).join(', ')}`;

    db.run(insertQuery);

    return new Response("OK");
  }

  if (url.pathname === "" || url.pathname === "/post-generate-infos") {
    generateExcelData();
    return new Response("OK");
  }

  return new Response("Not Found", { status: 404 });
}

db


// // Função para converter e salvar o gráfico como imagem
// async function saveChartAsImage() {
//   const myChart = new ChartJsImage();
//   myChart.setConfig({
//     type: 'bar',
//     data: { labels: ['Hello world', 'Foo bar'], datasets: [{ label: 'Foo', data: [1, 2] }] },
//   });

//   myChart.toFile('mychart.png');


//   console.log('Gráfico salvo como imagem.');
// }

// await saveChartAsImage();



// import * as ExcelJS from 'exceljs';

// // Criar uma nova planilha
// const workbook = new ExcelJS.Workbook();
// const worksheet = workbook.addWorksheet('Dados');

// // Adicionar cabeçalho
// worksheet.addRow(['Nome', 'Idade', 'Cidade']);

// // Adicionar dados fictícios
// const data = [
//   { nome: 'João', idade: 25, cidade: 'São Paulo' },
//   { nome: 'Maria', idade: 30, cidade: 'Rio de Janeiro' },
//   { nome: 'Carlos', idade: 22, cidade: 'Belo Horizonte' },
// ];

// // Adicionar linhas com os dados fictícios
// data.forEach(person => {
//   worksheet.addRow([person.nome, person.idade, person.cidade]);
// });

// // Salvar a planilha
// workbook.xlsx.writeFile('planilha_exemplo.xlsx')
//   .then(() => {
//     console.log('Planilha criada com sucesso!');

//     // criarGrafico();
//   })
//   .catch(error => {
//     console.error('Erro ao criar a planilha:', error);
//   });
