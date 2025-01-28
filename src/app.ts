import http, { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

interface Request extends IncomingMessage {}
interface Response extends ServerResponse {}

const port = process.env.PORT || 3030;

/* -------------------------------------------------------------------------- */
/*                            HELLO.HTML - SYNC                            */
/* -------------------------------------------------------------------------- */

/* ---------------------------- Create a file ---------------------------- */
fs.writeFileSync(`${__dirname}/hello.html`, "<h1>Hello World</h1>");
/* ---------------------------- Append to a file ---------------------------- */
fs.appendFileSync(`${__dirname}/hello.html`, "<br/><h2>How are you?</h2>");

/* -------------------------------------------------------------------------- */
/*                            GOODBYE.HTML - ASYNC                            */
/* -------------------------------------------------------------------------- */

/* -------------------------- Create a file - async ------------------------- */
fs.writeFile(`${__dirname}/goodbye.html`, "<h1>Goodbye World</h1>", (err) => {
  if (err) {
    console.log(err);
  }
});
/* ------------------------ Append to a file - async ------------------------ */
fs.writeFile(
  `${__dirname}/goodbye.html`,
  "<br/><h2>See you l8r, alig8r</h2>",
  { flag: "a" },
  (err) => {
    if (err) {
      console.log(err);
    }
  }
);

const server = http.createServer((req: Request, res: Response) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/") {
    try {
      const html = fs.readFileSync(`${__dirname}/index.html`);
      res.write(html);
      res.end();
    } catch (e) {
      res.statusCode = 404;
      res.write("404 Not Found");
      console.log(e);
      res.end();
    }
  } else if (req.url === "/hello") {
    try {
      const html = fs.readFileSync(`${__dirname}/hello.html`);
      res.write(html);
      res.end();
    } catch (e) {
      res.statusCode = 404;
      res.write("404 Not Found");
      console.log(e);
      res.end();
    }
  } else if (req.url === "/goodbye") {
    try {
      const html = fs.readFileSync(`${__dirname}/goodbye.html`);
      res.write(html);
      res.end();
    } catch (e) {
      res.statusCode = 404;
      res.write("404 Not Found");
      console.log(e);
      res.end();
    }
  } else {
    res.statusCode = 404;
    res.write("404 Not Found");
    res.end();
  }
});

/* -------------------------------------------------------------------------- */
/*                                DELETE FILES                                */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Delete a file ----------------------------- */
fs.unlinkSync(`${__dirname}/hello.html`);
/* -------------------------- Delete files - async -------------------------- */
fs.unlink(`${__dirname}/goodbye.html`, (err) => {
  if (err) {
    console.log(err);
  }
});

server.listen(port, () => {
  console.log(`Mekie, check port number ${port}`);
});
