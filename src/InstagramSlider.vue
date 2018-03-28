<template>
    <div id="instagram-feed">
        <SlideImage v-for="image in images" v-bind:key="image.id" :image="image" />
    </div>
</template>

<script src="slick-carousel/slick/slick.min.js"></script>
<script>
    import axios from 'axios'
    import SlideImage from './components/SlideImage'

    export default {
        name: 'InstagramFeed',
        components: { SlideImage },
        props: ['username'],
        data() {
            return {
                'images': []
            }
        },
        created() {
            this.fetchInstagramData()
        },
        methods: {
            fetchInstagramData() {
                axios.get(`https://www.instagram.com/${this.username}/?__a=1`).then(res => {
                    res.data.graphql.user.edge_owner_to_timeline_media.edges.map(obj => {
                        this.images.push(obj.node)
                    })

                    this.initSlick()
                }).catch(err => {
                    console.error('Cannot load images from Instagram: ', err)
                })
            },
            initSlick() {
                $(document).ready(function() {
                    let gallery = $('#instagram-feed')

                    gallery.slick({
                        centerMode: false,
                        infinite: false,
                        mobileFirst: false,
                        slidesToShow: 3,
                        slidesToScroll: 3
                    })
                })
            }
        }
    }
</script>

<style src="slick-carousel/slick/slick-theme.scss"></style>
<style src="slick-carousel/slick/slick.scss"></style>