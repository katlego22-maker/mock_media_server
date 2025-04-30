const http = require("http");

let movies = [
  { id: 1, title: "Inception", director: "Christopher Nolan" },
  { id: 2, title: "Black Panther", director: "Ryan Coogler" }
];

let series = [
  { id: 1, title: "Stranger Things", seasons: 4 },
  { id: 2, title: "Breaking Bad", seasons: 5 }
];

let songs = [
  { id: 1, title: "Shape of You", artist: "Ed Sheeran" },
  { id: 2, title: "Blinding Lights", artist: "The Weeknd" }
];

// Helper function to read request body
const getBody = (req, callback) => {
  let body = "";
  req.on("data", chunk => {
    body += chunk.toString();
  });
  req.on("end", () => {
    callback(JSON.parse(body));
  });
};

// Create HTTP server
const server = http.createServer((req, res) => {
  const { url, method } = req;
  res.setHeader("Content-Type", "application/json");

  // Movies Endpoint
  if (url === "/movies") {
    if (method === "GET") res.end(JSON.stringify(movies));
    else if (method === "POST") {
      getBody(req, data => {
        movies.push(data);
        res.end(JSON.stringify(movies));
      });
    } else if (method === "PUT") {
      getBody(req, data => {
        const index = movies.findIndex(m => m.id === data.id);
        if (index !== -1) movies[index] = { ...movies[index], ...data };
        res.end(JSON.stringify(movies));
      });
    } else if (method === "DELETE") {
      getBody(req, data => {
        movies = movies.filter(m => m.id !== data.id);
        res.end(JSON.stringify(movies));
      });
    }
  }

  // Series Endpoint
  else if (url === "/series") {
    if (method === "GET") res.end(JSON.stringify(series));
    else if (method === "POST") {
      getBody(req, data => {
        series.push(data);
        res.end(JSON.stringify(series));
      });
    } else if (method === "PUT") {
      getBody(req, data => {
        const index = series.findIndex(s => s.id === data.id);
        if (index !== -1) series[index] = { ...series[index], ...data };
        res.end(JSON.stringify(series));
      });
    } else if (method === "DELETE") {
      getBody(req, data => {
        series = series.filter(s => s.id !== data.id);
        res.end(JSON.stringify(series));
      });
    }
  }

  // Songs Endpoint
  else if (url === "/songs") {
    if (method === "GET") res.end(JSON.stringify(songs));
    else if (method === "POST") {
      getBody(req, data => {
        songs.push(data);
        res.end(JSON.stringify(songs));
      });
    } else if (method === "PUT") {
      getBody(req, data => {
        const index = songs.findIndex(s => s.id === data.id);
        if (index !== -1) songs[index] = { ...songs[index], ...data };
        res.end(JSON.stringify(songs));
      });
    } else if (method === "DELETE") {
      getBody(req, data => {
        songs = songs.filter(s => s.id !== data.id);
        res.end(JSON.stringify(songs));
      });
    }
  }

  // Invalid route
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

// Listen on port 3001
server.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});
