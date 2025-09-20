// A simple browser extension to remove playlist parameters from YouTube video URLs.

// Use event delegation on the document body for maximum performance and reliability.
document.body.addEventListener('click', (event) => {
  // Find the closest parent anchor element (<a>) of the clicked target.
  const link = event.target.closest('a');

  // Only proceed if a link was clicked and it's a YouTube watch URL that contains a playlist.
  if (link && link.href.includes('youtube.com/watch') && link.href.includes('list=')) {
    try {
      const url = new URL(link.href);
      const videoId = url.searchParams.get('v');

      // If a video ID exists, it's a valid video link.
      if (videoId) {
        // Prevent the default browser navigation.
        event.preventDefault();

        // Construct the clean URL without any extra parameters.
        const cleanUrl = `https://www.youtube.com/watch?v=${videoId}`;

        // Check if the URL needs to be updated.
        if (window.location.href !== cleanUrl) {
          // Update the URL in the address bar without a page reload.
          window.history.pushState({}, '', cleanUrl);

          // Dispatch a custom event to trigger YouTube's internal router to update content.
          window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
        }
      }
    } catch (e) {
      console.error('URL modification error:', e);
    }
  }
}, true); // The `capture` flag ensures our listener runs first.
