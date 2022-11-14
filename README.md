# kservez

[![test](https://github.com/kajyr/kservez/actions/workflows/test.yml/badge.svg)](https://github.com/kajyr/kservez/actions/workflows/test.yml)

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

### Configuration options:

- `ssl` - [boolean]: toggles http/https with a self signed certificate
