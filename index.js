const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// ✅ Encryption API
app.post('/encrypt', (req, res) => {
    try {
        let { data, publicKey } = req.body;

        // 🔥 Ensure PEM format (fix for your ASN1 errors)
        if (!publicKey.includes('BEGIN PUBLIC KEY')) {
            publicKey = formatPublicKey(publicKey);
        }

        const encrypted = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_PADDING
            },
            Buffer.from(data)
        );

        res.send(encrypted.toString('base64'));

    } catch (e) {
        console.error(e);
        res.status(500).send(e.toString());
    }
});

// ✅ Helper to format key
function formatPublicKey(key) {
    return `-----BEGIN PUBLIC KEY-----\n${
        key.replace(/\s+/g, '').match(/.{1,64}/g).join('\n')
    }\n-----END PUBLIC KEY-----`;
}

app.listen(10000, () => console.log('Server running on port 10000'));
