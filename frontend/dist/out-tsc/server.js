// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
import { join } from 'path';
const app = express();
app.use(express.static(__dirname + '/dist/frontend'));
app.get('*', function (req, res) {
    res.sendFile(join(__dirname, 'dist', 'frontend', 'index.html'));
});
app.listen(process.env['PORT'] || 8080);
//# sourceMappingURL=server.js.map