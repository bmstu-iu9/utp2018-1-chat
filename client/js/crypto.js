let Crypto = (function () {
    let crypto = {};

    crypto.sha512hex = function (str) {
        return _rstrToHex(_sha512(crypto.strToRstr(str)));
    }

    crypto.rstrToBin = function (rstr) {
        let out = Array(rstr.length >> 2);
        for (let i = 0; i < out.length; i++) {
            out[i] = 0;
        }

        for (let i = 0; i < rstr.length * 8; i += 8) {
            out[i >> 5] |= (rstr.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
        }

        return out;
    }

    function _sha512(rstr) {
        return _binToRstr(_sha512FromBin(crypto.rstrToBin(rstr), rstr.length * 8));
    }

    function _rstrToHex(rstr) {
        const hexAlphabet = '0123456789abcdef';

        let x;
        let out = '';

        for (let i = 0; i < rstr.length; i++) {
            x = rstr.charCodeAt(i);
            out += hexAlphabet.charAt((x >>> 4) & 0x0F) +
                hexAlphabet.charAt(x & 0x0F);
        }

        return out;
    }

    crypto.strToRstr = function (str) {
        let out = '';
        let i = -1;
        let x, y;

        while (++i < str.length) {
            x = str.charCodeAt(i);
            y = i + 1 < str.length ? str.charCodeAt(i + 1) : 0;
            if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                i++;
            }

            if (x <= 0x7F) {
                out += String.fromCharCode(x);
            } else if (x <= 0x7FF) {
                out += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F),
                    0x80 | (x & 0x3F));
            } else if (x <= 0xFFFF) {
                out += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                    0x80 | ((x >>> 6) & 0x3F),
                    0x80 | (x & 0x3F));
            } else if (x <= 0x1FFFFF) {
                out += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                    0x80 | ((x >>> 12) & 0x3F),
                    0x80 | ((x >>> 6) & 0x3F),
                    0x80 | (x & 0x3F));
            }
        }

        return out;
    }

    function _binToRstr(bin) {
        let out = '';
        for (let i = 0; i < bin.length * 32; i += 8) {
            out += String.fromCharCode((bin[i >> 5] >>> (24 - i % 32)) & 0xFF);
        }

        return out;
    }

    let sha512_k;

    function _sha512FromBin(x, len) {
        if (sha512_k == undefined) {
            sha512_k = new Array(
                new _int64(0x428a2f98, -685199838), new _int64(0x71374491, 0x23ef65cd),
                new _int64(-1245643825, -330482897), new _int64(-373957723, -2121671748),
                new _int64(0x3956c25b, -213338824), new _int64(0x59f111f1, -1241133031),
                new _int64(-1841331548, -1357295717), new _int64(-1424204075, -630357736),
                new _int64(-670586216, -1560083902), new _int64(0x12835b01, 0x45706fbe),
                new _int64(0x243185be, 0x4ee4b28c), new _int64(0x550c7dc3, -704662302),
                new _int64(0x72be5d74, -226784913), new _int64(-2132889090, 0x3b1696b1),
                new _int64(-1680079193, 0x25c71235), new _int64(-1046744716, -815192428),
                new _int64(-459576895, -1628353838), new _int64(-272742522, 0x384f25e3),
                new _int64(0xfc19dc6, -1953704523), new _int64(0x240ca1cc, 0x77ac9c65),
                new _int64(0x2de92c6f, 0x592b0275), new _int64(0x4a7484aa, 0x6ea6e483),
                new _int64(0x5cb0a9dc, -1119749164), new _int64(0x76f988da, -2096016459),
                new _int64(-1740746414, -295247957), new _int64(-1473132947, 0x2db43210),
                new _int64(-1341970488, -1728372417), new _int64(-1084653625, -1091629340),
                new _int64(-958395405, 0x3da88fc2), new _int64(-710438585, -1828018395),
                new _int64(0x6ca6351, -536640913), new _int64(0x14292967, 0xa0e6e70),
                new _int64(0x27b70a85, 0x46d22ffc), new _int64(0x2e1b2138, 0x5c26c926),
                new _int64(0x4d2c6dfc, 0x5ac42aed), new _int64(0x53380d13, -1651133473),
                new _int64(0x650a7354, -1951439906), new _int64(0x766a0abb, 0x3c77b2a8),
                new _int64(-2117940946, 0x47edaee6), new _int64(-1838011259, 0x1482353b),
                new _int64(-1564481375, 0x4cf10364), new _int64(-1474664885, -1136513023),
                new _int64(-1035236496, -789014639), new _int64(-949202525, 0x654be30),
                new _int64(-778901479, -688958952), new _int64(-694614492, 0x5565a910),
                new _int64(-200395387, 0x5771202a), new _int64(0x106aa070, 0x32bbd1b8),
                new _int64(0x19a4c116, -1194143544), new _int64(0x1e376c08, 0x5141ab53),
                new _int64(0x2748774c, -544281703), new _int64(0x34b0bcb5, -509917016),
                new _int64(0x391c0cb3, -976659869), new _int64(0x4ed8aa4a, -482243893),
                new _int64(0x5b9cca4f, 0x7763e373), new _int64(0x682e6ff3, -692930397),
                new _int64(0x748f82ee, 0x5defb2fc), new _int64(0x78a5636f, 0x43172f60),
                new _int64(-2067236844, -1578062990), new _int64(-1933114872, 0x1a6439ec),
                new _int64(-1866530822, 0x23631e28), new _int64(-1538233109, -561857047),
                new _int64(-1090935817, -1295615723), new _int64(-965641998, -479046869),
                new _int64(-903397682, -366583396), new _int64(-779700025, 0x21c0c207),
                new _int64(-354779690, -840897762), new _int64(-176337025, -294727304),
                new _int64(0x6f067aa, 0x72176fba), new _int64(0xa637dc5, -1563912026),
                new _int64(0x113f9804, -1090974290), new _int64(0x1b710b35, 0x131c471b),
                new _int64(0x28db77f5, 0x23047d84), new _int64(0x32caab7b, 0x40c72493),
                new _int64(0x3c9ebe0a, 0x15c9bebc), new _int64(0x431d67c4, -1676669620),
                new _int64(0x4cc5d4be, -885112138), new _int64(0x597f299c, -60457430),
                new _int64(0x5fcb6fab, 0x3ad6faec), new _int64(0x6c44198c, 0x4a475817));
        }

        let H = new Array(
            new _int64(0x6a09e667, -205731576),
            new _int64(-1150833019, -2067093701),
            new _int64(0x3c6ef372, -23791573),
            new _int64(-1521486534, 0x5f1d36f1),
            new _int64(0x510e527f, -1377402159),
            new _int64(-1694144372, 0x2b3e6c1f),
            new _int64(0x1f83d9ab, -79577749),
            new _int64(0x5be0cd19, 0x137e2179));

        let T1 = new _int64(0, 0),
            T2 = new _int64(0, 0),
            a = new _int64(0, 0),
            b = new _int64(0, 0),
            c = new _int64(0, 0),
            d = new _int64(0, 0),
            e = new _int64(0, 0),
            f = new _int64(0, 0),
            g = new _int64(0, 0),
            h = new _int64(0, 0),

            s0 = new _int64(0, 0),
            s1 = new _int64(0, 0),
            Ch = new _int64(0, 0),
            Maj = new _int64(0, 0),
            r1 = new _int64(0, 0),
            r2 = new _int64(0, 0),
            r3 = new _int64(0, 0);

        let j, i;

        let W = new Array(80);

        for (i = 0; i < 80; i++) {
            W[i] = new _int64(0, 0);
        }

        x[len >> 5] |= 0x80 << (24 - (len & 0x1f));
        x[((len + 128 >> 10) << 5) + 31] = len;

        for (i = 0; i < x.length; i += 32) {
            _int64copy(a, H[0]);
            _int64copy(b, H[1]);
            _int64copy(c, H[2]);
            _int64copy(d, H[3]);
            _int64copy(e, H[4]);
            _int64copy(f, H[5]);
            _int64copy(g, H[6]);
            _int64copy(h, H[7]);

            for (j = 0; j < 16; j++) {
                W[j].h = x[i + 2 * j];
                W[j].l = x[i + 2 * j + 1];
            }

            for (j = 16; j < 80; j++) {
                _int64rrot(r1, W[j - 2], 19);
                _int64revrrot(r2, W[j - 2], 29);
                _int64shr(r3, W[j - 2], 6);
                s1.l = r1.l ^ r2.l ^ r3.l;
                s1.h = r1.h ^ r2.h ^ r3.h;

                _int64rrot(r1, W[j - 15], 1);
                _int64rrot(r2, W[j - 15], 8);
                _int64shr(r3, W[j - 15], 7);
                s0.l = r1.l ^ r2.l ^ r3.l;
                s0.h = r1.h ^ r2.h ^ r3.h;

                _int64add4(W[j], s1, W[j - 7], s0, W[j - 16]);
            }

            for (j = 0; j < 80; j++) {
                Ch.l = (e.l & f.l) ^ (~e.l & g.l);
                Ch.h = (e.h & f.h) ^ (~e.h & g.h);

                _int64rrot(r1, e, 14);
                _int64rrot(r2, e, 18);
                _int64revrrot(r3, e, 9);
                s1.l = r1.l ^ r2.l ^ r3.l;
                s1.h = r1.h ^ r2.h ^ r3.h;

                _int64rrot(r1, a, 28);
                _int64revrrot(r2, a, 2);
                _int64revrrot(r3, a, 7);
                s0.l = r1.l ^ r2.l ^ r3.l;
                s0.h = r1.h ^ r2.h ^ r3.h;

                Maj.l = (a.l & b.l) ^ (a.l & c.l) ^ (b.l & c.l);
                Maj.h = (a.h & b.h) ^ (a.h & c.h) ^ (b.h & c.h);

                _int64add5(T1, h, s1, Ch, sha512_k[j], W[j]);
                _int64add(T2, s0, Maj);

                _int64copy(h, g);
                _int64copy(g, f);
                _int64copy(f, e);
                _int64add(e, d, T1);
                _int64copy(d, c);
                _int64copy(c, b);
                _int64copy(b, a);
                _int64add(a, T1, T2);
            }

            _int64add(H[0], H[0], a);
            _int64add(H[1], H[1], b);
            _int64add(H[2], H[2], c);
            _int64add(H[3], H[3], d);
            _int64add(H[4], H[4], e);
            _int64add(H[5], H[5], f);
            _int64add(H[6], H[6], g);
            _int64add(H[7], H[7], h);
        }

        let hash = new Array(16);
        for (i = 0; i < 8; i++) {
            hash[2 * i] = H[i].h;
            hash[2 * i + 1] = H[i].l;
        }

        return hash;
    }

    function _int64(h, l) {
        this.h = h;
        this.l = l;
    }

    function _int64copy(dst, src) {
        dst.h = src.h;
        dst.l = src.l;
    }

    function _int64rrot(dst, x, shift) {
        dst.l = (x.l >>> shift) | (x.h << (32 - shift));
        dst.h = (x.h >>> shift) | (x.l << (32 - shift));
    }

    function _int64revrrot(dst, x, shift) {
        dst.l = (x.h >>> shift) | (x.l << (32 - shift));
        dst.h = (x.l >>> shift) | (x.h << (32 - shift));
    }

    function _int64shr(dst, x, shift) {
        dst.l = (x.l >>> shift) | (x.h << (32 - shift));
        dst.h = (x.h >>> shift);
    }

    function _int64add(dst, x, y) {
        let w0 = (x.l & 0xffff) + (y.l & 0xffff);
        let w1 = (x.l >>> 16) + (y.l >>> 16) + (w0 >>> 16);
        let w2 = (x.h & 0xffff) + (y.h & 0xffff) + (w1 >>> 16);
        let w3 = (x.h >>> 16) + (y.h >>> 16) + (w2 >>> 16);
        dst.l = (w0 & 0xffff) | (w1 << 16);
        dst.h = (w2 & 0xffff) | (w3 << 16);
    }

    function _int64add4(dst, a, b, c, d) {
        let w0 = (a.l & 0xffff) + (b.l & 0xffff) + (c.l & 0xffff) + (d.l & 0xffff);
        let w1 = (a.l >>> 16) + (b.l >>> 16) + (c.l >>> 16) + (d.l >>> 16) + (w0 >>> 16);
        let w2 = (a.h & 0xffff) + (b.h & 0xffff) + (c.h & 0xffff) + (d.h & 0xffff) + (w1 >>> 16);
        let w3 = (a.h >>> 16) + (b.h >>> 16) + (c.h >>> 16) + (d.h >>> 16) + (w2 >>> 16);
        dst.l = (w0 & 0xffff) | (w1 << 16);
        dst.h = (w2 & 0xffff) | (w3 << 16);
    }

    function _int64add5(dst, a, b, c, d, e) {
        let w0 = (a.l & 0xffff) + (b.l & 0xffff) + (c.l & 0xffff) + (d.l & 0xffff) + (e.l & 0xffff);
        let w1 = (a.l >>> 16) + (b.l >>> 16) + (c.l >>> 16) + (d.l >>> 16) + (e.l >>> 16) + (w0 >>> 16);
        let w2 = (a.h & 0xffff) + (b.h & 0xffff) + (c.h & 0xffff) + (d.h & 0xffff) + (e.h & 0xffff) + (w1 >>> 16);
        let w3 = (a.h >>> 16) + (b.h >>> 16) + (c.h >>> 16) + (d.h >>> 16) + (e.h >>> 16) + (w2 >>> 16);
        dst.l = (w0 & 0xffff) | (w1 << 16);
        dst.h = (w2 & 0xffff) | (w3 << 16);
    }

    return crypto;
})();
