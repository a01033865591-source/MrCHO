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
            "소고기를 양념에 재운",
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
    },
    {
        name: "초밥",
        recipe: [
            "초밥용 밥을 준비한다.",
            "신선한 해산물을 밥 위에 올린다.",
            "간장과 와사비를 곁들여 먹는다."
        ]
    },
    {
        name: "파스타",
        recipe: [
            "파스타 면을 삶는다.",
            "팬에 소스를 만들고 면을 넣어 볶는다.",
            "치즈를 뿌려 마무리한다."
        ]
    },
    {
        name: "피자",
        recipe: [
            "도우에 토마토 소스를 바른다.",
            "모든 재료를 올리고 치즈를 듬뿍 뿌린다.",
            "오븐에 굽는다."
        ]
    },
    {
        name: "스테이크",
        recipe: [
            "고기에 소금과 후추로 간을 한다.",
            "팬에 앞뒤로 굽는다.",
            "레스팅 후 썰어서 서빙한다."
        ]
    },
    {
        name: "샐러드",
        recipe: [
            "신선한 채소를 깨끗이 씻어 준비한다.",
            "취향에 맞는 드레싱을 뿌린다.",
            "닭가슴살이나 견과류를 추가하여 더욱 풍성하게 즐긴다."
        ]
    }
];

const recommendBtn = document.getElementById('recommend-btn');
const resultDiv = document.getElementById('result');
const foodNameElem = document.getElementById('food-name');
const recipeDiv = document.getElementById('recipe');

// Lotto elements
const generateLottoBtn = document.getElementById('generate-lotto-btn');
const lottoGamesContainer = document.getElementById('lotto-games-container'); 

// Chore Roulette elements
const spinRouletteBtn = document.getElementById('spin-roulette-btn');
const choreFinalResultElem = document.getElementById('chore-final-result'); 
const rouletteWheel = document.getElementById('roulette-wheel'); 
const chores = ["설거지하기", "방 청소하기", "밥 차리기", "빨래하기", "재활용 버리기", "쓰레기 버리기"]; 

// More distinct colors for better visibility
const segmentColors = [
    '#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF',
    '#BDB2FF', '#FFC6FF', '#FFFFFC', '#E0BBE4', '#957DAD', '#FFC3A0'
];
const segmentAngle = 360 / chores.length;

// Dynamically generate roulette segments
rouletteWheel.innerHTML = ''; 
chores.forEach((chore, index) => {
    const segment = document.createElement('div');
    segment.className = 'roulette-segment';
    segment.style.backgroundColor = segmentColors[index % segmentColors.length];
    
    // Rotate each segment into position
    segment.style.transform = `rotate(${index * segmentAngle}deg)`;
    
    // Create text wrapper inside segment
    const textWrapper = document.createElement('div');
    textWrapper.className = 'segment-text-content';
    textWrapper.textContent = chore;
    // No counter-rotation here, text will rotate with the segment
    
    segment.appendChild(textWrapper);
    rouletteWheel.appendChild(segment);
});


// Food recommendation logic
recommendBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * foods.length);
    const selectedFood = foods[randomIndex];

    foodNameElem.textContent = selectedFood.name;
    
    let recipeHtml = '<ol>';
    if (typeof selectedFood.recipe[0] === 'object') { 
        recipeHtml += selectedFood.recipe.map(step => `
            <li>
                <span>${step.text}</span>
            </li>
        `).join('');
    } else { 
        recipeHtml += selectedFood.recipe.map(step => `<li>${step}</li>`).join('');
    }
    recipeHtml += '</ol>';
    recipeDiv.innerHTML = recipeHtml;
    
    resultDiv.classList.remove('hidden');
});


// Lotto number generation logic (5 games)
generateLottoBtn.addEventListener('click', () => {
    lottoGamesContainer.innerHTML = ''; 

    for (let i = 0; i < 5; i++) { 
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
let currentRotation = 0; 
spinRouletteBtn.addEventListener('click', () => {
    spinRouletteBtn.disabled = true; // Disable button during spin
    choreFinalResultElem.textContent = ''; // Clear previous result

    const randomIndex = Math.floor(Math.random() * chores.length);
    const selectedChore = chores[randomIndex];

    const baseRotations = 5 * 360; // Spin at least 5 full rotations (user's example uses 1440 = 4*360)
    // Adjust targetAngle to land the center of the selected chore under the pointer (top center)
    const targetAngle = 360 - (randomIndex * segmentAngle + segmentAngle / 2); 
    
    const totalRotation = currentRotation + baseRotations + targetAngle; // Accumulate for continuous effect

    rouletteWheel.style.transition = 'transform 4s cubic-bezier(0.2, 0.8, 0.3, 1)'; // User's provided transition
    rouletteWheel.style.transform = `rotate(${totalRotation}deg)`;

    currentRotation = totalRotation; // Update currentRotation

    // Wait for the transition to end
    rouletteWheel.addEventListener('transitionend', function handler() {
        rouletteWheel.removeEventListener('transitionend', handler);
        choreFinalResultElem.textContent = `당첨! ${selectedChore}`;
        spinRouletteBtn.disabled = false; // Re-enable button
    });
});