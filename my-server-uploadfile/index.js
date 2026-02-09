const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3001;

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
    abortOnLimit: true,
  })
);

app.use(express.static('public'));

app.use('/upload', express.static(__dirname + '/upload'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/upload', (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const image = req.files.image;
  const uploadPath = path.join(__dirname, 'upload', image.name);

  image.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Upload failed', error: err });
    }

    res.json({
      message: 'Upload successful',
      filename: image.name,
      url: `http://localhost:${port}/upload/${image.name}`,
    });
  });
});

app.listen(port, () => {
  console.log(`Upload server running at http://localhost:${port}`);
});
