import { check } from 'k6';
import http from "k6/http";
import decodejp from 'k6/x/decodejp';

export default function () {
    const url = 'http://abehiroshi.la.coocan.jp/';
    const res = http.get(url, { responseType: 'binary' });
    const resText = decodejp.decode(res.body, 'shift-jis');

    check(resText, {
        'title ok': r => {
            const m = (/<title>(.+)<\/title>/g).exec(r);
            if (!m) return false;
            return m[1] === '阿部寛のホームページ';
        }
    });
}