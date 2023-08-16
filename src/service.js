async function allVideos() {
    const response = await fetch("http://localhost:3000/api/getAllVideo", {
        method: "GET",
    });
    const videos = await response.json();
    return videos;
}

export { allVideos };
