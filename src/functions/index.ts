import * as ExcelJS from 'exceljs';
import db from '../db';
import ChartJsImage from 'chartjs-to-image';

interface ExpressionProps {
    neutral: number,
    happy: number,
    sad: number,
    angry: number,
    fearful: number,
    disgusted: number,
    surprised: number
}

interface ExpressionPropsTimestamp {
    timestamp: number,
    neutral: number,
    happy: number,
    sad: number,
    angry: number,
    fearful: number,
    disgusted: number,
    surprised: number
}

export function formatedData(data: ExpressionProps[]) {
    return data.map((item) => {
        return {
            neutral: item.neutral.toFixed(5),
            happy: item.happy.toFixed(5),
            sad: item.sad.toFixed(5),
            angry: item.angry.toFixed(5),
            fearful: item.fearful.toFixed(5),
            disgusted: item.disgusted.toFixed(5),
            surprised: item.surprised.toFixed(5)
        }
    })
}

export function generateExcelData() {
  // Criar uma nova planilha
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Dados');
  const graphics = workbook.addWorksheet('Gráficos');
  
  // Adicionar cabeçalho
  worksheet.addRow(['Time', 'Neutral', 'Happy', 'Sad', 'Angry', 'Fearful', 'Disgusted', 'Surprised']);
  
  // Adicionar dados fictícios
  const data: ExpressionPropsTimestamp[] = (db.query("SELECT * FROM expressions;").all() as ExpressionPropsTimestamp[]);

  // Adicionar linhas com os dados fictícios
  data.forEach((lines: any) => {
    worksheet.addRow([
      lines.timestamp,
      lines.neutral,
      lines.happy,
      lines.sad,
      lines.angry,
      lines.fearful,
      lines.disgusted,
      lines.surprised
    ]);
  });
  
  // Gerar gráfico
  generateCompressedGraphicsDataColumn(data);

  // Adicionar gráfico em graphics
  graphics.addImage(workbook.addImage({
    filename: 'compressedChart.png',
    extension: 'png',
  }), 'A1:J20');
  
  // Salvar a planilha
  workbook.xlsx.writeFile('planilha_emotions.xlsx')
    .then(() => {
      console.log('Planilha criada com sucesso!');
    })
    .catch(error => {
      console.error('Erro ao criar a planilha:', error);
    });
}

export async function generateCompressedGraphicsDataColumn(data: ExpressionPropsTimestamp[]) {
  const maxDataPoints = 1;
  const compressionFactor = Math.ceil(data.length / maxDataPoints);

  const compressedData: ExpressionPropsTimestamp[] = [];
  
  for (let i = 0; i < data.length; i += compressionFactor) {
    const endIndex = Math.min(i + compressionFactor, data.length);
    const subset = data.slice(i, endIndex);

    // Calcula a média para cada propriedade
    const averagedEntry: ExpressionPropsTimestamp = {
      timestamp: subset.reduce((sum, entry) => sum + entry.timestamp, 0) / subset.length,
      neutral: subset.reduce((sum, entry) => sum + entry.neutral, 0) / subset.length,
      happy: subset.reduce((sum, entry) => sum + entry.happy, 0) / subset.length,
      sad: subset.reduce((sum, entry) => sum + entry.sad, 0) / subset.length,
      angry: subset.reduce((sum, entry) => sum + entry.angry, 0) / subset.length,
      fearful: subset.reduce((sum, entry) => sum + entry.fearful, 0) / subset.length,
      disgusted: subset.reduce((sum, entry) => sum + entry.disgusted, 0) / subset.length,
      surprised: subset.reduce((sum, entry) => sum + entry.surprised, 0) / subset.length,
    };

    compressedData.push(averagedEntry);
  }

  console.log('Dados compactados:', compressedData);

  // Cria o gráfico usando os dados compactados
  const labels = ['Dados durante todo o teste compactados'];
  const datasets = [
    { label: 'Neutral', data: compressedData.map(entry => entry.neutral) },
    { label: 'Happy', data: compressedData.map(entry => entry.happy) },
    { label: 'Sad', data: compressedData.map(entry => entry.sad) },
    { label: 'Angry', data: compressedData.map(entry => entry.angry) },
    { label: 'Fearful', data: compressedData.map(entry => entry.fearful) },
    { label: 'Disgusted', data: compressedData.map(entry => entry.disgusted) },
    { label: 'Surprised', data: compressedData.map(entry => entry.surprised) },
  ];

  const myChart = new ChartJsImage();
  myChart.setConfig({
    type: 'bar',
    data: { labels, datasets },
  });

  // Salva o gráfico como imagem
  myChart.toFile('compressedChart.png');
  console.log('Gráfico salvo como imagem.');
  const url = await myChart.getShortUrl();
  console.log('Gráfico salvo como imagem em:', url);
}


// export async function generateGraphicsDataColumn(data: ExpressionPropsTimestamp[]) {
//   const myChart = new ChartJsImage();
//   myChart.setConfig({
//     type: 'bar',
//     data: { labels: ['Hello world', 'Foo bar'], datasets: [{ label: 'Foo', data: [1, 2] }] },
//   });

//   myChart.toFile('mychart.png');


//   console.log('Gráfico salvo como imagem.');  
//   const url = await myChart.getShortUrl();
//   console.log('Gráfico salvo como imagem em:', url);
// }