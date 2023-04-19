const http
    = require('http');
const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = createProxyMiddleware({
    target: 'https://968482c3-2682-41c4-aaae-3593687a9bdc.mock.pstmn.io',
    changeOrigin: true,
});

const server = http.createServer((req, res) => {
    proxy(req, res);
});

beforeAll(() => {
    server.listen(8888);
});

afterAll(() => {
    proxy.close()
    server.close();

});
