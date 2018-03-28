<template>
    <div class="img-thumbnail">
        <img :src="image.thumbnail_src" :alt="image.edge_media_to_caption.edges[0].node.text" />
    </div>
</template>

<script>
    export default {
        name: 'SlideImage',
        props: ['image']
    }
</script>