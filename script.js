// ==============================
// STATE
// ==============================

let skipAction = false;
let currentTimer = null;

let buttonState = "identity";
let currentScreen = "identity";

let noClicks = 0;
let noEscaped = false;

let selectedDate = null;
let selectedTime = null;

let currentMonth = 7;


// ==============================
// ELEMENTS
// ==============================

const progressContainer = document.getElementById("progressContainer");
const status = document.getElementById("status");
const bar = document.getElementById("bar");

const title = document.getElementById("title");
const button = document.getElementById("nextButton");

const identityBlock = document.getElementById("identityBlock");

const envelopeScreen = document.getElementById("envelopeScreen");
const dateScreen = document.getElementById("dateScreen");
const ideasScreen = document.getElementById("ideasScreen");
const customIdeaScreen = document.getElementById("customIdeaScreen");
const finalScreen = document.getElementById("finalScreen");

const backButton = document.getElementById("backButton");

const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
const systemMessage = document.getElementById("systemMessage");

const finalText = document.getElementById("finalText");

const customIdeaInput = document.getElementById("customIdeaInput");
const customIdeaButton = document.getElementById("customIdeaButton");


// ==============================
// SCREEN MANAGER
// ==============================


function showScreen(screen){


    const screens = [
        envelopeScreen,
        dateScreen,
        ideasScreen,
        customIdeaScreen,
        finalScreen
    ];



    screens.forEach(item=>{


        if(item && item !== screen){


            item.classList.remove("show");

            item.classList.add("hidden");


        }


    });




    if(screen){


        screen.classList.remove("hidden");

        screen.classList.add("show");



        // компактный режим страницы приглашения

        const mainScreen =
            document.getElementById("screen");



        if(mainScreen){


            if(screen === envelopeScreen){


                mainScreen.classList.add(
                    "invitationMode"
                );


            } else {


                mainScreen.classList.remove(
                    "invitationMode"
                );


            }


        }


    }


}







function hideElement(element){


    if(element){


        element.classList.add("hidden");

        element.classList.remove("show");


    }


}







function showElement(element){


    if(element){


        element.classList.remove("hidden");

        element.classList.add("show");


    }


}

// ==============================
// LOADING
// ==============================

function loading(text, callback){

    skipAction = false;


    status.style.display = "block";
    status.innerHTML = text;


    progressContainer.style.display = "block";

    bar.style.width = "0%";


    let progress = 0;



    currentTimer = setInterval(()=>{


        progress += Math.floor(Math.random()*15)+5;


        if(progress >= 100){

            progress = 100;

            clearInterval(currentTimer);

            bar.style.width="100%";


            setTimeout(callback,300);

        }


        bar.style.width =
            progress + "%";



        if(skipAction){


            clearInterval(currentTimer);


            bar.style.width="100%";


            skipAction=false;


            setTimeout(callback,100);

        }


    },150);

}



// ==============================
// START LOADING
// ==============================

loading(
"Идет идентификация пользователя...",
()=>{

    loading(
    "Получение банковских реквизитов...",
    ()=>{

        loading(
        "Чтение CVV...",
        ()=>{


            title.style.display="none";
            status.style.display="none";
            progressContainer.style.display="none";


            setTimeout(()=>{


                status.style.display="block";


                status.innerHTML =
                "Денежных средств обнаружено не было...";


                setTimeout(()=>{


                    status.style.display="none";


                    identityBlock.classList.remove("hidden");



                    setTimeout(()=>{

                        button.style.display="block";

                    },800);



                },2000);



            },500);



        });

    });

});






// ==============================
// MAIN BUTTON
// ==============================


button.addEventListener("click",()=>{


    if(buttonState==="identity"){


        buttonState="offer";


        title.style.display="block";


        title.innerHTML =
            "ДОСТУП РАЗРЕШЕН";


        identityBlock.style.display="none";


        button.style.display="none";


        status.style.display="block";


        status.innerHTML =
            "Персональное предложение сформировано";



        setTimeout(()=>{


            if(buttonState==="offer"){


                button.innerHTML="ПОЛУЧИТЬ";


                button.style.display="block";


            }


        },1500);



        return;

    }





    if(buttonState==="offer"){


        buttonState="invitation";


        button.style.display="none";


        title.style.display="none";

        status.style.display="none";


        showScreen(envelopeScreen);



        currentScreen="invitation";


        backButton.classList.add("hidden");


    }



});




// ==============================
// NO BUTTON
// ==============================


const noMessages=[

    "Ты шутишь?",
    "ОКАК",
    "Мяу",
    "Никаких",
    "Не зли меня"

];




noButton.addEventListener("click",()=>{


    noClicks++;



    if(!noEscaped){


        const placeholder =
            document.createElement("div");


        placeholder.style.width =
            noButton.offsetWidth+"px";


        placeholder.style.height =
            noButton.offsetHeight+"px";


        placeholder.style.visibility =
            "hidden";



        noButton.parentNode.insertBefore(
            placeholder,
            noButton
        );


        document.body.appendChild(noButton);



        noEscaped=true;

    }




    let scale =
        1-(noClicks*0.15);



    if(scale<0.15){

        scale=0.15;

    }



    noButton.style.transform =
        `scale(${scale})`;



    if(noClicks<=5){

        systemMessage.innerHTML =
            noMessages[noClicks-1];

    }



    if(noClicks>=6){


        noButton.style.transform="scale(0)";

        noButton.style.opacity="0";

        noButton.style.pointerEvents="none";



        setTimeout(()=>{


            systemMessage.innerHTML =
                "Дельфины";


        },500);



        return;

    }



    noButton.style.position="fixed";

    noButton.style.zIndex="9999";



    const x =
        Math.random()*(window.innerWidth-150);


    const y =
        Math.random()*(window.innerHeight-100);



    noButton.style.left =
        Math.max(20,x)+"px";


    noButton.style.top =
        Math.max(20,y)+"px";


});





// ==============================
// SKIP LOADING
// ==============================


document.body.addEventListener("click",(event)=>{


    if(event.target.tagName!=="BUTTON"){

        skipAction=true;

    }


});





// ==============================
// YES BUTTON
// ==============================


yesButton.addEventListener("click",()=>{

    createHeartExplosion();

    buttonState="date";


    noButton.style.opacity="0";

    noButton.style.pointerEvents="none";



    setTimeout(()=>{


        noButton.style.display="none";


    },300);



    hideElement(envelopeScreen);



    setTimeout(()=>{


        showScreen(dateScreen);


        currentScreen="date";


        backButton.classList.remove("hidden");


    },500);



});





// ==============================
// CALENDAR DATA
// ==============================


const dateButton =
    document.getElementById("dateButton");


const calendar =
    document.getElementById("calendar");


const calendarGrid =
    document.getElementById("calendarGrid");


const prevMonth =
    document.getElementById("prevMonth");


const nextMonth =
    document.getElementById("nextMonth");


const monthTitle =
    document.getElementById("monthName");


const dateText =
    document.getElementById("dateText");



const monthNames={

    7:"Июль",
    8:"Август"

};



const fullMonthNames={

    "07":"июля",
    "08":"августа"

};



const availableDates=[

    "29.07",
    "30.07",

    "03.08",
    "04.08",
    "05.08",
    "06.08",
    "07.08",
    "08.08",
    "09.08"

];





function renderCalendar(){


    calendarGrid.innerHTML="";


    monthTitle.innerHTML =
        monthNames[currentMonth];



    const year=2026;


    const daysInMonth=31;



    let firstDay =
        new Date(
            year,
            currentMonth-1,
            1
        ).getDay();



    if(firstDay===0){

        firstDay=7;

    }



    for(let i=1;i<firstDay;i++){


        calendarGrid.appendChild(
            document.createElement("div")
        );


    }



    for(let day=1;day<=daysInMonth;day++){


        const btn =
            document.createElement("button");


        btn.innerHTML=day;



        const key =
            String(day).padStart(2,"0")
            +"."+
            String(currentMonth).padStart(2,"0");



        if(availableDates.includes(key)){


            btn.classList.add(
                "availableDate"
            );



            btn.addEventListener("click",()=>{


                document
                .querySelectorAll(".calendarGrid button")
                .forEach(item=>{

                    item.classList.remove(
                        "selectedDate"
                    );

                });



                btn.classList.add(
                    "selectedDate"
                );



                selectedDate=key;


                const parts =
                    key.split(".");


                dateText.innerHTML =
                    Number(parts[0])
                    +" "
                    +fullMonthNames[parts[1]];



                calendar.classList.add("hidden");



                checkConfirm();


            });


        }
        else {


            btn.classList.add(
                "disabledDate"
            );


        }



        calendarGrid.appendChild(btn);


    }


}





// ==============================
// CALENDAR OPEN
// ==============================


dateButton.addEventListener("click",()=>{


    timePicker.classList.add("hidden");


    calendar.classList.toggle("hidden");



    if(!calendar.classList.contains("hidden")){

        renderCalendar();

    }


});





prevMonth.onclick=(event)=>{


    event.stopPropagation();



    currentMonth =
        currentMonth===7 ? 8 : 7;



    renderCalendar();


};




nextMonth.onclick=(event)=>{


    event.stopPropagation();



    currentMonth =
        currentMonth===8 ? 7 : 8;



    renderCalendar();


};





// ==============================
// TIME PICKER
// ==============================


const timeButton =
    document.getElementById("timeButton");


const timePicker =
    document.getElementById("timePicker");



timeButton.addEventListener("click",(event)=>{


    event.stopPropagation();


    calendar.classList.add("hidden");


    timePicker.classList.toggle("hidden");



    if(timePicker.children.length)
        return;



    for(let hour=10;hour<=22;hour++){


        for(let min=0;min<60;min+=15){


            const btn =
                document.createElement("button");



            btn.innerHTML =
                `${hour}:${String(min).padStart(2,"0")}`;



            btn.addEventListener("click",(event)=>{


                event.stopPropagation();



                document
                .querySelectorAll("#timePicker button")
                .forEach(item=>{

                    item.classList.remove(
                        "selectedTime"
                    );

                });



                btn.classList.add(
                    "selectedTime"
                );



                selectedTime =
                    btn.innerHTML;



                document.getElementById("timeText")
                .innerHTML =
                    selectedTime;



                timePicker.classList.add(
                    "hidden"
                );



                checkConfirm();


            });



            timePicker.appendChild(btn);


        }


    }


});





// ==============================
// CONFIRM
// ==============================


const confirmButton =
    document.getElementById("confirmButton");


const errorMessage =
    document.getElementById("errorMessage");




function checkConfirm(){


    const ready =
        selectedDate &&
        selectedTime;



    confirmButton.disabled =
        !ready;



    if(ready){

        confirmButton.classList.add(
            "ready"
        );

    }
    else{

        confirmButton.classList.remove(
            "ready"
        );

    }


}






function showError(text){


    errorMessage.innerHTML=text;



    confirmButton.classList.remove(
        "error"
    );


    void confirmButton.offsetWidth;


    confirmButton.classList.add(
        "error"
    );



    setTimeout(()=>{


        confirmButton.classList.remove(
            "error"
        );


    },500);


}





confirmButton.addEventListener("click",()=>{


    if(!selectedDate || !selectedTime)
        return;



    const [hour,minute] =
        selectedTime.split(":")
        .map(Number);



    const value =
        hour*60+minute;



    let message="";



    if(
        value>=600 &&
        value<=765
    ){

        message="РАНО!";

    }



    if(
        value>=780 &&
        value<=1020
    ){


        const parts =
            selectedDate.split(".");


        const date =
            new Date(
                2026,
                Number(parts[1])-1,
                Number(parts[0])
            );


        const day =
            date.getDay();



        if(day!==0 && day!==6){

            message="Работаю :(";

        }


    }



    if(message){

        showError(message);

        return;

    }





    hideElement(dateScreen);



    setTimeout(()=>{


        showScreen(ideasScreen);


        currentScreen="ideas";


    },400);



});






// ==============================
// OUTSIDE CLICK
// ==============================


document.addEventListener("click",(event)=>{


    if(
        !calendar.contains(event.target) &&
        !dateButton.contains(event.target)
    ){

        calendar.classList.add("hidden");

    }



    if(
        !timePicker.contains(event.target) &&
        !timeButton.contains(event.target)
    ){

        timePicker.classList.add("hidden");

    }


});





// ==============================
// IDEAS
// ==============================


document
.querySelectorAll(".ideaCard")
.forEach(btn=>{


    btn.addEventListener("click",()=>{


        const text =
            btn.textContent
            .replace(/\s+/g," ")
            .trim();



        if(btn.classList.contains("customCard")){


            hideElement(ideasScreen);



            setTimeout(()=>{


                showScreen(customIdeaScreen);


                currentScreen="custom";


                customIdeaInput.focus();



            },400);



            return;


        }




        finalText.innerHTML =
    "Я все сделаю :)";



        hideElement(ideasScreen);



        setTimeout(()=>{


            showScreen(finalScreen);


            currentScreen="final";


        },400);



    });


});





// ==============================
// CUSTOM IDEA
// ==============================


customIdeaButton.addEventListener("click",()=>{


    const value =
        customIdeaInput.value.trim();



    if(!value){


        customIdeaButton.classList.remove(
            "error"
        );


        void customIdeaButton.offsetWidth;


        customIdeaButton.classList.add(
            "error"
        );


        customIdeaInput.focus();


        setTimeout(()=>{


            customIdeaButton.classList.remove(
                "error"
            );


        },500);


        return;

    }



    finalText.innerHTML =
        "Я все сделаю :)";


    hideElement(customIdeaScreen);



    setTimeout(()=>{


        showScreen(finalScreen);


        currentScreen="final";


    },400);


});





// ==============================
// BACK BUTTON
// ==============================


backButton.addEventListener("click",()=>{


    if(currentScreen==="date"){


        hideElement(dateScreen);


        showScreen(envelopeScreen);



        currentScreen="invitation";


        backButton.classList.add(
            "hidden"
        );


        return;

    }




    if(currentScreen==="ideas"){


        hideElement(ideasScreen);


        showScreen(dateScreen);



        currentScreen="date";


        return;

    }




    if(currentScreen==="custom"){


        hideElement(customIdeaScreen);


        showScreen(ideasScreen);



        currentScreen="ideas";


        return;

    }




    if(currentScreen==="final"){


        hideElement(finalScreen);


        showScreen(ideasScreen);



        currentScreen="ideas";


    }


});


// ==============================
// HEART EXPLOSION
// ==============================

function createHeartExplosion(){

    const buttonRect = yesButton.getBoundingClientRect();


    for(let i = 0; i < 35; i++){


        const heart = document.createElement("div");


        heart.innerHTML = "♥";


        heart.className = "flyingHeart";



        heart.style.left =
            buttonRect.left +
            buttonRect.width / 2 +
            "px";


        heart.style.top =
            buttonRect.top +
            buttonRect.height / 2 +
            "px";



        const x =
            (Math.random() - 0.5) * 400;


        const y =
            (Math.random() - 0.5) * 350;



        const rotate =
            (Math.random() - 0.5) * 80;



        heart.style.setProperty(
            "--x",
            x + "px"
        );


        heart.style.setProperty(
            "--y",
            y + "px"
        );


        heart.style.setProperty(
            "--rotate",
            rotate + "deg"
        );



        document.body.appendChild(heart);



        setTimeout(()=>{

            heart.remove();

        },1200);


    }

}