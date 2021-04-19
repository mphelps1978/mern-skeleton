export default ({markup, css}) => {
  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charSet="utf-8">
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1 width=device-width, shrink-to-fit=no"
      >
        <title>MERN Skeleton</title>
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <style>
        a{
          text-decoration: none;
          color: #061d95
        }
      </style>
    </head>
    <body style="margin: 0">
      <div id="root">${markup}</div>
      <style id="jss-server-side">${css}</style>
      <script type="text/javascript" src="/dist/bundle.js"></script>
    </body>
  </html>`
}