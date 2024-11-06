import express from 'express';
import { DishValidator } from '../../Validators/DishValidator';
import { PrismaClient } from '@prisma/client';
export const dishRouter = express.Router();
const prisma = new PrismaClient();
dishRouter.get('/all-dishes', (req, res) => {
    res.send('Dishes');
});

dishRouter.post('/add-dish', async (req, res) => {
    const bodyParser = DishValidator.safeParse(req.body);
    if (!bodyParser.success) {
        res.status(400).json({ error: bodyParser.error });
        return;
    }
    const { title, price, description, category, image } = bodyParser.data;
    try {
        await prisma.dish.create({
            data: {
                title,
                price,
                description,
                category,
                image
            }
        });

    } catch (error) {
        res.status(400).json({ error });
        return;
    }
      res.status(200).json({ message: 'Dish added successfully' });
});

dishRouter.get('/get-all-dishes', async (req, res) => {
    const dishes = await prisma.dish.findMany();
    res.status(200).json(dishes);
});