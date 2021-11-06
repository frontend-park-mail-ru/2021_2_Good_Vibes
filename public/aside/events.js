import eventBus from "../scripts/eventBus.js";

const asideEvents = (element) => {
    const closeBtn = element.getElementsByClassName('aside-close-button')[0];

    closeBtn.addEventListener ('click', (event) => {
        event.preventDefault();

        eventBus.emit('hide aside');
    });

    const category = element.getElementsByClassName('title-category')[0];

    category.addEventListener('click', (event) => {
        event.preventDefault();

        eventBus.emit('show subcategory')
    })

    const category1 = element.getElementsByClassName('category subcategory')[0];

    category1.addEventListener('click', (event) => {
        event.preventDefault();

        eventBus.emit('show subcategory')
    })
}

export default asideEvents;