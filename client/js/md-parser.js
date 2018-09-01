const regex = {
    newline: /^( *\n)+/,
    pre: /^(?: {4,}\S[^\n]*(?:\n(?! *\n)[^\n]*)*(?: *\n)*)+/,
    blockquote: /^(?: *> *\S[^\n]*(?:\n(?! *\n)[^\n]*)*(?: *\n)*)+/,
    numlist: /^(?: *\d+\. [^\n]*(?:\n(?:(?: *\n)* )?(?! *\n)[^\n]*)*(?: *\n)*)+/,
    abclist: /^(?: *[a-z]\. [^\n]*(?:\n(?:(?: *\n)* )?(?! *\n)[^\n]*)*(?: *\n)*)+/,
    dashlist: /^(?: *- [^\n]*(?:\n(?:(?: *\n)* )?(?! *\n)[^\n]*)*(?: *\n)*)+/,
    numitem: /^( ?)( ?)( ?)\d+\. [^\n]*(?:\n(?!\1?\2?\3?\d+\. )[^\n]*)*/gm,
    abcitem: /^( ?)( ?)( ?)[a-z]\. [^\n]*(?:\n(?!\1?\2?\3?[a-z]\. )[^\n]*)*/gm,
    dashitem: /^( ?)( ?)( ?)- [^\n]*(?:\n(?!\1?\2?\3?- )[^\n]*)*/gm,
    paragraph: /^ *\S[^\n]*(?:\n(?! *(?:\n|> *\S|- |\d+\. |[a-z]\. )| {4})[^\n]*)*/,
    raw: /^[^\n]*/,
    escape: /^\\([\\\[\-.`_>])/,
    autolink: /^(https?:\/\/([^\s<]+[^<.,:;"')\]\s]))/,
    link: /^\[((?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*)\]\((\b|https?:\/{2})((?:[a-z0-9.\-]{2,})(?:\/\S*)?)\)/i,
    strong: /^__ *(?=\S)((?:[^\\_]|\\[\\_]|\\(?![\\_])|_ *(?=\S)(?:[^\\_]|\\[\\_]|\\(?![\\_]))+_)+)__/,
    em: /^_ *(?=\S)((?:[^\\_]|\\[\\_]|\\(?![\\_])|__ *(?=\S)(?:[^\\_]|\\[\\_]|\\(?![\\_]))+__)+)_/,
    code: /^`(?!`)((?:\\\\)*|[\s\S]*?(?:[^\\](?:\\\\)*|[^`\\]))`/,
    br: /^ *\n */,
    text: /^[\s\S]+?(?=\\[\\\[\-.`_>]|[\[`_]|https?:\/\/| *(?:\n|$))/
};

function parse(source) {
    let out = '';
    let html;
    let start;
    let cap;

    source = trim(String(source));

    while (source) {
        if (cap = regex.newline.exec(source)) {
            source = source.substring(cap[0].length);

            continue;
        }

        if (cap = regex.pre.exec(source)) {
            source = source.substring(cap[0].length);
            cap = cap[0].replace(/^ {0,4}/gm, '').replace(/ *(\n *)*$/, '');
            html = htmlEncode(cap);
            out += '<pre>'+html+'</pre>';

            continue;
        }

        if (cap = regex.blockquote.exec(source)) {
            source = source.substring(cap[0].length);
            cap = cap[0].replace(/^ *>/gm, '');
            html = parse(cap);
            out += '<blockquote>'+html+'</blockquote>';

            continue;
        }

        if (cap = regex.numlist.exec(source)) {
            source = source.substring(cap[0].length);
            start = /^ *(\d+)\. /.exec(cap[0])[1];
            out += '<ol'+(start > 1 ? ' start="'+start+'"' : '')+'>';
            out += items(cap[0], 'numitem');
            out += '</ol>';

            continue;
        }

        if (cap = regex.abclist.exec(source)) {
            source = source.substring(cap[0].length);
            start = /^ *([a-z])\. /.exec(cap[0])[1].toLowerCase().charCodeAt(0) - 96;
            out += '<ol type="a"'+(start > 1 ? ' start="'+start+'"' : '')+'>';
            out += items(cap[0], 'abcitem');
            out += '</ol>';

            continue;
        }

        if (cap = regex.dashlist.exec(source)) {
            source = source.substring(cap[0].length);
            out += '<ul>';
            out += items(cap[0], 'dashitem');
            out += '</ul>';

            continue;
        }

        if (cap = regex.paragraph.exec(source)) {
            source = source.substring(cap[0].length);
            cap = cap[0].replace(/^ */, '').replace(/ *(\n *)*$/, '');
            html = inline(cap);
            out += '<p>'+html+'</p>';

            continue;
        }

        if (cap = regex.raw.exec(source)) {
            source = source.substring(cap[0].length);
            cap = cap[0].replace(/^ */, '').replace(/ *(\n *)*$/, '');
            html = inline(cap);
            out += html;

            continue;
        }

        if (source) {
            throw new Error(source.charCodeAt(0));
        }
    }

    return out;
}

function items(source, type) {
    let out = '';
    let item;
    let html;
    let space;

    source = source.match(regex[type]);

    for (let i = 0; i < source.length; i++) {
        item = source[i];
        item = item.replace(/^ {0,4}/gm, '').replace(/^ *(-|\d+\.|[a-z]\.) /, '');
        html = parse(item);
        out += '<li>'+html+'</li>';
    }

    return out;
}

function inline(source) {
    let out = '', cap, html, href, title;

    while (source) {
        if (cap = regex.escape.exec(source)){
            source = source.substring(cap[0].length);
            out += htmlEncode(cap[1]);

            continue;
        }

        if (cap = regex.link.exec(source)) {
            source = source.substring(cap[0].length);
            href = cap[2] || 'http://';
            href += cap[3].replace(/&/g, '&amp;').replace(/"/g, '&quot;');
            title = htmlEncode(cap[1].replace(/ {2,}/g, ' '));
            out += '<a href="'+href+'">'+title+'</a>';

            continue;
        }

        if (cap = regex.autolink.exec(source)) {
            source = source.substring(cap[0].length);
            href = cap[1].replace(/&/g, '&amp;').replace(/"/g, '&quot;');
            title = htmlEncode(cap[2]);
            out += '<a href="'+href+'">'+title+'</a>';

            continue;
        }

        if (cap = regex.strong.exec(source)) {
            source = source.substring(cap[0].length);
            html = inline(cap[1].replace(/[\n ]+$/, ''));
            out += '<strong>'+html+'</strong>';

            continue;
        }

        if (cap = regex.em.exec(source)) {
            source = source.substring(cap[0].length);
            html = inline(cap[1].replace(/[\n ]+$/, ''));
            out += '<em>'+html+'</em>';

            continue;
        }

        if (cap = regex.code.exec(source)) {
            source = source.substring(cap[0].length);
            html = htmlEncode(cap[1].replace(/\\([\\`])/g, '$1'));
            out += '<code>'+html+'</code>';

            continue;
        }

        if (cap = regex.br.exec(source)) {
            source = source.substring(cap[0].length);
            out += '<br/>';

            continue;
        }

        if (cap = regex.text.exec(source)) {
            source = source.substring(cap[0].length);
            html = htmlEncode(cap[0].replace(/ {2,}/g, ' '));
            out += html;

            continue;
        }

        if (source) {
            throw new Error(source.charCodeAt(0));
        }
    }

    return out;
}


function htmlEncode(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#x27;')
              .replace(/\//g, '&#x2F;');
}

function trim(str) {
    return str.replace(/\t/g, '    ')
              .replace(/\u00a0/g, ' ')
              .replace(/\u3000/g, ' ')
              .replace(/\r/g, '\n')
              .replace(/\f/g, '\n')
}

function markdown(md) {
    return parse(md);
}
