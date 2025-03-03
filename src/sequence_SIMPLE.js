export default function fullSequence()
{
    this.proba = 1;
    this.sequence = new Array();
    this.playerNumber = 1;

    //add an action at the end of the sequence
    this.addAction=function( action )
    {
        if(action.isNewPlayer){this.playerNumber++}
        this.sequence[this.sequence.length]=action;
    }

    //remove an action (actually replace it with a 1
    this.removeAction=function(i)
    {

        this.sequence.splice(i,1);

    }

    this.getActions=function(){
        return this.sequence;
    }

    this.addActions=function(arr)
    {
        this.sequence = arr;
    }

    //get odd for an action teamRerollLeft = true to get the result with a reroll
    this.getProbaReroll2=function( teamRerollLeft )
    {
        return this.getProbaAction(0, teamRerollLeft, true, true , true, true, true);
    }

    //get recursivelly the probability for 1 action
    this.getProbaAction = function(n, teamRerollLeft, DodgeRerollLeft , SurefeetRerollLeft, ProRerollLeft )
    {
        console.log("N", n);
        console.log("sequence", this.sequence);
        console.log("teamRerollLeft", teamRerollLeft);

        var p1,p2;
        //no element left
        if( n >= this.sequence.length){return 1;}

        //new player
        if(this.sequence[n].isNewPlayer )
        {
            return this.getProbaAction(n+1, teamRerollLeft, true , true, true);
        }

        //get odd for this action without reroll
        p1 = this.sequence[n].probaNoReroll*this.getProbaAction(n+1, teamRerollLeft, DodgeRerollLeft, SurefeetRerollLeft, ProRerollLeft );

        //get odd for this action with reroll
        p2=0;
        //with player reroll
        
        if(teamRerollLeft == true)
        {
            
                p2 = this.sequence[n].probaYesReroll*this.getProbaAction(n+1, false, DodgeRerollLeft , SurefeetRerollLeft, ProRerollLeft);
                if(  this.sequence[n].isLoner )p2=p2/2;
        }
        let result = p1+p2;
        if( this.sequence[n].interceptionOdd ) result = (p1+p2)*this.sequence[n].interceptionOdd;
        if( this.sequence[n].cannotUseReroll ) result = p1; //for rolls that cannot be rerolled with team reroll

        return result;
    }


    //return a string of the full sequence
    this.display = function()
    {
        var text = '';
        var playerColor=1;
        for( let i=0; i<this.sequence.length ; i++ )
        {
            if(this.sequence[i].isNewPlayer)playerColor++;
            if(playerColor>5)playerColor=1;

            //Pro checkbox
            let checked='';
            let protext =" &nbsp;";
            if(this.sequence[i].doUseProSkill)checked = 'checked=checked';
            if(this.sequence[i].canUseProSkill)protext = '<input type="checkbox" onclick="usePro('+i+');" '+checked+'/>Use Pro prior to teamReroll';

            text+='<div class="action player'+playerColor+'"><div class="removeAction" onclick="theSequence.removeAction('+i+')">X</div>'+this.sequence[i].toString+'<div class="useProSkillBlock">'+protext+'</div></div>';
        }
        return text;

    }

    this.getProba = function()
    {
        let r = this.getProbaReroll2(false);
        let noReRoll =  Math.round(r*100000)/1000;
        if(noReRoll <=0)noReRoll = r;

        let rr = this.getProbaReroll2(true);
        let reRoll =  Math.round(rr*100000)/1000;
        if(reRoll <=0)reRoll = rr;

        return {reRoll: reRoll, noReRoll: noReRoll, nActions: this.sequence.length, actions: this.sequence};
    }
}
