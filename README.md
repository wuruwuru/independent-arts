# wuruwuru
A collection of publishing experiments

Built with [Astro](https://astro.build/), Javascript, HTML and CSS (SCSS)

## Get Started

```
# Install Dependencies

npm i

# Run Site locally

npm start

# Build Site

npm run build
```

## Folder structure

```
  .
    ├── public                  # Public files that will not be compiled by astro and are directly accessible from root of the website (e.g the assets folder is accessible from wuruwuru.com/assets)
    ├── src
        ├── assets
            ├── images          # Svg and Png images that can be imported into components or pages
        ├── components          # Components can be added to this folder and imported into pages/other components to reduce code re-use
        ├── data                # Data is stored here in json format which can be imported into the javascript files and will be automatically converted to Javascript objects by Astro
        ├── layout              # This contains the layout components that contain the wrapper code (like SEO content, headers, default styling etc.) for similar pages (eg the project pages) 
        ├── pages               # This contains the pages in the project. Each file and folder is linked to a route matching it's name (eg. about.astro links to /about and /projects/james.astro links to /project/james)
        └── styles              # This contains the page styles which can be imported into the page astro files 
```

## How to contribute 

- Create a feature branch with a branch name relevant to the feature you're implementing. For example, if you are creating a project list component you can name your branch `feature/project-list-component`. 
You can also get creative and name your branch something like `feature/astro-world` if you're migrating to astro : )

- Proceed with your work on that branch and then create a pull request to dev with a description of the work implemented on that branch and images (or videos where applicable) showcasing your work.

- After creating the PR you can request a review of your work from one of the developers on the project who will then provide feedback based on your work and whatever changes may need to be implemented.

- When the review is done your work will be merged into the dev branch
