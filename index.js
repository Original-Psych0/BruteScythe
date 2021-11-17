//Dependencies
const Readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
})
const Chalk = require("chalk")
const Fs = require("fs")

//Variables
const Plugins = Fs.readdirSync("./plugins")

var Self = {}
Self.plugins = []

//Main
for( i in Plugins ){
    let information = require(`./plugins/${Plugins[i]}`).info()

    Self.plugins.push({ name: information.name, id: +i+1 })
}

Main()
function Main(){
    console.log(Chalk.redBright(`██████╗ ██████╗ ██╗   ██╗████████╗███████╗███████╗ ██████╗██╗   ██╗████████╗██╗  ██╗███████╗
██╔══██╗██╔══██╗██║   ██║╚══██╔══╝██╔════╝██╔════╝██╔════╝╚██╗ ██╔╝╚══██╔══╝██║  ██║██╔════╝
██████╔╝██████╔╝██║   ██║   ██║   █████╗  ███████╗██║      ╚████╔╝    ██║   ███████║█████╗  
██╔══██╗██╔══██╗██║   ██║   ██║   ██╔══╝  ╚════██║██║       ╚██╔╝     ██║   ██╔══██║██╔══╝  
██████╔╝██║  ██║╚██████╔╝   ██║   ███████╗███████║╚██████╗   ██║      ██║   ██║  ██║███████╗
╚═════╝ ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝ ╚═════╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝╚══════╝`))
    console.log(Chalk.blueBright("= By Psych0"))
    console.log(Chalk.magentaBright("= Version 1.0.0"))
    console.log()

    for( i in Self.plugins ){
        console.log(Chalk.magentaBright(`${Self.plugins[i].id})`) + Chalk.blueBright(` ${Self.plugins[i].name}`))
    }

    console.log()
    Readline.question(`${Chalk.blueBright("brutescythe") + Chalk.magentaBright(">")} `, plugin=>{
        plugin = +plugin-1
        let plugin_exists = false

        for( i in Self.plugins ){
            if(Self.plugins[i].id-1 == plugin){
                plugin_exists = true
            }
        }

        if(plugin_exists){
            require(`./plugins/${Plugins[plugin]}`).bruteforce(Fs, Chalk, Readline)
        }else{
            console.log(Chalk.redBright("The plugin id you specified does not exist."))
            setTimeout(function(){
                console.clear()
                Main()
            }, 4000)
        }
    })
}
