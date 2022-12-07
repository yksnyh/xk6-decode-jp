# xk6-decode-jp

A [k6](https://github.com/grafana/k6) extension to decode binary data (ex. response data, file data) encoded in Japanese character code (Shift-JIS, EUC-JP and ISO-2022-JP).


## Build

Build using [xk6](https://github.com/grafana/xk6).

1. Install xk6
```
go install go.k6.io/xk6/cmd/xk6@latest
```

2. Build
```
xk6 build --with github.com/yksnyh/xk6-decode-jp@latest
```

### Example

```javascript
import http from "k6/http";
import decodejp from 'k6/x/decodejp';

export default function () {
    const url = 'http://xxx.yyyy.jp/';
    const res = http.get(url, { responseType: 'binary' });
    const resText = decodejp.decode(res.body, 'shift-jis');
}
```
