# Interactive Art & Design Portfolio

This project is a modern, high-performance portfolio website designed to showcase a large collection of high-resolution images and interactive art pieces. It is built with a focus on efficient resource loading and a sleek, responsive user experience.

## About The Project

The core problem this project solves is how to present a media-heavy portfolio without compromising on loading speed or user experience, especially for users on slower networks. It achieves this by leveraging modern Web APIs to lazy-load content, adapt asset quality based on network conditions, and provide engaging interactive elements.

## Features

-   **Modern, Minimalist UI**: A sleek, dark-themed interface with an icon-only navigation sidebar.
-   **Infinite Scrolling Gallery**: Artworks are loaded continuously as the user scrolls, providing a seamless browsing experience.
-   **Lazy Loading Images**: Images are only loaded when they are about to enter the viewport, saving bandwidth and speeding up initial page load.
-   **Adaptive Image Quality**: The site automatically detects the user's network speed and serves lower-resolution images on slow connections.
-   **Interactive Artwork Display**: A "spotlight" effect on artwork detail pages, created with the Canvas API, allows for an engaging way to view the art.
-   **Resource Prefetching**: High-resolution images are prefetched on hover to make navigation to detail pages feel instantaneous.
-   **Responsive Design**: The layout is optimized for all screen sizes.

## Web APIs Used

This project utilizes a minimum of three modern Web APIs as per the requirements:

### 1. Intersection Observer API

The Intersection Observer API is used in two key areas:

-   **Lazy Loading Artwork Cards (`ArtworkCard.vue`)**: Each card in the portfolio grid is observed. The high-quality image for the card is only fetched from the server when the card itself is about to scroll into the user's view. This dramatically improves the initial load time of the main gallery page.
-   **Infinite Scrolling (`pages/index.vue`)**: An invisible "sentinel" element is placed at the bottom of the portfolio grid. When the user scrolls down and this sentinel becomes visible, the Intersection Observer triggers a function to fetch the next "page" of artworks and add them to the gallery.

### 2. Network Information API

This API helps create a responsive experience that adapts to the user's connectivity.

-   **Adaptive Image Quality (`composables/useNetwork.ts` & `ArtworkCard.vue`)**: The application checks the user's `navigator.connection.effectiveType` (e.g., '4g', '3g', '2g'). Based on this value, it determines whether to load a large, high-quality image or a smaller, medium-quality image. On a '4g' connection, the large version is loaded. On '3g' or slower, the medium version is prioritized to ensure faster loading times.

### 3. Canvas API

The Canvas API is used to add a layer of interactivity to the artwork detail pages.

-   **Interactive Spotlight Effect (`pages/artwork/[id].vue`)**: When a user visits an artwork's detail page, the image is drawn onto a `<canvas>` element in grayscale. As the user moves their mouse over the canvas, a circular region around the cursor reveals the original, full-color version of the image, creating an engaging "spotlight" that encourages exploration of the artwork's details.

## Tech Stack

-   [Nuxt.js 3](https://nuxt.com/) - The Vue Framework for Production.
-   [Vue.js 3](https://vuejs.org/) - The Progressive JavaScript Framework.
-   [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling.
-   [Phosphor Icons](https://phosphoricons.com/) - A flexible icon family for interfaces.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.x or newer recommended)
-   [Bun](https://bun.sh/) (or npm/yarn/pnpm)

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/your_repository.git
    ```
2.  Navigate to the project directory
    ```sh
    cd your_repository
    ```
3.  Install dependencies
    ```sh
    bun install
    ```
4.  Run the development server
    ```sh
    bun run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
