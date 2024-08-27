async function getData() {
    const url = "https://api.adviceslip.com/advice";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        document.querySelector('.advice_title span').textContent = json.slip.id
        document.querySelector('.advice_text').textContent = `"${json.slip.advice}"`
    } catch (error) {
        console.error(error.message);
    }
}

getData()

function loadNewAdvices() {
    const loadBtn = document.querySelector('.load_new_advice_btn')
    loadBtn.addEventListener('click', () => {
        getData()
    });
}

loadNewAdvices()
