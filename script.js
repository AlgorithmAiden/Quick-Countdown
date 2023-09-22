//setup the canvas
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

/**make the canvas always fill the screen**/;
(function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    window.onresize = resize
})()

//for this code (as in code before this line), I almost always use the same stuff, so its going to stay here

//for getting time as a nice string
const targetTime = new Date('April 22, 2024 00:00:00')
function getTime(offset = 0) {

    function cfs(n) { return n != 1 ? 's' : ' ' }
    function cfp(n) { return n < 10 ? ' ' : '' }

    let remainingTime = targetTime - Date.now() + offset
    const secondTime = 1000
    const minuteTime = secondTime * 60
    const hourTime = minuteTime * 60
    const dayTime = hourTime * 24
    const weekTime = dayTime * 7
    const monthTime = dayTime * 30
    const yearTime = monthTime * 12
    const years = Math.floor(remainingTime / yearTime)
    remainingTime %= yearTime
    const months = Math.floor(remainingTime / monthTime)
    remainingTime %= monthTime
    const weeks = Math.floor(remainingTime / weekTime)
    remainingTime %= weekTime
    const days = Math.floor(remainingTime / dayTime)
    remainingTime %= dayTime
    const hours = Math.floor(remainingTime / hourTime)
    remainingTime %= hourTime
    const minutes = Math.floor(remainingTime / minuteTime)
    remainingTime %= minuteTime
    const seconds = Math.floor(remainingTime / secondTime)
    remainingTime %= secondTime
    let out = ''
    out += `${cfp(years)}${years} year${cfs(years)}${cfp(years)}`
    out += `${cfp(months)}${months} month${cfs(months)}${cfp(months)}`
    out += `${cfp(weeks)}${weeks} week${cfs(weeks)}${cfp(weeks)}`
    out += `${cfp(days)}${days} day${cfs(days)}${cfp(days)}`
    out += `${cfp(hours)}${hours} hour${cfs(hours)}${cfp(hours)}`
    out += `${cfp(minutes)}${minutes} minute${cfs(minutes)}${cfp(minutes)}`
    out += `${cfp(seconds)}${seconds} second${cfs(seconds)}${cfp(seconds)}`
    return out
}

//set the number of rows
const rowSize = 20
const rows = canvas.height / rowSize
const target = Math.round(rows / 2)

    ;//the render loop
(function render() {
    //clear the screen
    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    //render the text
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.font = `${rowSize}px arial`
    for (let index = 0; index < rows; index++) {
        if (index - target == 0) ctx.fillStyle = 'rgb(0,255,0)'
        else ctx.fillStyle = 'rgb(0,100,0)'
        const time = getTime((index - target) * 1000)
        ctx.fillText(time, canvas.width / 2, index * rowSize + rowSize / 2)
    }
    requestAnimationFrame(render)
})()