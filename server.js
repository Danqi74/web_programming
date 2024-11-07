import express from 'express';
import cors from 'cors';
import treeRoutes from './routes/treeRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/trees', treeRoutes);

app.listen(port, () => {
    console.log(`Бек став чорним і паше немов в полі`);
});
