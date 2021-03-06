import { APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from '../shared/config';
import { isProd } from '../shared/util'

const renderApp = (appName) => (
    `<!doctype html>
    <html>
        <head>
            <title>${appName}</title>
            <link rel="stylesheet" href="${STATIC_PATH}/style/semantic.min.css">
        </head>
        <body>
            <div class="${APP_CONTAINER_CLASS}"></div>
            <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>
        </body>
    </html>
    `
);

export default renderApp;