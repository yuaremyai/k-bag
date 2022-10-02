function get_images () {
    let images = [];
    const r = require.context('./images/sweater/', false, /\.jpg/)
    r.keys().map((item) => { 
        images.push(r(item))
    });
    return images;
}

export default get_images;