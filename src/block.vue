<template>
    <div class="actionCluster block">
        <div class="columns is-gapless">
            <div class="column is-half">
                <h2 class="has-text-centered is-family-primary is-size-6 dice_title">Dice</h2>
                <div class="columns daus is-multiline is-gapless is-mobile">
                    <div class="column is-half-mobile" @click="daus(-3)" :class="(dice == -3) ? 'selected' : ''" style="color:red;"><span class="bbfont">igh</span></div>
                    <div class="column is-half-mobile" @click="daus(-2)" :class="(dice == -2) ? 'selected' : ''" style="color:red;"><span class="bbfont">hi</span></div>
                    <div class="column" @click="daus(1)" :class="(dice == 1) ? 'selected' : ''"><span class="bbfont">i</span></div>
                    <div class="column" @click="daus(2)" :class="(dice == 2) ? 'selected' : ''"><span class="bbfont">ih</span></div>
                    <div class="column is-half-mobile" @click="daus(3)" :class="(dice == 3) ? 'selected' : ''"><span class="bbfont">igh</span></div>
                </div>
            </div>
            <div class="column" >
                <h2 class="has-text-centered pb-2 is-family-primary is-size-6">Success</h2>
                <div class="success">
                    <span class=" bbfont roll" @click="pow('blockSuccessSkull')" :class="{selected: (success.includes('blockSuccessSkull'))}">h</span>
                    <span class=" bbfont roll" @click="pow('blockSuccessPowSkull')" :class="{selected: (success.includes('blockSuccessPowSkull'))}">k</span>
                    <span class=" bbfont roll" @click="pow('blockSuccessPush')" :class="{selected: (success.includes('blockSuccessPush'))}">g</span>
                    <span class=" bbfont roll" @click="pow('blockSuccessStumble')" :class="{selected: (success.includes('blockSuccessStumble'))}">j</span>
                    <span class=" bbfont roll" @click="pow('blockSuccessDown')" :class="{selected: (success.includes('blockSuccessDown'))}">i</span>
                </div>
            </div>
            <div class="column" style="text-align: center;">
                <h2 class="has-text-centered pb-2 is-family-primary is-size-6">&nbsp;</h2>
                <button class="button is-small" @click="addAction('block')">Add</button>
            </div>
        </div>

    </div>
</template>

<script>

import {block} from "./actions";

export default {
    name: "block",
    props: ['lonerSkill'],
    components: {},
    data:function(){
        return {
            dice: null,
            success: ['blockSuccessStumble','blockSuccessDown'],
            powSelected: [],
        }
    },
    computed: {},
    watch: {},
    methods: {
        addAction: function(action){
            let nbDice = parseInt(this.dice);

            //number of success on the block die
            var nbSuccess = 0;
            this.success.forEach(function (ele,idx, arr){
                if (ele == 'blockSuccessPush'){
                    nbSuccess = nbSuccess + 2;
                } else {
                    nbSuccess = nbSuccess + 1;
                }
            });

            var theAction = new block(nbDice,nbSuccess, this.lonerSkill);

            this.$emit('action', theAction);
        },
        daus: function(val){
            this.dice = val;
        },
        pow: function(act){
            if(this.success.includes(act)){
                let idx = this.success.indexOf(act)
                this.success.splice(idx, 1);
            } else {
                this.success.push(act);
            }
        }
    },
    created() {},
    destroyed() {},
    mounted: function () {
        console.log("MOUNT BLOCK!!");
    }
}
</script>

<style lang="scss">
@import './scss/mystyles.scss';

.block {

    .bbfont {
        font-family: 'dPoly Block Dice';
        cursor: pointer;

        &.roll {
            font-size: 4em;
            text-align: center;

            @include from($tablet) {
                xtext-align: left;
            }
        }
    }

    .success {
        text-align: center;
        margin-top: -20px;
        @include from($tablet) {
            text-align: left;
            margin-top: 0;
        }
    }

    .daus {
        font-size: 3em;
        line-height: 0.8em;

        text-align: center;

        @include from($tablet) {
            line-height: 2.1em;
            xtext-align: left;
            padding-right: 40px;
        }

        &.columns.is-gapless {
            @include mobile {
                margin-top: 0.5rem;
            }
            > .column:first-child{
                @include mobile {
                    margin-bottom: 0.75rem;
                }
            }
            &:last-child {
               @include mobile {
                    margin-bottom: 0.5rem;
                }
            }
        }
    }

    .selected {
        color: $selected !important;
    }

    .button {
        margin-top: 0;

        @include from($tablet) {
            margin-top: 1.4rem;
        }
    }

    .dice_title {
        padding-bottom: 0 !important;

        @include from($tablet) {
            padding-bottom: 0.5rem !important;
        }
    }
}
</style>
