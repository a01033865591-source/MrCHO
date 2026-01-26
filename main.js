const foods = [
    {
        name: "김치찌개",
        recipe: [
            { text: "김치와 돼지고기를 볶는다." },
            { text: "육수를 붓고 끓인다." },
            { text: "두부, 파 등을 넣고 한소끔 더 끓인다." },
            { text: "간을 맞춘다." }
        ]
    },
    {
        name: "불고기",
        recipe: [
            "소고기를 양념에 재운다.",
            "팬에 양념된 고기와 채소를 볶는다.",
            "국물이 자작하게 졸아들면 완성."
        ]
    },
    {
        name: "비빔밥",
        recipe: [
            "밥 위에 각종 나물과 고기를 올린다.",
            "고추장을 넣고 비빈다.",
            "취향에 따라 계란 프라이를 추가한다."
        ]
    },
    {
        name: "짜장면",
        recipe: [
            "춘장을 볶고 돼지고기와 채소를 넣고 볶는다.",
            "물을 넣고 끓인 후 전분으로 농도를 조절한다.",
            "삶은 면 위에 소스를 붓는다."
        ]
    },
    {
        name: "라면",
        recipe: [
            "냄비에 물을 끓인다.",
            "면과 스프를 넣고 끓인다.",
            "계란, 파 등을 추가하여 취향껏 즐긴다."
        ]
    },
    {
        name: "떡볶이",
        recipe: [
            "냄비에 물, 고추장, 고춧가루, 설탕을 넣고 끓인다.",
            "떡과 어묵을 넣고 졸인다.",
            "파, 양파 등을 추가하여 마무리한다."
        ]
    }
];

const recommendBtn = document.getElementById('recommend-btn');
const resultDiv = document.getElementById('result');
const foodNameElem = document.getElementById('food-name');
const recipeDiv = document.getElementById('recipe');

// Lotto elements
const generateLottoBtn = document.getElementById('generate-lotto-btn');
const lottoGamesContainer = document.getElementById('lotto-games-container'); // Changed to container

// Chore Roulette elements
const spinRouletteBtn = document.getElementById('spin-roulette-btn');
const choreResultElem = document.getElementById('chore-result');
const chores = ["설거지하기", "방 청소하기", "밥 차리기", "빨래하기", "재활용 버리기", "쓰레기 버리기"]; // Added more chores for variety


// Food recommendation logic
recommendBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * foods.length);
    const selectedFood = foods[randomIndex];

    foodNameElem.textContent = selectedFood.name;
    
    let recipeHtml = '<ol>';
    if (typeof selectedFood.recipe[0] === 'object') { // Check if recipe steps are objects
        recipeHtml += selectedFood.recipe.map(step => `
            <li>
                <span>${step.text}</span>
            </li>
        `).join('');
    } else { // Assume recipe steps are strings
        recipeHtml += selectedFood.recipe.map(step => `<li>${step}</li>`).join('');
    }
    recipeHtml += '</ol>';
    recipeDiv.innerHTML = recipeHtml;
    
    resultDiv.classList.remove('hidden');
});


// Lotto number generation logic (5 games)
generateLottoBtn.addEventListener('click', () => {
    lottoGamesContainer.innerHTML = ''; // Clear previous numbers

    for (let i = 0; i < 5; i++) { // Generate 5 games
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
        
        const lottoGameDiv = document.createElement('div');
        lottoGameDiv.className = 'lotto-game';
        
        sortedNumbers.forEach(num => {
            const span = document.createElement('span');
            span.className = 'lotto-number';
            span.textContent = num;
            lottoGameDiv.appendChild(span);
        });
        lottoGamesContainer.appendChild(lottoGameDiv);
    }
});


// Chore Roulette logic
spinRouletteBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * chores.length);
    choreResultElem.textContent = chores[randomIndex];
});