//server-side js to get files in specific directory (substitute of back-end code)
//(created with mjs format since the code is recommended to be written with ES module)

import express from 'express';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const filePath = fileURLToPath(import.meta.url); //the whole file path
const directory = dirname(filePath); //directory of the file (which is the path which does not include that file name)
const app = express(); //create express obj

//Serve static files from the current directory (important for first run)
app.use(express.static(path.join(directory)));

//to display html page when the file is run
app.get('/', (req, res) => {
   res.sendFile(path.join(directory, 'gallery.html'));
});

//defining port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});

//to send files to client-side js
const sourcePath = path.join(directory, 'images');
app.get('/api/data', (req, res) => {
   fs.readdir(sourcePath, (err, files) => {
      if (err) {
          reject(err);
          return;
      }
      res.send(JSON.stringify(files));
  })
 });

