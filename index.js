var express = require('express');
var cors = require('cors');
require('dotenv').config();
var multer = require('multer');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// ===========================
// Multer setup for file upload
// ===========================
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ===========================
// POST/api/fileanalyse
// ===========================
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

// ===========================
// Start server
// ===========================
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
