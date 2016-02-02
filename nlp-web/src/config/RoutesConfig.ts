import {Express} from 'express';

export default function RouteConfig(app: Express) {
    app.use("/es", require("../routes/ES"));
}