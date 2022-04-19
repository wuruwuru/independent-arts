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
      console.log('observing: ', state.currentStory)
    }
  })
}

const storyObserver = new IntersectionObserver(updateState, {
  root: storiesWrapper,
  rootMargin: '0px',
  threshold: 0.1
});

storiesWrapper.querySelectorAll('[data-page]').forEach(story => {
  storyObserver.observe(story);
});




const navigateStories = (direction) => { 
  const story = state.currentStory;

  if (direction === 'prev') { 
    const previousStory = story.previousElementSibling;
    if (previousStory) {
      previousStory.scrollIntoView({
        behavior: 'smooth'
      })
    } else {
      console.log('no previous story')
    }
  } else if (direction === 'next') {
    const nextStory = story.nextElementSibling;
    if (!!nextStory) {
      nextStory.scrollIntoView({
        behavior: 'smooth'
      })
    } else {
      console.log('no next story')
    }
  }
}


// Update story on click
storiesWrapper.addEventListener('click', ({ clientX }) =>
  clientX > storiesMiddlePoint ? navigateStories('next') : navigateStories('prev'));