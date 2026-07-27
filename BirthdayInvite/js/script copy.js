let skipAction = false;
let currentTimer = null;


const progressContainer = document.getElementById("progressContainer");
const status = document.getElementById("status");
const bar = document.getElementById("bar");

const button = document.getElementById("nextButton");

const title = document.getElementById("title");
const identityBlock = document.getElementById("identityBlock");

const envelopeScreen = document.getElementById("envelopeScreen");

const noButton = document.getElementById("noButton");
const systemMessage = document.getElementById("systemMessage");

const yesButton = document.getElementById("yesButton");
const dateScreen = document.getElementById("dateScreen");
const ideasScreen = document.getElementById("ideasScreen");

const backButton = document.getElementById("backButton");

const customIdeaScreen = document.getElementById("customIdeaScreen");
const customIdeaInput = document.getElementById("customIdeaInput");
const customIdeaButton = document.getElementById("customIdeaButton");

const finalScreen = document.getElementById("finalScreen");
const finalText = document.getElementById("finalText");

let currentScreen = "identity";


let buttonState = "identity";





// ==========================
// ЗАГРУЗКА
// ==========================


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

            bar.style.width = "100%";

            setTimeout(callback,300);

        }


        bar.style.width = progress+"%";



        if(skipAction){

            clearInterval(currentTimer);

            bar.style.width="100%";

            skipAction=false;

            setTimeout(callback,100);

        }



    },150);


}





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







// ==========================
// ОСНОВНАЯ КНОПКА
// ==========================


button.addEventListener("click",()=>{


    if(buttonState==="identity"){


        buttonState="offer";


        title.style.display="block";

        title.innerHTML=
        "ДОСТУП РАЗРЕШЕН";



        identityBlock.style.display="none";


        button.style.display="none";


        status.style.display="block";


        status.innerHTML=
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



        envelopeScreen.classList.remove("hidden");

        envelopeScreen.classList.add("show");

        currentScreen = "invitation";
        backButton.classList.add("hidden");


    }



});
// ==========================
// КНОПКА НЕТ
// ==========================


let noClicks=0;
let noEscaped=false;



const messages=[

"Ты шуишь?",
"ОКАК",
"Мяу",
"Никаких",
"Не зли меня"

];





noButton.addEventListener("click",()=>{


    noClicks++;



    if(!noEscaped){


        const placeholder=document.createElement("div");


        placeholder.style.width=
        noButton.offsetWidth+"px";


        placeholder.style.height=
        noButton.offsetHeight+"px";


        placeholder.style.visibility="hidden";



        noButton.parentNode.insertBefore(
            placeholder,
            noButton
        );


        document.body.appendChild(noButton);


        noEscaped=true;

    }



    let scaleSize=
    1-(noClicks*0.15);



    if(scaleSize<0.15)
        scaleSize=0.15;



    noButton.style.transform=
    `scale(${scaleSize})`;



    if(noClicks<=5){

        systemMessage.innerHTML=
        messages[noClicks-1];

    }



    if(noClicks>=6){


        noButton.style.transform="scale(0)";

        noButton.style.opacity="0";

        noButton.style.pointerEvents="none";


        setTimeout(()=>{

            systemMessage.innerHTML="Дельфины";

        },500);


        return;

    }



    noButton.style.position="fixed";

    noButton.style.zIndex="9999";



    let x=Math.random()*(window.innerWidth-150);

    let y=Math.random()*(window.innerHeight-100);



    noButton.style.left=
    Math.max(20,x)+"px";


    noButton.style.top=
    Math.max(20,y)+"px";

});

// ==========================
// ПРОПУСК АНИМАЦИЙ
// ==========================


document.body.addEventListener("click",(event)=>{


    if(event.target.tagName !== "BUTTON"){

        skipAction = true;

    }


});







// ==========================
// ДА В ПРИГЛАШЕНИИ
// ==========================


yesButton.addEventListener("click",()=>{


    buttonState = "date";


    // убираем сбежавшую кнопку НЕТ

    noButton.style.opacity = "0";

    noButton.style.pointerEvents = "none";


    setTimeout(()=>{

        noButton.style.display = "none";

    },300);



    envelopeScreen.classList.remove("show");

    envelopeScreen.classList.add("hidden");



    setTimeout(()=>{


        dateScreen.classList.remove("hidden");

        dateScreen.classList.add("show");

        currentScreen = "date";
        backButton.classList.remove("hidden");

    },500);


});








// ==========================
// КАЛЕНДАРЬ
// ==========================


const dateButton = document.getElementById("dateButton");

const calendar = document.getElementById("calendar");

const calendarGrid = document.getElementById("calendarGrid");

const prevMonth = document.getElementById("prevMonth");

const nextMonth = document.getElementById("nextMonth");

const monthTitle = document.getElementById("monthName");

const dateText = document.getElementById("dateText");



let currentMonth = 7;


let selectedDate = null;

let selectedTime = null;



const monthNames = {

    7:"Июль",

    8:"Август"

};



const fullMonthNames = {

    "07":"июля",

    "08":"августа"

};




const availableDates = [

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



    let year = 2026;



    let daysInMonth = 31;



    let firstDay =
        new Date(
            year,
            currentMonth-1,
            1
        ).getDay();



    if(firstDay === 0){

        firstDay = 7;

    }



    for(let i=1;i<firstDay;i++){


        let empty =
            document.createElement("div");


        calendarGrid.appendChild(empty);


    }






    for(let day=1; day<=daysInMonth; day++){



        let btn =
            document.createElement("button");



        btn.innerHTML = day;



        let key =
            String(day).padStart(2,"0")
            +
            "."
            +
            String(currentMonth).padStart(2,"0");





        if(availableDates.includes(key)){



            btn.classList.add(
                "availableDate"
            );



            btn.addEventListener(
                "click",
                ()=>{


                    document
                    .querySelectorAll(
                        ".calendarGrid button"
                    )
                    .forEach(
                        b=>
                        b.classList.remove(
                            "selectedDate"
                        )
                    );



                    btn.classList.add(
                        "selectedDate"
                    );



                    selectedDate = key;



                    let parts =
                        key.split(".");


                    let dayNumber =
                        Number(parts[0]);


                    let month =
                        parts[1];



                    dateText.innerHTML =
                        dayNumber +
                        " " +
                        fullMonthNames[month];



                    calendar.classList.add(
                        "hidden"
                    );



                    checkConfirm();


                }
            );



        }
        else {


            btn.classList.add(
                "disabledDate"
            );


        }



        calendarGrid.appendChild(btn);


    }



}






dateButton.addEventListener(
"click",
(event)=>{


    if(
        event.target.classList.contains("monthArrow")
    ){
        return;
    }

    timePicker.classList.add("hidden");

    calendar.classList.toggle("hidden");


    if(
        !calendar.classList.contains("hidden")
    ){
        renderCalendar();
    }


});






// ==========================
// ПЕРЕКЛЮЧЕНИЕ МЕСЯЦЕВ (ЦИКЛ)
// ==========================


prevMonth.onclick = (event)=>{

    event.stopPropagation();


    if(currentMonth === 7){

        currentMonth = 8;

    } else {

        currentMonth = 7;

    }


    renderCalendar();

};





nextMonth.onclick = (event)=>{

    event.stopPropagation();


    if(currentMonth === 8){

        currentMonth = 7;

    } else {

        currentMonth = 8;

    }


    renderCalendar();

};








// ==========================
// ВРЕМЯ
// ==========================


const timeButton =
document.getElementById("timeButton");


const timePicker =
document.getElementById("timePicker");



timeButton.addEventListener(
"click",
(event)=>{


    event.stopPropagation();

    calendar.classList.add("hidden");


    timePicker.classList.toggle(
        "hidden"
    );



    if(timePicker.children.length > 0)
    return;



    for(let hour = 10; hour <= 22; hour++){


        for(
            let min = 0;
            min < 60;
            min += 15
        ){



            let btn =
            document.createElement("button");



            btn.innerHTML =
            `${hour}:${String(min).padStart(2,"0")}`;



            btn.addEventListener(
            "click",
            (event)=>{


                event.stopPropagation();



                document
                .querySelectorAll(
                    "#timePicker button"
                )
                .forEach(
                    b =>
                    b.classList.remove(
                        "selectedTime"
                    )
                );



                btn.classList.add(
                    "selectedTime"
                );



                selectedTime =
                    btn.innerHTML;



                document.getElementById("timeText").innerHTML =
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









// ==========================
// ПОДТВЕРЖДЕНИЕ
// ==========================


const confirmButton =
document.getElementById("confirmButton");

const errorMessage =
document.getElementById("errorMessage");



confirmButton.addEventListener("click",()=>{


    if(
        !selectedDate ||
        !selectedTime
    ){
        return;
    }



    const [hourStr, minuteStr] =
        selectedTime.split(":");



    const timeValue =
        Number(hourStr) * 60 +
        Number(minuteStr);



    let message = "";



    // РАНО! — 10:00–12:45
    if(
        timeValue >= 600 &&
        timeValue <= 765
    ){
        message = "РАНО!";
    }



    // Работаю :( — 13:00–16:45
    // только в будни
    if(
        timeValue >= 780 &&
        timeValue <= 1005
    ){

        const [dayStr, monthStr] =
            selectedDate.split(".");



        const date =
            new Date(
                2026,
                Number(monthStr) - 1,
                Number(dayStr)
            );



        const weekDay =
            date.getDay();



        const isWeekend =
            weekDay === 0 || weekDay === 6;



        if(!isWeekend){
            message = "Работаю :(";
        }

    }



    if(message){

        errorMessage.innerHTML = message;


        confirmButton.classList.remove("error");
        void confirmButton.offsetWidth;
        confirmButton.classList.add("error");


        setTimeout(()=>{

            confirmButton.classList.remove("error");

        },500);


        return;
    }



    errorMessage.innerHTML = "";



    // ==========================
    // УСПЕШНЫЙ ВЫБОР
    // ==========================


    dateScreen.classList.remove("show");
    dateScreen.classList.add("hidden");


    setTimeout(()=>{

        ideasScreen.classList.remove("hidden");
        ideasScreen.classList.add("show");
        currentScreen = "ideas";

    },500);



});



function checkConfirm(){


    if(
        selectedDate &&
        selectedTime
    ){


        confirmButton.disabled = false;
        confirmButton.classList.add("ready");


    } else {


        confirmButton.disabled = true;
        confirmButton.classList.remove("ready");


    }


}
// проверка кнопки ВЫБРАТЬ

confirmButton.addEventListener("click",()=>{


    if(!selectedTime || !selectedDate)
        return;



    let message = "";



    let hour =
        Number(selectedTime.split(":")[0]);



    let minutes =
        Number(selectedTime.split(":")[1]);



    let timeValue =
        hour * 60 + minutes;



    // ==========================
    // РАНО! (10:00 - 12:45)
    // работает каждый день
    // ==========================


    if(
        timeValue >= 600 &&
        timeValue <= 765
    ){

        message = "РАНО!";

    }




    // ==========================
    // РАБОТАЮ :( (13:00 - 17:00)
    // только будни
    // ==========================


    if(
        timeValue >= 780 &&
        timeValue <= 1020
    ){


        let parts =
            selectedDate.split(".");


        let day =
            Number(parts[0]);


        let month =
            Number(parts[1]);



        let date =
            new Date(
                2026,
                month - 1,
                day
            );



        let weekDay =
            date.getDay();



        // 0 - воскресенье
        // 6 - суббота

        if(
            weekDay !== 0 &&
            weekDay !== 6
        ){

            message = "Работаю :(";

        }


    }





    if(message){


        errorMessage.innerHTML =
            message;



        confirmButton.classList.remove(
            "error"
        );


        // перезапуск анимации ошибки

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



});







function checkConfirm(){


    if(
        selectedDate &&
        selectedTime
    ){


        confirmButton.disabled =
            false;



        confirmButton.classList.add(
            "ready"
        );


    } 
    else {


        confirmButton.disabled =
            true;



        confirmButton.classList.remove(
            "ready"
        );


    }


}







// ==========================
// ЗАКРЫТИЕ КАЛЕНДАРЯ ПРИ КЛИКЕ ВНЕ
// ==========================


document.addEventListener("click", (event) => {


    const clickedInsideCalendar =
        calendar.contains(event.target);


    const clickedDateButton =
        dateButton.contains(event.target);



    if (
        !clickedInsideCalendar &&
        !clickedDateButton
    ) {

        calendar.classList.add("hidden");

    }


});

document.addEventListener("click", (event)=>{

    const clickedInsideTime =
        timePicker.contains(event.target);

    const clickedTimeButton =
        timeButton.contains(event.target);


    if(
        !clickedInsideTime &&
        !clickedTimeButton
    ){

        timePicker.classList.add("hidden");

    }

});



// ==========================
// ИДЕИ
// ==========================

const ideaButtons = document.querySelectorAll(".ideaCard");

ideaButtons.forEach((btn)=>{

    btn.addEventListener("click",()=>{

        const ideaText =
            btn.textContent.replace(/\s+/g," ").trim();

        // Свой вариант — отдельная форма
        if(btn.classList.contains("customCard")){

            ideasScreen.classList.remove("show");
            ideasScreen.classList.add("hidden");

            setTimeout(()=>{

                customIdeaScreen.classList.remove("hidden");
                customIdeaScreen.classList.add("show");

                customIdeaInput.focus();

            },400);

            return;

        }

        // Готовые варианты — сразу финал
        finalText.innerHTML =
            `Выбрано: <b>${ideaText}</b>`;

        ideasScreen.classList.remove("show");
        ideasScreen.classList.add("hidden");

        setTimeout(()=>{

            finalScreen.classList.remove("hidden");
            finalScreen.classList.add("show");

        },400);

    });

});




// ==========================
// СВОЙ ВАРИАНТ — ОТПРАВКА
// ==========================

customIdeaButton.addEventListener("click",()=>{

    const value = customIdeaInput.value.trim();

    if(!value){
        customIdeaInput.focus();
        return;
    }

    finalText.innerHTML =
        `Твой вариант: <b>${value}</b>`;

    customIdeaScreen.classList.remove("show");
    customIdeaScreen.classList.add("hidden");

    setTimeout(()=>{

        finalScreen.classList.remove("hidden");
        finalScreen.classList.add("show");

    },400);

});


// ==========================
// КНОПКА НАЗАД
// ==========================

backButton.addEventListener("click",()=>{

    if(currentScreen==="date"){

        dateScreen.classList.add("hidden");

        envelopeScreen.classList.remove("hidden");
        envelopeScreen.classList.add("show");

        currentScreen="invitation";
        backButton.classList.add("hidden");

        return;
    }

    if(currentScreen==="ideas"){

        ideasScreen.classList.add("hidden");

        dateScreen.classList.remove("hidden");
        dateScreen.classList.add("show");

        currentScreen="date";

        return;
    }

    if(currentScreen==="custom"){

        customIdeaScreen.classList.add("hidden");

        ideasScreen.classList.remove("hidden");
        ideasScreen.classList.add("show");

        currentScreen="ideas";

        return;
    }

    if(currentScreen==="final"){

        finalScreen.classList.add("hidden");

        ideasScreen.classList.remove("hidden");
        ideasScreen.classList.add("show");

        currentScreen="ideas";

    }

});