document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const clickableTags = document.querySelectorAll('.clickable-tag');
    const posts = document.querySelectorAll('.post-item');

    function filterPosts(selectedTag) {
        posts.forEach(post => {
            const postTags = post.getAttribute('data-tags').toLowerCase();
            
            if (selectedTag === 'all' || postTags.includes(selectedTag.toLowerCase())) {
                post.classList.remove('hidden');
            } else {
                post.classList.add('hidden');
            }
        });

        // Update active button
        filterBtns.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-tag="${selectedTag}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        // Update URL without page reload
        const newUrl = selectedTag === 'all' ? window.location.pathname : `${window.location.pathname}?tag=${selectedTag}`;
        window.history.pushState({}, '', newUrl);
    }

    // Check URL for tag parameter on page load
    const urlParams = new URLSearchParams(window.location.search);
    const tagFromUrl = urlParams.get('tag');
    if (tagFromUrl) {
        filterPosts(tagFromUrl);
    }

    // Filter button clicks
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tag = btn.getAttribute('data-tag');
            filterPosts(tag);
        });
    });

    // Clickable tag clicks
    clickableTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const tagName = tag.getAttribute('data-tag');
            filterPosts(tagName);
        });
    });
});