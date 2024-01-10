document.addEventListener('DOMContentLoaded', (item) => {
    const changeBtn = document.querySelector('.change_btn')
    const startBtn = document.querySelector('.startBtn')
    const box_1 = document.querySelector('.box-1')
    let AllColor = document.querySelectorAll('.color_name')
    const colArr = [];
    let startInterval;
    // console.log(changeBtn)

    changeBtn.addEventListener('click', (e) => {
        randomColor()
        AllColor = document.querySelectorAll('.color_name')
        notification('Color Changed')
    })

    startBtn.addEventListener('click', (e) => {
        if (e.target.innerText === 'Start') {

            const input = document.querySelector('.time');
            const time = (input.value || 1) * 1000;
            e.target.innerText = 'Stop';
            changeBtn.disabled = true;
            input.setAttribute('readonly', true)

            startInterval = setInterval(() => {
                randomColor()
            }, time);
            notification(`Color Change Every ${time / 1000} second : Start`)
        } else {
            e.target.innerText = 'Start'
            document.querySelector('.time').removeAttribute('readonly')
            changeBtn.disabled = false;

            clearInterval(startInterval)
            notification('Color Changing : Stopped')

        }
    })
    box_1.addEventListener('mouseenter', (e) => {
        AllColor = document.querySelectorAll('.color_name')
        // console.log(AllColor)
        AllColor.forEach((item) => {

            item.addEventListener('mouseenter', (e) => {
                const div = document.createElement('div')
                div.className = 'color_copy'
                div.innerText = 'Copy'
                div.style.width = `${e.srcElement.clientWidth}px`;
                item.append(div)
                const copyBtn = document.querySelector('.color_copy')
                copyBtn.addEventListener('click', () => {
                    copyCode(item)
                })
            })
            item.addEventListener('mouseleave', (e) => {
                item.lastChild.remove()
            })
        })
    })
    

    function randomColor() {
        const random = Math.round(Math.random() * 8000000)
        const hexNum = random.toString(16)
        const hexCol = `#${hexNum}`
        if (hexNum < 'fffff') {
            const colors = document.querySelector('.colors')
            document.body.style.backgroundColor = hexCol;

            const li = document.createElement('li')
            li.className = "color_name"
            li.innerText = hexCol;
            colors.appendChild(li)
            // colstore(colArr, hexCol)
            // console.log(colors.childElementCount,"colors printed")
            if (colors.childElementCount >= 10) {
                colors.firstChild.remove()
            }
        }
        return hexCol;
    }

    function colstore(colors, color) {
        colors[colors.length] = color;
        // console.log(colors, colors.length)

        if (colors.length == 50) {
            // console.log('array full')
            colors.pop()
        }
    }

    function notification(mess) {
        const noti_div = document.querySelector('.notification')
        const div = document.createElement('div')
        div.classList = ['mess']
        div.innerText = mess;
        noti_div.appendChild(div)
        
        setTimeout(() => {
            noti_div.lastChild.remove()
        }, 1000);
    }
    
    function copyCode(field){
         
            var tempInput = document.createElement("input");
            tempInput.style = "position: absolute; left: -1000px; top: -1000px";
            tempInput.value = field.innerText;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
            
       
        
        notification(`'Copy Successfully'${field.innerText}`)
    }

})