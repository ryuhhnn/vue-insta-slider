<template>
    <div id="instagram-feed">
        <SlideImage v-for="image in images" v-bind:key="image.id" :image="image" />
    </div>
</template>

<script>
    import axios from 'axios'
    import SlideImage from './components/SlideImage'
    import $ from 'jquery'
    import 'slick-carousel/slick/slick.min.js'
    require('slick-carousel/slick/slick.css')

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
                    $('#instagram-feed').slick({
                        infinite: true,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        variableWidth: true,
                        adaptiveHeight: true,
                        arrows: false
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .slick-slide {
        margin-right: 10px;
    }
</style>
