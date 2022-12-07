
import { check } from 'k6';
import decodejp from 'k6/x/decodejp';

const eucjpBin = open('./testfile/eucjp.txt', 'b');
const sjisBin = open('./testfile/sjis.txt', 'b');
const jisBin = open('./testfile/iso2022jp.txt', 'b');
const utf8Bin = open('./testfile/utf8.txt', 'b');

export default function () {
    const eucjpText = decodejp.decode(eucjpBin, 'eucjp');
    check(eucjpText, { 'decode ok': r => r === '文字コード「EUC-JP」で記載しています。' });

    const sjisText = decodejp.decode(sjisBin, 'sjis');
    check(sjisText, { 'decode ok': r => r === '文字コード「Shift-JIS」で記載しています。' });

    const jisText = decodejp.decode(jisBin, 'jis');
    check(jisText, { 'decode ok': r => r === '文字コード「ISO-2022-JP」で記載しています。' });

    const utf8Text = decodejp.decode(utf8Bin, 'utf8');
    check(utf8Text, { 'decode ok': r => r === '文字コード「UTF-8」で記載しています。' });
}