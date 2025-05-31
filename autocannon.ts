
import autocannon = require("autocannon");
import { PassThrough } from "stream";

const outputStream = new PassThrough();
outputStream.pipe(process.stdout);

const instance = autocannon(
    {
        url: "https://krqkupyt.lexoyacloud.ir/users",
        duration: 5,
        connections: 1,
        headers: {
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoidGhpcyBpcyB5b3VyIGp3dCBwYXlsb2FkIiwiZXhwIjoxNzQ4NjgwNzI4fQ.VXpQJs6Wi9ipl9TbqJRyEO4qK19mcdnFJJhVy6o8Ss4"
        }
    },
    () => { }
);

autocannon.track(instance);
