const config = require('./config');
const app =  require('./app');
const {PORT} = config;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});