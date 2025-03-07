<template>
    <div class="actionCluster">
        <div class="columns">
            <div class="column">
                <teclat :numbers="numbers" :color="'#F5F5FF'" @selected="action"></teclat>
            </div>
        </div>
        <div class="columns">
            <div class="column is-three-fifths">
                <div class="columns">
                    <div class="column is-one-fifth">
                        <h2 class="has-text-centered pt-2 is-family-primary is-size-6">Interception</h2>
                    </div>
                    <div class="column">
                        <teclat :is-selectable="true" :numbers="numbersInter" :color="'#FFF5F5'" @selected="interceptionVal = $event"></teclat>
                    </div>
                </div>
            </div>
            <div class="column is-two-fifths">
                <div v-if="interceptionVal != 0" class="columns">
                    <div class="column is-one-fifth">
                        <h2 class="has-text-centered pt-2 is-family-primary is-size-6">Skills</h2>
                    </div>
                    <div class="column">
                        <boto :options="options" @interceptionWithPro="interceptionWithPro = $event" @interceptionWithCatch="interceptionWithCatch = $event"></boto>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import {pass} from "./actions";
import Teclat from "./teclat.vue";
import Boto from "./boto.vue"

export default {
    name: "passes",
    props: ['passSkill', 'lonerSkill'],
    components: {
        Teclat,
        Boto
    },
    data:function(){
        return {
            interceptionVal: 0,
            interceptionWithPro: false,
            interceptionWithCatch: false,
            numbers: [2, 3, 4, 5, 6 ],
            numbersInter: [0, 2, 3, 4, 5, 6 ],
            options: [
                {
                    name: 'Pro',
                    model: 'interceptionWithPro',
                },
                {
                    name: 'Catch',
                    model: 'interceptionWithCatch',
                }
            ],
        }
    },
    computed: {},
    watch: {},
    methods: {
        action: function(val){
            var theAction = new pass(val, this.passSkill, this.lonerSkill,
                this.interceptionVal, this.interceptionWithPro, this.interceptionWithCatch );
            this.$emit('action', theAction);
        },
    },
    created() {},
    destroyed() {},
    mounted: function () {
        console.log("MOUNT GFI!!");
    }
}
</script>

<style>

</style>
