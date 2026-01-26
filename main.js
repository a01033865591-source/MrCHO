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

// Generate roulette segments dynamically
// More distinct colors for better visibility
const segmentColors = [
    '#FFC0CB', '#ADD8E6', '#90EE90', '#FFD700', '#FFA07A', '#DDA0DD',
    '#B0E0E6', '#F0E68C', '#FAFAD2', '#D8BFD8', '#FFB6C1', '#87CEEB'
];
const segmentAngle = 360 / chores.length;

chores.forEach((chore, index) => {
    const segment = document.createElement('div');
    segment.className = 'roulette-segment';
    segment.style.backgroundColor = segmentColors[index % segmentColors.length];
    
    // Rotate the entire segment div
    segment.style.transform = `rotate(${index * segmentAngle}deg)`;
    
    // Create inner div for text to counteract segment rotation and position it
    const textWrapper = document.createElement('div');
    textWrapper.className = 'segment-text-wrapper';
    textWrapper.textContent = chore;
    // Rotate text back so it's horizontal, and position it towards the outer edge
    textWrapper.style.transform = `rotate(${segmentAngle / 2}deg) translate(0, -100%) rotate(${-index * segmentAngle - segmentAngle / 2}deg)`;
    textWrapper.style.paddingTop = '10px'; // Adjust padding to move text
    
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
let currentRotation = 0; // Keep track of the current rotation for continuous spins
spinRouletteBtn.addEventListener('click', () => {
    spinRouletteBtn.disabled = true; // Disable button during spin
    choreFinalResultElem.textContent = ''; // Clear previous result

    const randomIndex = Math.floor(Math.random() * chores.length);
    const selectedChore = chores[randomIndex];

    // Calculate rotation for the selected segment
    // We want the selected segment to land under the pointer.
    // The pointer is at 0 degrees (top).
    // The target is the center of the selected segment.
    // `randomIndex * segmentAngle` is the start of the segment.
    // `randomIndex * segmentAngle + segmentAngle / 2` is the center.
    // To land on the center, we need to rotate by `-(center_angle)` relative to the pointer.
    // Plus add multiple full rotations for a good spin effect.
    
    const baseRotations = 5 * 360; // Spin at least 5 full rotations
    const targetSegmentOffset = randomIndex * segmentAngle; // Start of the segment
    const landingAngle = targetSegmentOffset + (segmentAngle / 2); // Center of the segment

    // Calculate how much more to rotate from the current position
    // We want the landingAngle to end up at 0 degrees (top).
    // So, rotation_needed = (360 - landingAngle) + current_rotation
    // To ensure it lands under the pointer (which is conceptually at 0 degrees or 360 degrees, pointing "up")
    // We need to rotate the wheel such that the selected segment's center is aligned with the pointer.
    // The pointer points "up" (0 degrees). A segment's start is at `index * segmentAngle`.
    // The amount to rotate is `(360 - (start_angle + half_angle)) + base_rotations`
    // Example: If segment 0 is from 0-60 degrees, its center is 30. We need to rotate by (360 - 30) = 330 degrees.
    // If segment 1 is from 60-120 degrees, its center is 90. We need to rotate by (360 - 90) = 270 degrees.
    
    const finalRotationTarget = baseRotations + (360 - landingAngle);

    currentRotation = finalRotationTarget; // Set the new rotation directly

    rouletteWheel.style.transition = 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)'; // Apply transition
    rouletteWheel.style.transform = `rotate(${currentRotation}deg)`;

    // Wait for the transition to end
    rouletteWheel.addEventListener('transitionend', function handler() {
        rouletteWheel.removeEventListener('transitionend', handler);
        choreFinalResultElem.textContent = `당첨! ${selectedChore}`;
        spinRouletteBtn.disabled = false; // Re-enable button
        // Optional: Reset rotation to a smaller value to avoid excessively large numbers
        // and maintain visual continuity for the next spin.
        // currentRotation = currentRotation % 360; 
        // rouletteWheel.style.transition = 'none'; // Temporarily disable transition
        // rouletteWheel.style.transform = `rotate(${currentRotation}deg)`;
    });
});
