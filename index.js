const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

app.post('/encrypt', (req, res) => {
    try {
        const { data, publicKey } = req.body;

        const encrypted = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_PADDING
            },
            Buffer.from(data)
        );

        res.send(encrypted.toString('base64'));

    } catch (e) {
        res.status(500).send(e.toString());
    }
});

app.listen(10000, () => console.log('Server running'));
