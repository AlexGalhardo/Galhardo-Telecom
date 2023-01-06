import app from "./app.js"

app.listen(process.env.PORT || 3000, (error) => {
	if (error) throw new Error(error)
	console.log(`GALHARDO TELECOM running on url: http://localhost:${process.env.PORT}`)
});
