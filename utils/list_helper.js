const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(b => b.likes).reduce(((p, c) => p + c), 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce(((p, c) => p.likes < c.likes ?
        c : p
    ))
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}