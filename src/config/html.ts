import serialize from 'serialize-javascript';
import AppState from '../client/types/appState';

export const html = (body: string, preloadedState: AppState) => `
    <!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <style>
        * { font-family: 'Roboto', sans-serif; }
        </style>
    </head>
    <body style="margin:0">
        <div id="root">${body}</div>
        <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
                /</g,
                '\\u003c'
            )}
        </script>
        <script src="/client/bundle.js" defer></script>
    </body>
    </html>
`;