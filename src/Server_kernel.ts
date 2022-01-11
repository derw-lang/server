import * as http from "http";

export type Server = {
    routes: Route[];
    port: number;
};

export type Method = "GET" | "POST";

export type Route = {
    method: Method;
    url: string;
    fn: () => string;
};

export function serve(serverConfig: Server): void {
    const server = http.createServer((req, res) => {
        console.log(req.url, req.method);
        for (const route of serverConfig.routes) {
            if (route.url === req.url && route.method === req.method) {
                res.write(route.fn());
            }
        }
        res.end();
    });

    server.listen(serverConfig.port, () => {});
}
