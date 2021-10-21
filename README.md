# online-tools

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Criação de Keys e Cerificate SSL (terminal)

O Web Share API precisa de uma origem segura para funcionar corretamente, assim durante o desenvolvimento é necessários criar Keys e Cerificate SSL para configurar um servidor HTTPs.

```sh
# Creating Keys and Cerificate (linux terminal)
openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365

# Get Decrypted Keys
openssl rsa -in keytmp.pem -out key.pem
```

[https://stackoverflow.com/questions/45807049/how-to-run-vue-js-dev-serve-with-https](https://stackoverflow.com/questions/45807049/how-to-run-vue-js-dev-serve-with-https)

## Refs

[https://morioh.com/p/5b1e6e195294](https://morioh.com/p/5b1e6e195294)
