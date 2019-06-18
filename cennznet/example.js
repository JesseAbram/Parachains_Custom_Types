const {Api} = require('./node_modules/@cennznet/api')

const getApi = async () => {
    const api = await Api.create({provider: ''});
    console.log("you are now connected")
    console.log(api)
    process.exit()
}

getApi()