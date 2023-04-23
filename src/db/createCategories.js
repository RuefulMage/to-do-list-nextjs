const {Client} = require('pg');

const CATEGORIES = [
    {
        name: 'Work'
    }, {
        name: 'Home'
    }, {
        name: 'Family'
    }, {
        name: 'Personal'
    }, {
        name: 'Critical'
    }
];

const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_POR
});

client.connect();

const insertCategories = async () => {
    try {
        for (let i = 0; i < CATEGORIES.length; i++) {
            const queryString = 'INSERT INTO categories(name) VALUES($1)';
            await client.query(queryString, [CATEGORIES[i].name]);
        }
    } catch (e) {
        console.error(e);
    } finally {
        console.info('All Data inserted');
        client.end();
    }
}

insertCategories();
