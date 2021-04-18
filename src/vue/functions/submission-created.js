const sanity = require('@sanity/client')

const client = sanity({
    projectId: "q8mztlyl", // find this at manage.sanity.io or in your sanity.json
    dataset: "production", // this is from those question during 'sanity init'
    useCdn: true,
    token: process.env.SANITY_STUDIO_SUBMIT_RATING
});

exports.handler = async function (event, context, callback) {

    const {
        payload
    } = JSON.parse(event.body)

    const rating = {
        _type: 'rating',
        stars: parseInt(payload.data.stars),
        comment: payload.data.comment,
        post: {
            _ref: payload.data.post,
            _type: 'reference'
        },
    }

    await client.create(rating)
    .then(res => {
        callback(null, {statusCode: 200})
    })
}