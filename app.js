import 'express-async-errors'
import dotenv from 'dotenv'; dotenv.config();
import express from 'express'
import mustache from 'mustache-express'
import bodyParser from 'body-parser'
import session from 'express-session'
import flash from 'connect-flash'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { dirname } from 'path'
import { fileURLToPath } from 'url';

global.SESSION_USER = null;
global.__dirname = dirname(fileURLToPath(import.meta.url));
global.APP_ROOT_PATH = __dirname

const app = express()

// CSRF
app.use(cookieParser())

app.use(
	helmet({
		contentSecurityPolicy: false,
	})
);

app.use(compression())

// http://localhost:3000/status
import expressStatusMonitor from 'express-status-monitor'
app.use(expressStatusMonitor());

app.use(cors())

app.use(session({
	name: 'session',
	secret: `${process.env.SESSION_SECRET}`,
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 3600 * 1000, // 1hr
	}
}));

app.use(flash());

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json());

app.set('view engine', 'mustache');
app.set('views', `${__dirname}/views`);
app.engine('mustache', mustache());

app.use(express.static(`${__dirname}/public`));

import { publicRoutes } from './routes/public_routes.js'
import { profileRoutes } from './routes/profile_routes.js'
import { adminRoutes } from './routes/admin_routes.js'

app.use('/profile', profileRoutes);
app.use('/admin', adminRoutes);
app.use(publicRoutes);

// ERROR 404
app.use((req, res) => {
	return res.render('pages/404', {
		user: SESSION_USER
	});
});

// HANDLING SERVER ERRORS
app.use((err, req, res, next) => {
	res.status(500); // INTERNAL SERVER ERROR

	if (err.code === 'EBADCSRFTOKEN') return res.json({ error: "Invalid CSRF Token!" })

	console.log(err)

	return res.json({
		name: err.name,
		message: err.message
	})
});

export default app;
