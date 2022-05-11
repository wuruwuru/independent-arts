export const getSlidesObject = (query) => {
    //Get all elements
    const elements = [...document.querySelectorAll(query)];

    //Object to map slide ids to their index in order to make retrieval faster
    const slidesObject = {};

    elements.forEach((slide, index) => {
        //Map slide id to index
        slidesObject[slide.dataset.id] = {
            index,
            element: slide
        }
    })

    return slidesObject
}

export const getActiveSlide = ({query, elementsObject }) => {
    const elements = [...document.querySelectorAll(query)];

    const hash = window.location.hash

    let activeSlide = hash.slice(1);

    if(!hash){
        //If no hash default to slide 1
        activeSlide = elements[0].dataset.id;
    }

    if(!elementsObject[activeSlide]){
        return null
    }

    return activeSlide
}