let fileInput = document.getElementById('fileInput')
let uploadBtn = document.querySelector('.fileUpload__uploadBtn')
let images = document.querySelector('.fileUpload__images')

const dataUrl = "http://git.inoclouds.com:6785/upload" 


const upload = () => {
    let files = fileInput.files

    let formData = new FormData()

    for(let i = 0; i < files.length; i++) {
        formData.append('fileData', files[i])

        let fileReader = new FileReader()

        let imgDiv = document.createElement('div')
        images.style.marginTop = 50 + 'px'

        let img = document.createElement('img')

        const progressBar = document.createElement('div')
        progressBar.classList.add('progressBar')
        progressBar.style.marginBottom = 20 + 'px'
        
        const progressFill = document.createElement('div')
        progressFill.classList.add('progressBar__fill')

        fileReader.onloadend = () => {
            img.src = fileReader.result
            img.style.width = 200 + 'px'
            // imgDiv.appendChild(progress)
        }

        fileReader.readAsDataURL(files[i])


        let xml = new XMLHttpRequest();

        xml.onreadystatechange = () => {
            if(xml.readyState === 4) {
                if(xml.status === 200) {
                    console.log(xml.responseText)
                }   
            }
        }

        xml.upload.onprogress = (e) => {
            console.log(e.loaded + " / " + e.total)

            for(i = 0; i <= files.length; i ++) {
                let percent = e.lengthComputable ? (e.loaded / e.total) * 100 : 0
                progressFill.style.width = percent.toFixed(2) + "%"
                images.appendChild(imgDiv)
                imgDiv.appendChild(img)
                images.appendChild(progressBar)
                progressBar.appendChild(progressFill)
            }
            fileInput.value = ""
        }

        xml.open("POST", dataUrl)
        xml.send(formData)
    }
}

uploadBtn.addEventListener('click', () => {
    upload()
})
