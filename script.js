//Definindo os hábitos padrão para o início do site
const habs = [
    {
        id: 1,
        title: 'Draw something!',
        src: './pictures/draw.png'
    },
    {
        id: 2,
        title: 'Exercise!',
        src: './pictures/exercise.png'
    },
    {
        id: 3,
        title: 'Play an instrument!',
        src: './pictures/guitar.png'
    },
    {
        id: 4,
        title: 'Code!',
        src: './pictures/programming.png'
    },
    {
        id: 5,
        title: 'Read something!',
        src: './pictures/read.png'
    },
    {
        id: 6,
        title: 'Study!',
        src: './pictures/study.png'
    },
    {
        id: 7,
        title: 'Go for a walk!',
        src: './pictures/walk.png'
    },
    {
        id: 8,
        title: 'Drink water!',
        src: './pictures/water.png'
    },
]
//Definindo uma lista para os hábitos embaralhados
let shuffledHabs = []

//Quando carregar a página, exectuar a função
document.addEventListener('DOMContentLoaded', () => {
    generateHabits();
})

//Buscando o container dos hábitos
const habitsContainer = document.querySelector('.habits')

//Função principal que irá gerar e regerar os hábitos
function generateHabits() {

    //Função para gerar números aleátorios e usá-los como index para embaralhar os hábitos
    function getRandomImg(objs) {
        let i = objs.length //Define i como sendo o tamanho do array 
        for (i; i > 0; i--){ //Repetição para todos os itens do array (Poderia usar forEach)
        const randomIndex = Math.floor(Math.random() * objs.length); //Buscar um número aleatório até no máximo o tamanho do array para não buscar um index inexistente, como por exemplo 918
        const arrImgs = objs[randomIndex] //Adicionando os hábitos aleatórios em arrImgs
        objs.splice(randomIndex, 1) //Retirando o index aleatório de habs para evitar repetição
        shuffleHabits(arrImgs) //Executa a função de embaralhar com a lista dos hábitos embaralhados
        }
        
    }

    getRandomImg(habs) //Envia o array dos hábitos como argumento da função acima


    function shuffleHabits(arr) {
        shuffledHabs.push(arr) //Adiciona o hábitos enviado pelo arr chamado pela função getRandomImg
        loadHabits(shuffledHabs.slice(0, 5)) //Executa a função para carregar os hábitos com somente os 5 primeiros itens do array
    }



    function loadHabits(habits) {
        
        let displayHabits = habits.map(function (habit) { //Função para cada um dos 5 hábitos dos hábitos embaralhados 

            return `<div class="habit">
            <img class='habit-icon' src="${habit.src}" alt="">
            <h3 class="habit-name">${habit.title}</h3>
            <input type='checkbox'class="habit-btn"></input>
            <button class="delete-habit" onclick='deleteHabit(event)'>
                <i class="fa-solid fa-trash"></i>
            </button>
            </div>`
        });
        displayHabits = displayHabits.join('')
        habitsContainer.innerHTML = displayHabits //Adiciona o valor da função retornada no HTML do container de hábitos
    }

}

function regenerateHabits() {
    habs.push(...shuffledHabs) //Adiciona o valor dos hábitos embaralhados dentro de habs
    shuffledHabs.length = 0 //Zera os hábitos embaralhados para não acumular os mesmos dados dentro do array embaralhado
    generateHabits() //Executa a função de gerar hábitos para regerar novos hábitos
}


function deleteHabit(event){
    targ = event.target;
    closestDiv = targ.closest('div')
    closestDiv.remove()
}

function addHabit(){
    const habName = document.querySelector('#new-habit-name')
    const habIcon = document.querySelector('#new-habit-link')
    let habNameTxt = habName.value
    let habLinkTxt = habIcon.value

    if (habNameTxt == ''){
        window.alert('Preencha o nome')
    } 
    newHabit = `<div class="habit">
    <img class='habit-icon' src="${habLinkTxt}" alt="">
    <h3 class="habit-name">${habNameTxt}</h3>
    <input type='checkbox'class="habit-btn"></input>
    <button class="delete-habit" onclick='deleteHabit(event)'>
        <i class="fa-solid fa-trash"></i>
    </button>
    </div>`
    habitsContainer.insertAdjacentHTML('beforeend', newHabit);

    habName.value = ''
    habIcon.value = ''
}

const popupContainer = document.querySelector('.finish')
const closePopupBtn = document.querySelector('.close')

closePopupBtn.addEventListener('click', () => {
    popupContainer.style.display = 'none'
})

function habitsDone() {
    const allHabits = document.querySelectorAll('.habit-btn')
    let allCheck = true;
        allHabits.forEach((habit) => {
            if (!habit.checked) {
                allCheck = false;
            }
        })

    if (allCheck) {
        popupContainer.style.display = 'block';
    } else {
        showPopup();
    }
        
}

const popup = document.querySelector('.not-finished');

function showPopup() {
    popup.style.top = '12px'
    setTimeout(() => {
        hidePopup();
    }, 3000);
}


function hidePopup() {
    setTimeout(() => {
        popup.style.top = '-200px';
    }, 500);
}