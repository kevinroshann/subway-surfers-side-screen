// content.js

// Check if the split screen already exists
if (!document.getElementById('split-screen-container')) {
    // Create the container for split screen
    const container = document.createElement('div');
    container.id = 'split-screen-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.display = 'flex';
    container.style.zIndex = '1000';
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  
    // Create the original content container
    const originalContent = document.createElement('div');
    originalContent.id = 'original-content';
    originalContent.style.flex = '0 1 50%'; // Set initial width to 50%
    originalContent.style.overflow = 'auto';
    originalContent.style.backgroundColor = 'white';
    originalContent.innerHTML = document.body.innerHTML;
  
    // Clear the body and append the split container
    document.body.innerHTML = '';
    
    // Create the video container
    const videoContainer = document.createElement('div');
    videoContainer.style.flex = '0 1 50%'; // Set initial width to 50%
    videoContainer.style.backgroundColor = '#000';
    videoContainer.style.display = 'flex';
    videoContainer.style.justifyContent = 'center';
    videoContainer.style.alignItems = 'center';
    videoContainer.style.position = 'relative';
  
    // Create the video element
    const video = document.createElement('video');
    video.src = chrome.runtime.getURL('video.mp4'); // Load the video from the extension
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    video.controls = true; // Optional: add controls to the video
    video.autoplay = true;
    video.muted = true; // Optional: mute the video
  
    // Append video to the video container
    videoContainer.appendChild(video);
  
    // Create a close button
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.zIndex = '1001'; // Above the container
    closeButton.style.padding = '10px 15px';
    closeButton.style.backgroundColor = '#fff';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
  
    // Add event listener to close the split screen
    closeButton.addEventListener('click', () => {
      container.remove(); // Remove the container
      document.body.innerHTML = originalContent.innerHTML; // Restore the original content
    });
  
    // Append the close button to the video container
    videoContainer.appendChild(closeButton);
  
    // Create the slider
    const slider = document.createElement('div');
    slider.style.width = '5px'; // Width of the slider
    slider.style.backgroundColor = '#fff';
    slider.style.cursor = 'ew-resize';
    slider.style.zIndex = '1001'; // Above the container
    slider.style.position = 'relative';
    slider.style.margin = '0'; // No margin to keep it flush against the containers
  
    // Append the original content, slider, and video container to the main container
    container.appendChild(originalContent);
    container.appendChild(slider);
    container.appendChild(videoContainer);
  
    // Append the entire container to the body
    document.body.appendChild(container);
  
    // Initialize the slider position
    let isDragging = false;
  
    // Add event listeners for the slider
    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      document.body.style.cursor = 'ew-resize'; // Change cursor style
    });
  
    document.addEventListener('mouseup', () => {
      isDragging = false;
      document.body.style.cursor = 'auto'; // Reset cursor style
    });
  
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        // Calculate the new width for the original content based on mouse position
        const containerWidth = container.clientWidth;
        const newWidth = (e.clientX / containerWidth) * 100; // Percentage width
        originalContent.style.flex = `0 1 ${newWidth}%`; // Update original content width
        videoContainer.style.flex = `0 1 ${100 - newWidth}%`; // Update video container width
      }
    });
  }
  