function verificationTemplate(name, url){
    return `
        <h2>Hello ${name}</h2>

        <p>Please verify your account.</p>

        <a href="${url}">
            Verify Email
        </a>
    `;
}

module.exports = verificationTemplate;