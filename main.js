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
// foodImageElem is no longer needed as the image tag is removed from index.html
const recipeDiv = document.getElementById('recipe');

recommendBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * foods.length);
    const selectedFood = foods[randomIndex];

    foodNameElem.textContent = selectedFood.name;
    // Removed foodImageElem.src assignment
    
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