module.exports = ({ name, dateDay, dateTime, id }) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Email Template</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
        }
        table {
          width: 100%;
          max-width: 600px; /* Adjust as needed */
          margin: 0 auto;
          border-collapse: collapse;
        }
        th,
        td {
          padding: 30px;
          border: 1px solid #ddd;
          text-align: center;
        }
        img {
          display: block;
          margin: 0 auto;
          width: 200px;
          height: 200px;
        }
        .small-text {
          font-size: 12px;
          color: #999;
        }
      </style>
    </head>
    <body>
      <table>
        <tr>
          <td colspan="2">
            <img
              src="https://play-lh.googleusercontent.com/PQdy4K3t4HsVhV1OE6fBxAtQdQrkz9YGldOHzl5EoaUEZfVYtULGYjL4N3d7Car1Aag"
              alt="Logo"
            />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <p>
              Olá, ${name}, estamos confirmando sua consulta dia ${dateDay} às ${dateTime}.
            </p>
            <p class="small-text">
              Em caso de desistência, cancele seu agendamento diretamente na nossa
              API, utilizando o ID ${id}.
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
