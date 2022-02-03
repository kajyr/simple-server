const forge = require("node-forge");
var pki = forge.pki;

function createKeys() {
  const keys = pki.rsa.generateKeyPair(2048);
  const cert = pki.createCertificate();

  cert.publicKey = keys.publicKey;
  cert.serialNumber = "01";
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

  const attrs = [
    { name: "commonName", value: "localhost" },
    { name: "countryName", value: "US" },
    { shortName: "ST", value: "Virginia" },
    { name: "localityName", value: "Blacksburg" },
    { name: "organizationName", value: "Test" },
    { shortName: "OU", value: "Test" },
  ];

  cert.setSubject(attrs);
  cert.setIssuer(attrs);
  cert.sign(keys.privateKey);

  const pem_pkey = pki.privateKeyToPem(keys.privateKey);
  const pem_cert = pki.certificateToPem(cert);

  return { key: pem_pkey, cert: pem_cert };
}

module.exports = createKeys;
