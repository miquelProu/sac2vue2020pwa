<template>

    <section class="section is-fullheight">
        <div class="container">
            <div class="columns is-mobile is-vcentered">
                <div class="column  is-one-third-mobile is-one-fifth-tablet is-one-fifth-widescreen">
                    <a href="https://www.irregularesplanb.com/" target="_blank">
                        <img class="ml-4" style="width: 100%;"src="img/irrpb.png"/>
                    </a>
                </div>
                <div class="column">
                    <div class="titol"><span>BLOOD BOWL</span> ODDS <br/><span>CALCULATOR</span></div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="columns is-mobile">
                <div class="column  is-one-quarter">
                    <div class="buttons  is-centered">
                        <button class="button is-small is-danger is-outlined" @click="cleanSequence">Reset</button>
                        <button class="button is-small xis-info viewprecent" :class="{'selected': (pintaSeq != null)}" @click="finsSeq(sequencia.length - 2);">%</button>
                    </div>
                </div>
                <div class="column">
                    <boto :options="playerOptions"
                          @dodgeSkill="dodgeSkill = $event"
                          @surehandSkill="surehandSkill = $event"
                          @surefeetSkill="surefeetSkill = $event"
                          @passSkill="passSkill = $event"
                          @catchSkill="catchSkill = $event"
                          @proSkill="proSkill = $event"
                          @lonerSkill="lonerSkill = $event"
                          v-if="showPlayerSkills"
                    ></boto>
                </div>
            </div>
        </div>

        <div class="container tabuladors" style="padding-top: 0.75rem;">
            <Tabs>
                <Tab name="Actions" :selected="true">
                    <boto :options="actionOptions"
                          :clearSelected="clearActionSelected"
                          :is-alone="true"
                          @esquiva="setAction = 'esquiva'"
                          @recoger="setAction = 'recoger'"
                          @ap="setAction = 'ap'"
                          @atrapar="setAction = 'atrapar'"
                          style="margin-bottom: 0.75rem;"></boto>
                    <teclat :numbers="numbersComp" :color="'#EEEEEE'" @selected="action"></teclat>
                </Tab>
                <Tab name="Pass">
                    <passes :loner-skill="lonerSkill" :pass-skill="passSkill" @action="addAction"></passes>
                </Tab>
                <Tab name="Block">
                    <block :loner-skill="lonerSkill" @action="addAction"></block>
                </Tab>
                <Tab name="Armor Break">
                    <div class="columns">
                        <div class="column">
                            <armor-break @action="addAction"></armor-break>
                        </div>
                        <div class="column">
                            <injury @action="addAction"></injury>
                        </div>
                    </div>
                </Tab>
                <Tab name="Other action">
                <other-action :loner-skill="lonerSkill" @action="addAction"></other-action>
                </Tab>
            </Tabs>
        </div>

        <div class="container rrs" v-if="splitRrSequence.length > 0">
            <div class="columns is-mobile" >
                <div class="column has-text-centered"
                     :class="index < 2 ? 'rr_fons' : 'is-one-fifth'"
                     v-for="(item, index) in splitRrSequence[0]"
                >
                    <h2 class="pr-2 is-family-primary is-size-7">RR{{index}}</h2>
                    <div id="probaNoReroll" class="is-family-primary has-text-weight-bold is-size-5" :class="(item == 0) ? 'has-text-danger': '' ">{{item}}%</div>
                </div>
                <div class="column is-narrow dots" @click="showRR = !showRR"  v-if="(splitRrSequence.length > 1)">&nbsp</div>
            </div>
            <div class="columns is-mobile is-multiline" v-if="(splitRrSequence.length > 1) && showRR">
                <div class="column has-text-centered" v-for="(item, index) in splitRrSequence[1]">
                    <h2 class="pr-2 is-family-primary is-size-7">RR{{index+5}}</h2>
                    <div id="probaNoReroll" class="is-family-primary has-text-weight-bold is-size-5">{{item}}%</div>
                </div>
            </div>
        </div>

        <div class="container sequencia">
            <sequencia :sequencia="txtSeq"
                       @delete="deleteSeq"
                       @clickar="clickSeq"
                       @fins="finsSeq"
                       :show="showSeq"
                       :pinta="pintaSeq"
            ></sequencia>
        </div>
        <footer class="is-size-7"><a class="is-underlined" href="https://www.irregularesplanb.com/" target="_blank">Irregulars PlanB</a> - <a class="is-underlined" href="https://www.irregularesplanb.com/" target="_blank">Github</a></footer>
    </section>
</template>

<script>

import fullSequence from "./sequence";
import Dodge from './dodge.vue'
import Pickup from './pickup.vue'
import Gfi from './gfi.vue'
import Passes from './passes.vue'
import Catch from './catch.vue'
import OtherAction from './otherAction.vue'
import Block from './block.vue'
import ArmorBreak from './armorBreak.vue'
import Injury from './injury.vue'
import Boto from './boto.vue'
import Teclat from './teclat.vue'
import Sequencia from './sequencia.vue'

import {Tabs, Tab} from '@crow1796/vue-bulma-tabs'
import {catching, dodge, gfi, pickup, playerAction} from "./actions";

export default {
    name: 'dice',
    components: {
        Dodge,
        Pickup,
        Gfi,
        Passes,
        Catch,
        OtherAction,
        Block,
        ArmorBreak,
        Injury,
        Boto,
        Teclat,
        Tabs,
        Tab,
        Sequencia
    },
    data: function () {
        return {
            dodgeSkill: false,
            surehandSkill: false,
            surefeetSkill: false,
            passSkill: false,
            catchSkill: false,
            proSkill: false,
            lonerSkill: false,
            sequencia: [],
            full: null,
            result: null,
            numbers: [2, 3, 4, 5, 6],
            setAction: '',
            clearActionSelected: true,
            showPlayerSkills: true,
            showSeq: [],
            pintaSeq: null,
            showRR: false,
            playerOptions: [
                {
                    name: 'Dodge',
                    model: 'dodgeSkill',
                },
                {
                    name: 'Sure Hands',
                    model: 'surehandSkill',
                },
                {
                    name: 'Sure Feet',
                    model: 'surefeetSkill',
                },
                {
                    name: 'Pass',
                    model: 'passSkill',
                },
                {
                    name: 'Catch',
                    model: 'catchSkill',
                },
                {
                    name: 'Pro',
                    model: 'proSkill',
                },
                {
                    name: 'Loner',
                    model: 'lonerSkill',
                }
            ],
            actionOptions: [
                {
                    name: 'Dodge',
                    model: 'esquiva',
                    selected: true
                },
                {
                    name: 'Pick Up',
                    model: 'recoger',
                },
                {
                    name: 'Rush',
                    model: 'ap',
                },
                {
                    name: 'Catch',
                    model: 'atrapar',
                },
            ]
        }

    },
    props: [],
    computed: {
        numbersComp: function () {
            return (this.setAction == 'ap') ? [2, 3] : this.numbers;
        },
        txtSeq: function () {
            let retorn = []
            this.sequencia.forEach(function (e, idx) {
                retorn.push(e.toString);
            });
            return retorn;
        },
        splitRrSequence: function() {
            let retorn = [];
            if(this.result){
                let rr = this.result.reRolls.slice();
                if (rr.length <= 4){
                    retorn.push(rr);
                } else {
                    let arr = rr.splice(0,4 );
                    retorn.push(arr);
                    retorn.push(rr);
                }

            }
            return retorn;
        }
    },
    watch: {},
    methods: {
        action: function (val) {
            console.log("ACTION VAL", val);
            if (this.setAction == 'esquiva') {
                this.addAction(new dodge(val, this.dodgeSkill, this.lonerSkill));
            } else if (this.setAction == 'recoger') {
                this.addAction(new pickup(val, this.surehandSkill, this.lonerSkill));
            } else if (this.setAction == 'ap') {
                this.addAction(new gfi(val, this.surefeetSkill, this.lonerSkill));
            } else if (this.setAction == 'atrapar') {
                this.addAction(new catching(val, this.catchSkill, this.lonerSkill));
            } else {
                this.addAction(new playerAction(val, this.lonerSkill))
            }
            //this.setAction= '';
            //this.clearActionSelected = !this.clearActionSelected;
        },
        addAction: function (action) {
            console.log("ACTION", action);
            this.sequencia.push(action);
            this.full.addAction(action);
            this.result = this.full.getProba();
            console.log(this.result);
        },
        cleanSequence: function () {
            this.full = new fullSequence();
            this.sequencia = [];
            //this.result = this.full.getProba();
            this.result = null;
            this.showSeq = [];
            this.pintaSeq = null;
        },
        deleteSeq: function (idx) {
            this.sequencia.splice(idx, 1);
            this.full.removeAction(idx);
            this.result = this.full.getProba();
            //this.showSeq = [];
            //this.pintaSeq = null;
        },
        clickSeq: function (idx) {
            console.log("CLICK SEQ", idx);
            this.pintaSeq = null;
            let idxs = this.showSeq.map(function (ele) {
                return ele.idx
            });
            if (!idxs.includes(idx)) {
                let seq = new fullSequence();
                let sp = this.sequencia.slice(idx, idx + 1);
                seq.addAction(sp[0]);
                let proba = seq.getProba();
                console.log("PROB", proba);
                this.showSeq = [];
                this.showSeq.push({idx: idx, proba: proba});
            } else {
                this.showSeq = [];
            }
        },
        finsSeq: function (idx) {
            console.log("FINS SEQ", idx);
            let idxs = this.showSeq.map(function (ele) {
                return ele.idx
            });
            console.log(idxs);
            if (!idxs.includes(idx)) {
                this.pintaSeq = idx;
                this.showSeq = [];
                for (let f = 0; f <= idx; f++) {
                    let seq = new fullSequence();
                    let sp = this.sequencia.slice(0, f + 1);
                    seq.addActions(sp);
                    let proba = seq.getProba();
                    console.log("PROB", proba);
                    this.showSeq.push({idx: f, proba: proba});
                }
            } else {
                this.showSeq = [];
                this.pintaSeq = null;
            }
        }
    },
    created() {

    },
    destroyed() {
    },
    mounted: function () {
        console.log("HOLA!!");
        this.full = new fullSequence();
    }
}
</script>

<style lang="scss">
@import './scss/mystyles.scss';
//@import './scss/variables.scss';


html {
    background-color: #FFFFFF !important;
    height: 100%;

    @font-face {
        font-family: 'dPoly Block Dice';
        src: url('./assets/font/dPolyBlockDice.woff2') format('woff2'),
        url('./assets/font/dPolyBlockDice.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: 'dPoly Block Dice';
        src: url('./assets/font/dPolyBlockDice.woff2') format('woff2'),
        url('./assets/font/dPolyBlockDice.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'Gutcruncher';
        src: url('./assets/font/Gutcruncher.woff2') format('woff2'),
        url('./assets/font/Gutcruncher.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }

    @include from($tablet) {
        //overflow-y: hidden !important;
    }
    scroll-behavior: smooth;


    body {
        background-color: #FFFFFF !important;
        font-family: sans-serif;
        font-size: 12px;

        .tabs {
            font-size: 12px;
        }
    }

    section {
        height: 100vh;
        position: relative;
    }

    footer {
        position:absolute;
        bottom: 0;
        right: calc(50% - 66px);
    }

    .titol {
        font-family: 'Gutcruncher';
        text-align: center;
        font-size: 6.5vw;

        @include from($tablet) {
            font-size: 4.6vw;
        }

        @include from($widescreen) {
            font-size: 3.0vw;
        }



        span {
            color: $irrpb;
        }
    }

    /*h2 {
        font-family: sans-serif;
        font-size: 1em;
    }*/

    .playerSkill {
        position: relative;
        cursor: pointer;

        .arrow-down {
            width: 0;
            height: 0;
            border-left: 3px solid transparent;
            border-right: 3px solid transparent;
            border-top: 3px solid #000;
            position: absolute;
            margin-left: 2px;
            top: 2px;
        }
    }

    table.table {
        tr th,
        tr td {text-align: center;}
    }

    .rrs {
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 2px solid hsl(0, 0%, 86%);
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid hsl(0, 0%, 86%);

        .rr_fons {
            &:first-child{
                border-right: 1px solid hsl(0, 0%, 86%);
            }
            background-color: whitesmoke;
        }

        .dots{
            cursor: pointer;
            &::before{
                position: absolute;
                content: "";
                font-size: 30px;
                left:0;
                right:0;
            }
            &::after {
                content: '\2807';
                font-size: 30px;
                color: #777777;
            }

        }
    }
}

.button.viewprecent {
    border-color: $selected;
    color: $selected;

    &.selected,
    &:hover {
        background-color: $selected;
        color: white;
    }

    &:focus {
        outline: none;
        box-shadow: none !important;
        border-color: $selected;
    }

    &.is-info:focus {
        border-color: #3298dc;
    }
}


.button.is-outlined {
    &:hover,
    &:focus,
    &:active,
    &:visited {
        &::after {
            border-color: transparent transparent #fff #fff !important;
        }
    }
}

</style>
