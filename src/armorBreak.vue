<template>
    <div class="actionCluster armorbreak">
        <div class="columns is-mobile">
            <div class="column is-three-fifths">
                <h2 class="has-text-centered pb-2 is-family-primary is-size-6">Armor Break</h2>
                <div class="buttons has-addons is-centered">
                    <button class="button is-small" @click="armorvalue = (armorvalue > 0) ? armorvalue - 1 : armorvalue">-</button>
                    <button class="button is-small">{{armorvalue}}</button>
                    <button class="button is-small" @click="armorvalue = (armorvalue < 12) ? armorvalue = armorvalue + 1 : armorvalue = 12">+</button>
                </div>
            </div>
            <div class="column">
                <h2 class="has-text-centered pb-2 is-family-primary is-size-6">&nbsp;</h2>
                <button class="button is-small" @click="addAction('armorbreak')">Add</button>
            </div>
        </div>
    </div>
</template>

<script>

import {armorbreak} from "./actions";

export default {
    name: "armorBreak",
    props: [],
    components: {},
    data:function(){
        return {
            armorvalue: 8
        }
    },
    computed: {},
    watch: {},
    methods: {
        addAction: function(action){
            var theAction = new armorbreak(this.armorvalue);
            this.$emit('action', theAction);
        }
    },
    created() {},
    destroyed() {},
    mounted: function () {
        console.log("MOUNT ARMOR BREAK!!");
    }
}
</script>

<style scoped>

</style>
