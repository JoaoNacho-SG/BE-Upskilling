import http, { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

interface Request extends IncomingMessage {}
interface Response extends ServerResponse {}

const port = process.env.PORT || 3030;

// HELLO.HTML - SYNC
fs.writeFileSync(`${__dirname}/hello.html`, "<h1>Hello World</h1>"); // Create a file
fs.appendFileSync(`${__dirname}/hello.html`, "<br/><h2>How are you?</h2>"); // Append to a file

// GOODBYE.HTML - ASYNC
fs.writeFile(`${__dirname}/goodbye.html`, "<h1>Goodbye World</h1>", (err) => {
  if (err) {
    console.log(err);
  }
}); // Create a file - async
fs.writeFile(
  `${__dirname}/goodbye.html`,
  "<br/><h2>See you l8r, alig8r</h2>",
  { flag: "a" },
  (err) => {
    if (err) {
      console.log(err);
    }
  }
); // Append to a file - async

const server = http.createServer((req: Request, res: Response) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/") {
    try {
      const html = fs.readFileSync(`${__dirname}/index.html`); // Read a file
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
      const html = fs.readFileSync(`${__dirname}/hello.html`); // Read a file
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
      const html = fs.readFileSync(`${__dirname}/goodbye.html`); // Read a file
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

// DELETE FILES
// fs.unlinkSync(`${__dirname}/hello.html`); // Delete a file
// fs.unlink(`${__dirname}/goodbye.html`, (err) => {
//   if (err) {
//     console.log(err);
//   }
// }); // Delete files - async

server.listen(port, () => {
  console.log(`Mekie, check port number ${port}`);
});
