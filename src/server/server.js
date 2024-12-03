const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 9000;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const VERY_SECRET_KEY = 'He he he 123';

app.use(cors());
app.use(express.json());

const path = require('path')
app.use('/static', express.static(path.join(__dirname,'public')))

let users = []
let meat = [
    {
        id: 1,
        name: "Данило Владика Гнип",
        age: 7,
        power: "Створення самоцвітів",
        price: 999,
        image: "Rarity.jpg",
        description: "Данило — це той, хто носить окуляри навіть на лобі, бо його погляд і так дорого коштує. Кожен камінь, який він створює, має власний паспорт і не підлягає поверненню. Його улюблений жарт — 'Мої самоцвіти блищать сильніше, ніж твоя лисина, дядьку!'"
    },
    {
        id: 2,
        name: "Макcum Смоляк",
        age: 8,
        power: "Суперсила",
        price: 120,
        image: "Applejack.jpg",
        description: "Макcum — це той, хто з легкістю відкриває банки, коли інші вже викликали МНС. Одного разу він випадково підняв трактор, бо подумав, що це його валіза. Він любить повторювати: 'Якщо ти впав, я підніму тебе, і твого друга, і його диван!'"
    },
    {
        id: 3,
        name: "Андріанчик втікач Поляков",
        age: 6,
        power: "Організація вечірок",
        price: 497,
        image: "PinkiePie.jpg",
        description: "Андріанчик — це та людина, яка за 5 хвилин може зробити з твоєї квартири караоке-бар. Він не бере плату за вечірки, але завжди залишає чек на очищення. Його девіз: 'Життя — це одна велика вечірка, просто не зливай усі кульки одразу!'"
    },
    {
        id: 4,
        name: "Максон-саксофон Гриньків",
        age: 5,
        power: "Дихання вогнем",
        price: 80,
        image: "Spike.jpg",
        description: "Максон-саксофон обожнює BBQ, але сусіди скаржаться, бо його 'гриль' працює надто голосно. Якось він спалив пиріг, бо чхнув на кухні. Він завжди каже: 'Я не п'ю каву гарячою — я сам її підігріваю.'"
    },
    {
        id: 5,
        name: "Назарко Скібицький АКА Кокосовий",
        age: 1000,
        power: "Маніпуляція снами",
        price: 300,
        image: "PrincessLuna.jpg",
        description: "Назарко кожного вечора нагадує людям: 'Будьте обережні зі своїми мріями, бо я можу зробити їх смішнішими!' Одного разу він змусив усіх у місті побачити сон про гігантський КОКОС. Його улюблене хобі — красти будильники."
    },
    {
        id: 6,
        name: "Вілен Вілен Соловей",
        age: 7,
        power: "Магія",
        price: 180,
        image: "TwilightSparkle.jpg",
        description: "Вілен не просто чарівник, він — фокусник на всі руки. У нього навіть чайник закипає від заклинання. Одного разу він сплутав заклинання, і у його хаті тиждень лежав літаючий хліб. Він завжди каже: 'Магія не вирішує всі проблеми, але дуже допомагає з посудом.'"
    },
    {
        id: 7,
        name: "Пабло Ескошуваро",
        age: 1000,
        power: "Підняття сонця",
        price: 320,
        image: "Celestia.jpg",
        description: "Пабло обожнює вставати о 5-й ранку, навіть якщо сонце протестує. Одного разу він підняв сонце занадто високо, і всі кури вирішили, що це вже літо. Його улюблена фраза: 'Сонце не чекає, але я завжди беру каву з собою.'"
    },
    {
        id: 8,
        name: "Юра хто ти воїн Ільчишин",
        age: 6,
        power: "Спілкування з тваринами",
        price: 110,
        image: "Fluttershy.jpg",
        description: "Юра може переконати навіть кота віддати свій стілець. Одного разу він домовився з голубом, щоб той приніс йому піцу. Його девіз: 'Якщо я скажу тварині сісти, вона сяде — навіть якщо це лев.'"
    },
    {
        id: 9,
        name: "Ігор аля куратор Козенков",
        age: 6,
        power: "Супершвидкість",
        price: 140,
        image: "RainbowDash.jpg",
        description: "Ігор настільки швидкий, що міг би доставити піцу ще до твого дзвінка. Він каже: 'Швидкість — це не лише про ноги, а й про те, як швидко ти можеш ухилитися від роботи!'"
    }
]

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields must be filled' });
    }

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ message: 'User with this email not defined' });
    }

    console.log(`${email} is trying to sign in`);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email
        },
        VERY_SECRET_KEY,
        { expiresIn: '24h' }
    );

    console.log(`Token for user ${email}: ${token}`);

    res.json({
        message: 'You signed in',
        token,
        user: {
            username: user.username,
            email: user.email
        }
    });
});

app.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields must be filled' });
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User with this email not defined' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { username, password: hashedPassword, email };
    users.push(newUser);

    res.status(201).json({
        message: 'User successfully registered',
        user: { username, email },
    });
});

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token undefined' });

    jwt.verify(token, VERY_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Incorrect token' });
        }
        req.user = user;
        next();
    });
};

app.get('/api/protected', authenticateToken, (req, res) => {
    console.log("Access is allowed", req.user.userId);
    res.json({ message: "You can't do this before login. Login first." });
});

app.get('/api/meat', (req, res) => {
    const { search, sort, filter } = req.query;

    let filteredMeat = meat;

    // Apply search filter
    if (search) {
        const searchLower = search.trim().toLowerCase();
        filteredMeat = filteredMeat.filter(item =>
        item.name.toLowerCase().includes(searchLower)
        );
    }

    // Apply category filter
    if (filter) {
        filteredMeat = filteredMeat.filter(item => {
            let matchesFilter;
            switch (filter){
                case 'price_low':
                    matchesFilter = item.price < 150 ? true : false;
                    break;
                case 'price_high':
                    matchesFilter = item.price >= 150 ? true : false;
                    break;
                case 'age_high':
                    matchesFilter = item.age >= 100 ? true : false;
                    break;
                case 'age_low':
                    matchesFilter = item.age < 100 ? true : false;
                    break;
                default: matchesFilter = true;
            }
            return matchesFilter
        });
    }

    switch (sort) {
        case "age":
            filteredMeat.sort((a, b) => b.age - a.age);
            break;
        case "price_asc":
            filteredMeat.sort((a, b) => a.price - b.price);
            break;
        case "price_desc":
            filteredMeat.sort((a, b) => b.price - a.price);
            break;
        default:
    }

    res.json(filteredMeat);
});

app.get('/api/meat/:id', (req, res) => {
    const { id } = req.params;
    const pony = meat.find(p => p.id === parseInt(id));

    if (!pony) {
        return res.status(404).json({ message: 'Item not found' });
    }

    res.json(pony);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});