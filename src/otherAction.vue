<template>
    <div class="actionCluster">
        <teclat :numbers="numbers" :color="'FEFED6'" @selected="action"></teclat>
    </div>
</template>

<script>

import {playerAction} from "./actions";
import Teclat from "./teclat.vue";

export default {
    name: "otherAction",
    props: ['lonerSkill'],
    components: {
        Teclat
    },
    data:function(){
        return {
            numbers: [2, 3, 4, 5, 6 ]
        }
    },
    computed: {},
    watch: {},
    methods: {
        action: function(val){
            var theAction = new playerAction(val, this.lonerSkill);
            this.$emit('action', theAction);
        }
    },
    created() {},
    destroyed() {},
    mounted: function () {
        console.log("MOUNT OTHER ACTION!!");
    }
}
</script>

<style scoped>

</style>
