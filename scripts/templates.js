class Templates {
    constructor(){
        this.styleTag = document.querySelector("style");
        this.body = document.querySelector("body");
    }
    forEachHTMLCollection(){
      //TODO: make it working for children
      //forEach() can be applied to HTMLCollections
      HTMLCollection.prototype.forEach = function(callback){
        for (let i = 0; i < this.length; i++){
          console.log(i);
          callback(this[i], i);
        }

      };
    }
    createStyle(styles){
        if (this.styleTag === null){
            const newStyle = document.createElement("style");
            document.querySelector("head").prepend(newStyle);
            this.styleTag = document.querySelector("style");
        }
        this.styleTag.innerHTML += `
            .d-none {
                display: none !important;
            }
        `;

        if (styles !== undefined && styles !== null){
            this.styleTag.innerHTML += styles;
        }
    }
    prependDiv(toPrependTo, divClass, divId){
        const newDiv = document.createElement("div");
        if (divClass !== undefined && divClass !== null){
            newDiv.classList.add(divClass);
        }

        if (divId !== undefined && divId !== null){
            newDiv.setAttribute("id", divId)
        }

        toPrependTo.prepend(newDiv);
    }
    appendDiv(toAppendTo, divClass, divId){
        const newDiv = document.createElement("div");
        if (divClass !== undefined && divClass !== null){
            newDiv.classList.add(divClass);
        }

        if (divId !== undefined && divId !== null){
            newDiv.setAttribute("id", divId)
        }

        toAppendTo.appendChild(newDiv);
    }
    centerFlex(tag){
        myObject.styleTag.innerHTML += `
            ${tag} {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `;
    }
    prompt(callback, label, placeholder, color, myReg, regText){
        this.prependDiv(document.querySelector("body"), "prompt-wrapper");
        this.createStyle();
        this.styleTag.innerHTML += `
            .prompt-wrapper {
                background-color: rgba(0, 0, 0, 0.5);
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            .prompt {
                background-color: white;
                font-family: arial;
                text-align: center;
                font-size: 1.5em;

                height: 300px;
                width: 95%;
                max-width: 380px;

                margin: 10% auto;
                padding: 30px;
                padding-top: 40px;
            }

            input[type="text"]{
                width: 200px;
                margin-top: 20px;
                padding: 5px 10px;
                font-size: 0.7em;
                border: solid rgba(0, 0, 0, 0.25) 1px;
                outline: none;
                transition: outline 0.05s;
            }

            input[type="text"]:focus {
                outline: solid #1d7fcb 3px;
            }

            #regex {
                color: red;
                font-size: 0.65em;
                max-width: 355px;
                position: fixed;
            }

            .button, .cancel {
                background-color: ${color};
                border: none;
                padding: 10px;
                font-size: 0.8em;
                margin-top: 60px;
                cursor: pointer;
                outline: none;
            }

            .cancel {
                background-color: rgba(0, 0, 0, 0.13);
                margin-right: 30px;
            }

        `;

        const wrapper = document.querySelector(".prompt-wrapper");


        wrapper.innerHTML = `
            <div class="prompt">
                <label>${label}</label>
                <form id="promptForm">
                    <input type="text" name="textInput" placeholder="${placeholder}" /><br>
                    <p id="regex"></p>
                    <input type="button" name="cancel" class="cancel" value="Cancel"/>
                    <input type="submit" name="submit" class="button"/>
                </form>
            </div>
        `;

        const myPrompt = document.querySelector(".prompt")
        const form = document.getElementById("promptForm");

        wrapper.addEventListener("click", e => {
            const t = e.target;
            if (t !== myPrompt &&
                t !== form &&
                t !== document.querySelector("label") &&
                t !== document.querySelectorAll("input")[0] &&
                t !== document.querySelectorAll("input")[2] &&
                !form.textInput.value){
                wrapper.style.display = "none";
            }
        });

        form.addEventListener("submit", e => {
            e.preventDefault();
            let inputValue = form.textInput.value;
            const regex = myReg;
            if (inputValue && regex.test(inputValue)){
                wrapper.style.display = "none";
                callback(inputValue);
            } else if (regText){
                document.getElementById("regex").innerText = regText;
            } else {
                document.getElementById("regex").innerText = "Your answer is invalid";
            }
        });

    }
    getAverage(a, b){
        // a == Array || (a && b) == Number
        if (typeof a === "number"){
            return (a + b) / 2;
        } else {
            let total = 0;
            a.forEach(number => {
                total += number;
            });
            return total / a.length;
        }
    }
    fac(num){
        if (num % 1 === 0){
            let result = num;
            num--;
            while (num > 0){
                result *= num;
                num--;
            }
            return result;
        } else {
            return undefined;
        }
    }
}





// const templates = {
//     styleTag: document.querySelector("style"),
//     body: document.querySelector("body"),
//
//     createStyle(styles){
//         if (document.querySelector("style") === null){
//             const newStyle = document.createElement("style");
//             document.querySelector("head").prepend(newStyle);
//         }
//         this.styleTag = document.querySelector("style");
//         this.styleTag.innerHTML += `
//             .d-none {
//                 display: none !important;
//             }
//         `;
//
//         if (styles !== undefined && styles !== null){
//             this.styleTag.innerHTML += styles;
//         }
//
//     },
//
//     prependDiv(toPrependTo, divClass, divId){
//         const newDiv = document.createElement("div");
//         if (divClass !== undefined && divClass !== null){
//             newDiv.classList.add(divClass);
//         }
//
//         if (divId !== undefined && divId !== null){
//             newDiv.setAttribute("id", divId)
//         }
//
//         toPrependTo.prepend(newDiv);
//     },
//
//     appendDiv(toAppendTo, divClass, divId){
//         const newDiv = document.createElement("div");
//         if (divClass !== undefined && divClass !== null){
//             newDiv.classList.add(divClass);
//         }
//
//         if (divId !== undefined && divId !== null){
//             newDiv.setAttribute("id", divId)
//         }
//
//         toAppendTo.appendChild(newDiv);
//     },
//
//     centerFlex(tag){
//         myObject.styleTag.innerHTML += `
//             ${tag} {
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//             }
//         `;
//     },
//
//     prompt(resultFunction, label, placeholder, color, myReg, regText){
//         this.prependDiv(document.querySelector("body"), "prompt-wrapper");
//         this.createStyle();
//         this.styleTag.innerHTML += `
//             .prompt-wrapper {
//                 background-color: rgba(0, 0, 0, 0.5);
//                 position: fixed;
//                 top: 0;
//                 left: 0;
//                 width: 100%;
//                 height: 100%;
//             }
//
//             .prompt {
//                 background-color: white;
//                 font-family: arial;
//                 text-align: center;
//                 font-size: 1.5em;
//
//                 height: 180px;
//                 width: 95%;
//                 max-width: 360px;
//
//                 margin: 10% auto;
//                 padding: 30px;
//                 padding-top: 40px;
//             }
//
//             input[type="text"]{
//                 width: 200px;
//                 margin-top: 20px;
//                 padding: 5px 10px;
//                 font-size: 0.7em;
//                 border: solid rgba(0, 0, 0, 0.25) 1px;
//                 outline: none;
//                 transition: outline 0.05s;
//             }
//
//             input[type="text"]:focus {
//                 outline: solid #1d7fcb 3px;
//             }
//
//             #regex {
//                 color: red;
//                 font-size: 0.65em;
//                 width: 355px;
//                 position: fixed;
//             }
//
//             .button, .cancel {
//                 background-color: ${color};
//                 border: none;
//                 padding: 10px;
//                 font-size: 0.8em;
//                 margin-top: 60px;
//                 cursor: pointer;
//                 outline: none;
//             }
//
//             .cancel {
//                 background-color: rgba(0, 0, 0, 0.13);
//                 margin-right: 30px;
//             }
//
//         `;
//
//         const wrapper = document.querySelector(".prompt-wrapper");
//
//
//         wrapper.innerHTML = `
//             <div class="prompt">
//                 <label>${label}</label>
//                 <form id="promptForm">
//                     <input type="text" name="textInput" placeholder="${placeholder}" /><br>
//                     <p id="regex"></p>
//                     <input type="button" name="cancel" class="cancel" value="Cancel"/>
//                     <input type="submit" name="submit" class="button"/>
//                 </form>
//             </div>
//         `;
//
//         const myPrompt = document.querySelector(".prompt")
//         const form = document.getElementById("promptForm");
//
//         wrapper.addEventListener("click", e => {
//             const t = e.target;
//             if (t !== myPrompt &&
//                 t !== form &&
//                 t !== document.querySelector("label") &&
//                 t !== document.querySelectorAll("input")[0] &&
//                 t !== document.querySelectorAll("input")[2] &&
//                 !form.textInput.value){
//                 wrapper.style.display = "none";
//             }
//         });
//
//         form.addEventListener("submit", e => {
//             e.preventDefault();
//             let inputValue = form.textInput.value;
//             const regex = myReg;
//             if (inputValue && regex.test(inputValue)){
//                 wrapper.style.display = "none";
//                 resultFunction(inputValue);
//             } else if (regText){
//                 document.getElementById("regex").innerText = regText;
//             } else {
//                 document.getElementById("regex").innerText = "Your answer is invalid";
//             }
//         });
//
//     },
//
//     getAverage(a, b){
//         // a == Array || (a && b) == Number
//         if (typeof a === "number"){
//             return (a + b) / 2;
//         } else {
//             let total = 0;
//             a.forEach(number => {
//                 total += number;
//             });
//             return total / a.length;
//         }
//     },
//
//     fac(num){
//         if (num % 1 === 0){
//             let result = num;
//             num--;
//             while (num > 0){
//                 result *= num;
//                 num--;
//             }
//             return result;
//         } else {
//             return undefined;
//         }
//     },
//
// }
