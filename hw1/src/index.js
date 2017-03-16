import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/task1', (req, res) => {
  const a = (req.query.a && parseFloat(req.query.a, 10)) || 0;
  const b = (req.query.b && parseFloat(req.query.b, 10)) || 0;

  const sum = a + b;
  res.send(sum.toString());
});

app.listen(3000, () => {
  global.console.log('listen 3000 port');
});
