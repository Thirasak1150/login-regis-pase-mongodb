const express = require('express');
const { ParseServer } = require('parse-server');
const cors = require('cors');

const app = express();

async function startServer() {
  try {
    const databaseUri = process.env.DATABASE_URI || 'mongodb://localhost:27017/myparseapp';
    const config = {
      databaseURI: databaseUri,
      appId: process.env.APP_ID || 'myapp123',
      masterKey: process.env.MASTER_KEY || 'masterkey123',
      serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',
      publicServerURL: process.env.SERVER_URL || 'http://localhost:1337/parse',
      allowInsecureHTTP: true,
      allowClientClassCreation: true,  // ปิด warning
      allowExpiredAuthDataToken: true,  // ปิด warning
      encodeParseObjectInCloudFunction: false,  // ปิด warning
    };

    const parseServer = new ParseServer(config);
    await parseServer.start();

    app.use(cors({ origin: 'http://localhost:3000', credentials: true }));  // เฉพาะ frontend
    app.use('/parse', parseServer.app);

    app.get('/', (req, res) => {
      res.send('Parse Server รันปกติ!');
    });

    const port = process.env.PORT || 1337;
    app.listen(port, () => {
      console.log(`Parse Server รันที่ http://localhost:${port}/parse`);
    });
  } catch (error) {
    console.error('Error starting Parse Server:', error);
    process.exit(1);
  }
}

startServer();