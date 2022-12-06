package decodejp

import (
	"bytes"
	"log"
	"strings"

	"io/ioutil"

	"github.com/dop251/goja"
	"go.k6.io/k6/js/modules"
	"golang.org/x/text/encoding"
	"golang.org/x/text/encoding/japanese"
	"golang.org/x/text/transform"
)

func init() {
	modules.Register("k6/x/decodejp", new(DecodeJp))
}

type DecodeJp struct{}

func (*DecodeJp) Decode(buf goja.ArrayBuffer, encode string) string {
	_encode := strings.ToLower(encode)
	if _encode == "utf-8" || _encode == "utf8" {
		return string(buf.Bytes())
	} else {
		var enc encoding.Encoding
		switch _encode {
		case "shiftjis":
			enc = japanese.ShiftJIS
		case "shift-jis":
			enc = japanese.ShiftJIS
		case "shift_jis":
			enc = japanese.ShiftJIS
		case "sjis":
			enc = japanese.ShiftJIS
		case "eucjp":
			enc = japanese.EUCJP
		case "euc-jp":
			enc = japanese.EUCJP
		case "iso2022jp":
			enc = japanese.ISO2022JP
		case "iso-2022-jp":
			enc = japanese.ISO2022JP
		default:
			log.Panicf("Unknown encode %s", encode)
		}

		r := bytes.NewBuffer(buf.Bytes())
		resultBuf, err := ioutil.ReadAll(transform.NewReader(r, enc.NewDecoder()))
		if err != nil {
			log.Panic(err.Error())
		}
		return string(resultBuf)
	}
}
