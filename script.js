        const inputPas = document.querySelector("#password")
        const upperCaseCheckEl = document.querySelector("#uppercase-check")
        const numberCheckEl = document.querySelector("#number-check")
        const symbolCheckEl = document.querySelector("#symbol-check")
        const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")

        let passwordLength = 16;

        function generatePassword() {
            let chars = "abcdefghjkmnopqrstuvwxyz"
            
            const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
            const numberChars = "123456789"
            const symbolChars = "?!@&*()[]"

            if(upperCaseCheckEl.checked) {
                chars += upperCaseChars
            }

            if(numberCheckEl.checked) {
                chars += numberChars
            }

            if(symbolCheckEl.checked) {
                chars += symbolChars
            } 
        
            let password = ""

            for(let i = 0; i < passwordLength; i++) {
                const randomNumber = Math.floor(Math.random() * chars.length)
                password += chars.substring(randomNumber, randomNumber + 1)
            }

            inputPas.value = password
            calculateQuality()
            calculateFontSize()
        }

        function calculateQuality() {
            let percent = Math.round((passwordLength / 64) * 25 + 
            (upperCaseCheckEl.checked ? 15 : 0) + (numberCheckEl.checked ? 25 : 0) + 
            (symbolCheckEl.checked ? 35 : 0));

            // if(upperCaseCheckEl.checked) {
            //     percent += 15;
            // }

            // if(numberCheckEl.checked) {
            //     percent += 25;
            // }

            // if(symbolCheckEl.checked) {
            //     percent += 35;
            // } 

            securityIndicatorBarEl.style.width = `${percent}%`

            if(percent > 69) {
                securityIndicatorBarEl.classList.remove("warning") 
                securityIndicatorBarEl.classList.add("safe")
                securityIndicatorBarEl.classList.remove("critical")
            } else if(percent > 35) {
                securityIndicatorBarEl.classList.remove("safe")
                securityIndicatorBarEl.classList.remove("critical")
                securityIndicatorBarEl.classList.add("warning")
            } else { 
                securityIndicatorBarEl.classList.remove("warning")
                securityIndicatorBarEl.classList.add("critical")
                securityIndicatorBarEl.classList.remove("safe")
            }
            if(percent >= 100) {
                securityIndicatorBarEl.classList.add("completed")
            } else {
                securityIndicatorBarEl.classList.remove("completed")
            }
        }

        function calculateFontSize() {
            if(passwordLength > 45) {
                inputPas.classList.remove('font-sm')
                inputPas.classList.remove('font-xs')
                inputPas.classList.add('font-xxs')
            } else if (passwordLength > 32) {
                inputPas.classList.remove('font-sm')
                inputPas.classList.add('font-xs')
                inputPas.classList.remove('font-xxs')
            } else if(passwordLength > 22) {
                inputPas.classList.add('font-sm')
                inputPas.classList.remove('font-xs')
                inputPas.classList.remove('font-xxs')
            } else {
                inputPas.classList.remove('font-sm')
                inputPas.classList.remove('font-xs')
                inputPas.classList.remove('font-xxs')
            }
        }
        
        const passwordLengthEl = document.querySelector("#password-length")
        passwordLengthEl.addEventListener("input", () => {

            passwordLength = passwordLengthEl.value
            document.querySelector("#password-length-text").innerText = passwordLength 
            generatePassword()
        })

        upperCaseCheckEl.addEventListener("click", generatePassword)
        numberCheckEl.addEventListener("click", generatePassword)
        symbolCheckEl.addEventListener("click", generatePassword)
        

        document.querySelector("#copy").addEventListener("click", () => {
            navigator.clipboard.writeText(inputPas.value)
            document.querySelector("#copy").innerText = "Senha Copiada"
            document.querySelector("#copy").style.backgroundColor = "#9b51e0"
            setTimeout(() => {
                document.querySelector("#copy").innerText = "Copiar Senha"
                document.querySelector("#copy").style.backgroundColor = "#bb6bd9"
            }, 2000)
        })

        document.querySelector("#copy2").addEventListener("click", () => {
            navigator.clipboard.writeText(inputPas.value)
        })

        document.querySelector("#renew").addEventListener("click", () => {
            generatePassword()
        })

        
       
        

        generatePassword()
