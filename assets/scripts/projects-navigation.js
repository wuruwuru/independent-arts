const storiesWrapper = document.querySelector('.stories');
const storiesMiddlePoint = storiesWrapper.getBoundingClientRect().left + storiesWrapper.getBoundingClientRect().width / 2;

/** Manage State **/
const state = {
  currentStory: storiesWrapper.firstElementChild,
}

/* Listen for story change and update state using intersection observer */
const updateState = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      state.currentStory = entry.target;
    }
  })
}

const storyObserver = new IntersectionObserver(updateState, {
  root: storiesWrapper,
  rootMargin: '0px',
  threshold: 0.9
});

storiesWrapper.querySelectorAll('[data-page]').forEach(story => {
  storyObserver.observe(story);
});


const goToSlide = slide => {
  slide.scrollIntoView({
    behavior: 'smooth'
  })
}

const navigateStories = (direction) => { 
  const story = state.currentStory;

  if (direction === 'prev') { 
    const previousSlide = story.previousElementSibling;
    if (!!previousSlide) {
      goToSlide(previousSlide);
    } else {
      console.log('no previous story')
    }
  } else if (direction === 'next') {
    const nextSlide = story.nextElementSibling;
    if (!!nextSlide) {
      goToSlide(nextSlide);
    } else {
      console.log('no next story')
    }
  }
}


// Update story on click
storiesWrapper.addEventListener('click', ({ clientX }) =>
  clientX > storiesMiddlePoint ? navigateStories('next') : navigateStories('prev'));
