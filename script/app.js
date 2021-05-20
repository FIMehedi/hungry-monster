const createFoodItem = (name, img) => {
    return `<img src="${img}" alt="">
            <div class="card-body text-center py-3">
                <p class="m-0 font-weight-bold">${name}</p>
            </div>`
}

// Show Details
const showDetails = food => {
    document.getElementById('ingredients').innerHTML = ''; // remove previous item ingredients
    document.getElementById('details-img').style.backgroundImage = `url(${food.strMealThumb})`;
    document.getElementById('details-name').innerText = food.strMeal;

    // ingredients
    for (let i = 0; i < 20; i++) { // every object has maximum 20 ingredients
        const measure = food[`strMeasure${i}`];
        const ingredient = food[`strIngredient${i}`];

        if (measure && ingredient) {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = 'assets/checkmark.svg';
            li.appendChild(img);
            li.innerHTML += ` ${measure} ${ingredient}`;
            document.getElementById('ingredients').appendChild(li);
        }
    }

}

// Show search Foods
const showData = foods => {
    foods.forEach(food => {
        const foodItem = createFoodItem(food.strMeal, food.strMealThumb);
        const div = document.createElement('div');
        div.innerHTML = foodItem;
        div.classList = 'card food-item';
        div.setAttribute('data-toggle', 'modal');
        div.setAttribute('data-target', '#foodDetails'); // div set as modal button
        div.addEventListener('click', () => {
            showDetails(food);
        })
        document.getElementById('foods-container').appendChild(div);
    });
    document.getElementById('spinner').style.display = 'none';
}


// Search Button Event
document.getElementById('search-btn').addEventListener('click', () => {
    const searchText = document.getElementById('input-box').value;
    if (searchText.trim() == '') {
        alert('Input should not be empty!')
    }
    else {
        document.getElementById('spinner').style.display = 'block'; // spinner show
        document.getElementById('foods-container').innerHTML = '';  // remove previous search food
        document.getElementById('notFound').style.display = 'none'; // not found msg

        fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.meals) {
                    document.getElementById('notFound').style.display = 'none';
                    showData(data.meals);
                }
                else {
                    document.getElementById('notFound').style.display = 'block';
                    document.getElementById('spinner').style.display = 'none';
                }
            });
    }
})