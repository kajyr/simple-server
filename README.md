# kservez

A simple static http server and proxy

## Configuration

./bin/kservez --port=7000 public
./bin/kservez

### Example .kservezrc

```
{
    port: 5555,
    publicPath: "dist",
    "proxy": [
        {
            "protocol": "https:",
            "hostname": "jsonplaceholder.typicode.com",
            "prefix": "/todos"
        }
    ]
}
```
