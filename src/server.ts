import app from './app';

app.listen(app.get('port'), () => {
    console.log(`Listening to ${app.get('port')}`);
});