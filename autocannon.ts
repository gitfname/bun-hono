
import autocannon = require("autocannon");
import { PassThrough } from "stream";

const outputStream = new PassThrough();
outputStream.pipe(process.stdout);

const instance = autocannon(
    {
        url: "https://krqkupyt.lexoyacloud.ir/users",
        duration: 20,
        connections: 30,
        headers: {
            authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoidGhpcyBpcyB5b3VyIGp3dCBwYXlsb2FkIiwiZXhwIjoxNzQ4Njc4MzI0fQ.ROnEwVRjUdnWloGVtwplvwJyHBMtkbCWs_nrsDRO-_I"
        }
    },
    () => { }
);

autocannon.track(instance);
