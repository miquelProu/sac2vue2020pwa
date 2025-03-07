<template>
    <div class="actionCluster injury">
        <div class="columns is-mobile">
            <div class="column is-three-fifths">
                <h2 class="has-text-centered pb-2 is-family-primary is-size-6">Injury Roll</h2>
                <boto :options="options"
                      @injuryStun="stun"
                      @injuryKO="ko"
                      @injuryCas="cas"></boto>
            </div>
            <div class="column">
                <h2 class="has-text-centered pb-2 is-family-primary is-size-6">&nbsp;</h2>
                <button class="button is-small" @click="addAction('injury')">Add</button>
            </div>
        </div>
    </div>
</template>

<script>

import {injury} from "./actions";
import Boto from "./boto.vue"

export default {
    name: "injury",
    props: [],
    components: {
        Boto
    },
    data:function(){
        return {
            injuryStun: false,
            injuryKO:false,
            injuryCas:false,
            options: [
                {
                    name: 'Aturdido',
                    model: 'injuryStun',
                },
                {
                    name: 'KO',
                    model: 'injuryKO',
                },
                {
                    name: 'Lesión',
                    model: 'injuryCas',
                }
            ],
        }
    },
    computed: {},
    watch: {},
    methods: {
        addAction: function(action){
            var theAction = new injury(this.injuryStun, this.injuryKO, this.injuryCas);
            this.$emit('action', theAction);
        },
        stun: function(val){
            this.injuryStun = val;
        },
        ko: function(val){
            this.injuryKO = val;
        },
        cas: function(val){
            this.injuryCas = val;
        }
    },
    created() {},
    destroyed() {},
    mounted: function () {
        console.log("MOUNT INJURY!!");
    }
}
</script>

<style scoped>

</style>
