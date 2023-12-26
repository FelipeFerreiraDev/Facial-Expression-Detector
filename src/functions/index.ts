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
  const data: any = db.query("SELECT * FROM expressions;").all();
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
  
  // Salvar a planilha
  workbook.xlsx.writeFile('planilha_emotions.xlsx')
    .then(() => {
      console.log('Planilha criada com sucesso!');
  
      // criarGrafico();
    })
    .catch(error => {
      console.error('Erro ao criar a planilha:', error);
    });
  
}


export function generateGraphicsDataColumn() {
    const myChart = new ChartJsImage();
    myChart.setConfig({
      type: 'bar',
      data: { labels: ['Hello world', 'Foo bar'], datasets: [{ label: 'Foo', data: [1, 2] }] },
    });
  
    myChart.toFile('mychart.png');
  
  
    console.log('Gráfico salvo como imagem.');  

    return myChart.getShortUrl();
}