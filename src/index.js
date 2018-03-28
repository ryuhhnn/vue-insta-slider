import InstagramFeed from './InstagramFeed.vue'

module.exports = {
    install: function (Vue, options) {
        Vue.component('instagram-feed', InstagramFeed)
    }
}